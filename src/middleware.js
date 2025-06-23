import { NextResponse } from 'next/server'
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'


export async function middleware(req) {
  const res = NextResponse.next()

  const supabase = createMiddlewareClient({ req, res })

  
  const {
    data: { session },
  } = await supabase.auth.getSession()


  if (!session && req.nextUrl.pathname.startsWith('/organizations')) {
    
    return NextResponse.redirect(new URL('/login', req.url))
  }

  
  return res
}

// Define para quais rotas o middleware é aplicado
export const config = {
  matcher: [
    '/dashboard/:path*'],
}