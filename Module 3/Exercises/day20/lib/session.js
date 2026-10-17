import { cookies } from "next/headers";

const USERS = [
  { id: "usr_mike", name: "Mike", role: "customer" },
  { id: "usr_almaz", name: "Almaz", role: "customer" },
  { id: "usr_chef", name: "Chef Dawit", role: "staff" },
];

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;
  if (!token) return null;

  const [userId] = token.split(":");
  return USERS.find((u) => u.id === userId) || null;
}

export async function createSessionCookie(userId) {
  const user = USERS.find((u) => u.id === userId);
  if (!user) throw new Error("Invalid user credentials");

  const token = `${user.id}:${user.role}`;
  const cookieStore = await cookies();

  // Flagged secure cookie
  cookieStore.set("session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  return user;
}

export async function clearSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}