import { getTrackingOrder } from "@/lib/db";

// Exercise 3: SSE Route Handler sending text/event-stream chunks
export async function GET(request, { params }) {
  const { id } = await params;
  const order = await getTrackingOrder(id);

  if (!order) {
    return new Response("Order not found", { status: 404 });
  }

  const stream = new ReadableStream({
    async start(controller) {
      // Message framing: "data: " + JSON string + "\n\n"
      const sendEvent = (data) => {
        const payload = `data: ${JSON.stringify(data)}\n\n`;
        controller.enqueue(new TextEncoder().encode(payload));
      };

      // 1. Initial event
      sendEvent({
        status: order.status,
        etaMinutes: order.etaMinutes,
        updatedAt: new Date().toISOString(),
      });

      // 2. Simulated real-time stream progression
      const t1 = setTimeout(() => {
        sendEvent({
          status: "Approaching Destination",
          etaMinutes: 5,
          updatedAt: new Date().toISOString(),
        });
      }, 4000);

      const t2 = setTimeout(() => {
        sendEvent({
          status: "Delivered",
          etaMinutes: 0,
          updatedAt: new Date().toISOString(),
        });
        controller.close();
      }, 9000);

      request.signal.addEventListener("abort", () => {
        clearTimeout(t1);
        clearTimeout(t2);
      });
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}