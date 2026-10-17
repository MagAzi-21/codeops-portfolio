import { cookies } from "next/headers";

const USERS = [
  { id: "usr_mike", name: "Mike", role: "customer" },
  { id: "usr_almaz", name: "Almaz", role: "customer" },
  { id: "usr_chef", name: "Chef Dawit", role: "staff" },
];

// Exercise 1: Centralized session reader for pages, actions, and route handlers
export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;

  if (!token) return null;

  // Simple token payload lookup: usr_id:role
  const [userId] = token.split(":");
  return USERS.find((u) => u.id === userId) || null;
}

// Exercise 2: Session creation with required security cookie flags
export async function createSessionCookie(userId) {
  const user = USERS.find((u) => u.id === userId);
  if (!user) throw new Error("Invalid user credentials");

  const token = `${user.id}:${user.role}`;
  const cookieStore = await cookies();

  cookieStore.set("session", token, {
    httpOnly: true, // Prevents client JavaScript from accessing token
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax", // Protects against CSRF
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });

  return user;
}

export async function clearSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}