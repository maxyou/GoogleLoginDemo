import { NextResponse, NextRequest } from 'next/server';
import { NextApiRequest, NextApiResponse } from 'next';


export async function POST(request: Request) {
  
  console.log(`receiver POST`);

  const headers = new Headers(request.headers);
  console.log('receiver.ts, Request Headers:', JSON.stringify(headers));


  const res = NextResponse.json({ code: 0, message: 'success' })

  return res;

}
