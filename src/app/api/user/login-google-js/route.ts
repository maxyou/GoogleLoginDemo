import { NextResponse, NextRequest } from 'next/server';
import { NextApiRequest, NextApiResponse } from 'next';
import { OAuth2Client } from 'google-auth-library';
import { JwtUser, getJoseJwtToken } from '@/common/tool/calc';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID as string);

async function verify(token: string) {
  console.log("verify 1");
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID as string
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
  if(!payload) {
    return null;
  }
  const sub = payload['sub'];
  const name = payload['name'];
  const email = payload['email'];
  const picture = payload['picture'];

  return {sub, name, email, picture};
}

export async function POST(request: Request) {
  
  console.log(`login-google-js POST`);

  const body = await request.json(); // Parse the body as JSON

  console.log('login-google-js, body:', body);

  const credential = body.credential; // Access the "credential" property

  console.log('credential:', credential);

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

  const res = NextResponse.json({ code: 0, message: 'success' });

  console.log('login-google-js, jwtUser:', jwtUser);
  const token = await getJoseJwtToken(jwtUser);
  const cookieOptions = {
    httpOnly: true,
    secure: true
  };

  res.cookies.set('jwt', token, cookieOptions);
  
  return res;

}
