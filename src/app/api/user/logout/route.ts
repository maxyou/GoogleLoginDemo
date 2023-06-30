import { NextResponse, NextRequest } from 'next/server';
import { NextApiRequest, NextApiResponse } from 'next';
import { OAuth2Client } from 'google-auth-library';
import { JwtUser, getJoseJwtToken } from '@/common/tool/calc';

export async function POST(request: Request) {
  
    console.log(`logout POST`);
  
    const res = NextResponse.json({ code: 0, message: 'success' });
  
    const cookieOptions = {
      httpOnly: true,
      secure: true
    };
  
    res.cookies.set('jwt', '', cookieOptions);
    
    return res;
  
  }
  