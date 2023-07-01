import { NextResponse, NextRequest } from 'next/server';
import { NextApiRequest, NextApiResponse } from 'next';
import { OAuth2Client } from 'google-auth-library';
import { JwtUser, getJoseJwtToken } from '@/common/tool/calc';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID as string);

async function verify(token: string) {
  console.log("verify 1");
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID as string,  // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  console.log("verify 2");
  const payload = ticket.getPayload();
  console.log("verify 3");
  console.log(`token payload: ${JSON.stringify(payload)}`);
  console.log("verify 4");
  if(!payload) {
    return null;
  }
  const sub = payload['sub'];
  const name = payload['name'];
  const email = payload['email'];
  const picture = payload['picture'];

  return {sub, name, email, picture};

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
  
  const user = await verify(credential);  
  console.log('login-google-html, user:', JSON.stringify(user));

  const jwtUser:JwtUser = { 
    id:"user-id", 
    name:user?.name || "user-name", 
    email:user?.email || "user-email",
    picture:user?.picture || "user-picture",
    from:"google",
    sub:user?.sub || "user-sub"
  }
  const token = await getJoseJwtToken(jwtUser);  
  console.log('login-google-html, token:', token);
  const cookieOptions = {
    httpOnly: true,
    secure: true,    
    maxAge: 365 * 24 * 60 * 60, // 1 year (in seconds)
    path: "/",
  };

  const res = NextResponse.redirect(new URL(request.url).origin + '/home', { status: 302 })
  res.cookies.set('jwt', token, cookieOptions);
  return res;

}
