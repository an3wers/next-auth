import { NextResponse, type NextRequest } from "next/server";
import { parseJwt } from "../parse-jwt";
import { getTokens } from "../session";
import { parseRules } from "../utils";

export async function protectAdmin(request: NextRequest) {
  const tokens = await getTokens(request);

  if (!tokens) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  const payload = parseJwt(tokens.accessToken);

  const rules = parseRules(payload.rights);

  if (!rules.includes("admin") || !rules.includes("superadmin")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}
