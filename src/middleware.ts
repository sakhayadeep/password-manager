import { auth } from "@/auth";
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
    const session = await auth();
    if (!session?.user) {
        return NextResponse.redirect(new URL('/account/login', request.url));
    }
}

export const config = {
    matcher: ['/dashboard', '/item/:id*'],
}