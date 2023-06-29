import { NextResponse, NextRequest } from 'next/server';
import { NextApiRequest, NextApiResponse } from 'next';
import { OAuth2Client } from 'google-auth-library';
import {userInfo} from '../userinfo';

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
}

export async function POST(request: Request) {
  
  console.log(`login-google-js POST`);

  const body = await request.json(); // Parse the body as JSON

  console.log('login-google-js, body:', body);

  const credential = body.credential; // Access the "credential" property

  console.log('credential:', credential);

  verify(credential);
  
  const res = NextResponse.json({ code: 0, message: 'success' });
  return res;

}
