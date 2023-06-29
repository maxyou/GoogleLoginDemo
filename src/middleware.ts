import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getJoseJwtToken, joseVerify } from './common/tool/calc';
import cookie from 'cookie';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {

  console.log('======== middleware.ts ========')
  // console.log('middleware.ts, request.url:', request.url)
  console.log('middleware.ts, request.nextUrl.pathname:', request.nextUrl.pathname)
  

  // const { pathname } = request.nextUrl;
  // if (pathname.includes('/user/')) {
  //   return NextResponse.next({
  //     // request: {
  //     //   headers
  //     // }
  //   });
  // }

  const headers = new Headers(request.headers);
  // headers.set('middlewareSet', 'mydata');

  const cookies = headers.get('cookie')
  console.log('middleware.ts, cookies:', cookies)

  const parsedCookies = cookie.parse(cookies || '');
  console.log('middleware.ts, parsedCookies:', parsedCookies)

  // Access the specific item you want
  const jwtToken = parsedCookies.jwt;
  console.log('middleware.ts, jwtToken:', jwtToken)

  if (jwtToken) {

    const secret = process.env.JWT_SECRET as string;
  
    const decodedToken = await joseVerify(jwtToken, secret);
    // console.log('middleware.ts, decodedToken:', JSON.stringify(decodedToken))
    console.log('middleware.ts, decodedToken:', decodedToken)

    if (decodedToken.code == 0) {

      const jwtUser = decodedToken.jwtPayloadWithUser!.jwtUser;
      headers.set('middlewareSet', JSON.stringify(jwtUser));
      console.log('middleware.ts, user:', jwtUser)
    
      const resp = NextResponse.next({
        request: {
          headers
        }
      });
    
      //refresh jwt
      const refreshJwtToken = await getJoseJwtToken(jwtUser);
    
      resp.cookies.set('jwt', refreshJwtToken, {
        httpOnly: true,
        secure: true
      })
    
      return resp;
  
    }  

  }

  console.log('middleware.ts, decodedToken.code !== 0, redirect to /user/login')
  // return NextResponse.redirect(new URL('/user/login/btn-js', request.url))
  
  headers.set('middlewareSet', 'no login found');

  const resp = NextResponse.next({
    request: {
      headers
    }
  });
  return resp;  

}


// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/(.*)',
  ],
}