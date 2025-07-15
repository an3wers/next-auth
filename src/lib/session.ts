import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import "server-only";
import { userApi } from "./api/user-api";

export async function setSession(payload: {
  accessToken: string;
  refreshToken: string;
}) {
  const cookieStore = await cookies();

  cookieStore.set("accessToken", payload.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
  });

  cookieStore.set("refreshToken", payload.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  });
}

export async function getSession() {}

export async function deleteSession() {}

export async function getTokens(request: NextRequest) {
  let refreshToken = request.cookies.get("refreshToken")?.value;
  let accessToken = request.cookies.get("accessToken")?.value;

  if (!refreshToken) {
    request.cookies.delete("accessToken");
    return null;
  }

  if (!accessToken) {
    try {
      const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
        await userApi().refreshSession(refreshToken);
      accessToken = newAccessToken;
      refreshToken = newRefreshToken;
    } catch {
      request.cookies.delete("accessToken");
      request.cookies.delete("refreshToken");
      return null;
    }
  }

  return { accessToken, refreshToken };
}
