"use server";

import { type NextRequest, NextResponse } from "next/server";
import { getTokens } from "../session";

export async function protectLogin(request: NextRequest) {
  const tokens = await getTokens(request);

  if (!tokens) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/", request.url));
}
