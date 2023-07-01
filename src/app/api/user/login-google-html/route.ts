import { NextResponse, NextRequest } from 'next/server';
import { NextApiRequest, NextApiResponse } from 'next';
import { OAuth2Client } from 'google-auth-library';
import { JwtUser, getJoseJwtToken } from '@/common/tool/calc';

const client = new OAuth2Client("148920992021-ra7stt37aqlqii1bojpe3enf3t800vdh.apps.googleusercontent.com");

async function verify(token: string) {
  console.log("verify 1");
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: "148920992021-ra7stt37aqlqii1bojpe3enf3t800vdh.apps.googleusercontent.com",  // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  console.log("verify 2");
  const payload = ticket.getPayload();
  console.log("verify 3");
  console.log(`token payload: ${JSON.stringify(payload)}`);
  console.log("verify 4");
  // const userid = payload['sub'];
  // If request specified a G Suite domain:
  // const domain = payload['hd'];
}


export async function POST(request: Request) {
  
  console.log(`login-google-html POST`);

  // const idToken: string = request.body?.credential; // 从请求的主体中获取 ID 令牌
    
  const body = await request.text();

  console.log('login-google-html, body:', body);

  const credentialStartIndex = body.indexOf('credential=') + 'credential='.length;
  const credentialEndIndex = body.indexOf('&', credentialStartIndex);
  const credential = body.substring(credentialStartIndex, credentialEndIndex);

  console.log('login-google-html, credential:', credential);
  
  // const res = NextResponse.json({ code: 0, message: 'success' })

  const jwtUser:JwtUser = { 
    id:"user-id", 
    name:"user-name", 
    email:"user-email",
    picture:"user-picture",
    from:"google",
    sub:"user-sub"
  }
  const token = await getJoseJwtToken(jwtUser);  
  console.log('login-google-html, token:', token);
  const cookieOptions = {
    httpOnly: true,
    secure: true
  };


  const redirectUrl = new URL(request.url).origin + '/home';

  const html = `<!DOCTYPE html>
    <html>
    <head>
      <meta http-equiv="refresh" content="0; url='${redirectUrl}'">
    </head>
    <body></body>
    </html>`;

  const headers = {
    "Content-Type": "text/html",
    // "Set-Cookie": "cookieName=cookieValue; Max-Age=3600; Path=/",
    // "Set-Cookie": `appjwt=${token}; HttpOnly; Secure`,
    "Set-Cookie": `jwt=${token}; Max-Age=3600; Path=/`,
  };

  return new NextResponse(html, { status: 200, headers });



  // const headers = {
  //   "Location": new URL(request.url).origin + '/home',
  //   "Set-Cookie": `appjwt=${token}; HttpOnly; Secure`,
  // };

  // return new Response(null, { status: 302, headers });

  // const res = NextResponse.json({ code: 0, message: 'success' });
  // res.cookies.set('jwt', token, cookieOptions);

  // return res;

  // return NextResponse.redirect(new URL(request.url).origin + '/home', { status: 302 })
          // .cookies.set('jwt', token, cookieOptions);

}
