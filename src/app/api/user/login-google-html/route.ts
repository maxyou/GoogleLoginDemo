import { NextResponse, NextRequest } from 'next/server';
import { NextApiRequest, NextApiResponse } from 'next';
import { OAuth2Client } from 'google-auth-library';

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
  
  // const res = NextResponse.json({ code: 0, message: 'success' })

  return NextResponse.redirect(new URL(request.url).origin + '/home', { status: 302 });

}
