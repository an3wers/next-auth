"use server";

import { type NextRequest, NextResponse } from "next/server";
import { getTokens } from "../session";

export async function protectProfile(request: NextRequest) {
  const tokens = await getTokens(request);

  if (!tokens) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}
