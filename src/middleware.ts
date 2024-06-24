import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {

    const pathName = request.nextUrl.pathname

    const isPublic = pathName === '/login' || pathName === '/sign-up' || pathName === '/verifyemail'

    const token = request.cookies.get('token')?.value || ''

    if (pathName === '/') {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    if (isPublic && token) {
        return NextResponse.redirect(new URL('/profile', request.url))
    }

    if (!isPublic && !token) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/',
        '/login',
        '/sign-up',
        '/verifyemail',
        '/dashboard',
        '/profile',
        '/settings',
        '/logout'
    ]
}
