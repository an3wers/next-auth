import { cookies } from 'next/headers'
import 'server-only'

export async function setSession(payload: {
    accessToken: string;
    refreshToken: string;
}) {
    const cookieStore = await cookies()

    cookieStore.set('accessToken', payload.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000)
    })

    cookieStore.set('refreshToken', payload.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    })
}