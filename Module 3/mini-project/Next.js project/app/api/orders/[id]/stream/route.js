import { getOrder } from "@/lib/db";

// Real-Time SSE Route Handler using text/event-stream[cite: 55]
export async function GET(request, { params }) {
  const { id } = await params;
  const order = await getOrder(id);

  if (!order) {
    return new Response("Order not found", { status: 404 });
  }

  const stream = new ReadableStream({
    async start(controller) {
      // Message framing: strict "data: " + JSON string + "\n\n"[cite: 55, 58]
      const sendEvent = (data) => {
        const payload = `data: ${JSON.stringify(data)}\n\n`;
        controller.enqueue(new TextEncoder().encode(payload));
      };

      // 1. Initial event matching seed
      sendEvent({
        status: order.status,
        etaMinutes: order.etaMinutes,
        updatedAt: new Date().toISOString(),
      });

      // 2. Simulated real-time progression over the connection[cite: 55]
      const t1 = setTimeout(() => {
        sendEvent({
          status: "Approaching Bole Rwanda",
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
      "Content-Type": "text/event-stream", //[cite: 55]
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}