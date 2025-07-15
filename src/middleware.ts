import { NextRequest } from "next/server";
import { privatePages, publicPages} from './lib/pages-config'
import { protectLogin } from "./lib/middleware/protect-login";

export async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname


    if (pathname.startsWith(publicPages.auth)) {
        return protectLogin(request)
    }


}

export const config = {
    matcher: [
        '/',
        '/auth/login',
        '/auth/:path*',
        '/profile/:path*'
    ]
}
