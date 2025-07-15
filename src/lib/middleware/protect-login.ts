import { type NextRequest, NextResponse } from "next/server";
import { getTokens } from "../session";

export async function protectLogin(request: NextRequest) {
    const { accessToken, refreshToken } = await getTokens(request)

    if (!accessToken) {
        return NextResponse.redirect(new URL('/auth/login', request.url))
    }


}