'use client'

import React, { useEffect } from 'react';
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

const GoogleLoginButton: React.FC = () => {
  useEffect(() => {
    function initializeGoogleLogin() {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }

    if (typeof window !== 'undefined' && typeof window.google === 'undefined') {
      initializeGoogleLogin();
    }
  }, []);

  const handleCredentialResponse = async (response: any) => {
    console.log("Encoded JWT ID token: " + response.credential);

    await verify(response.credential).catch(console.error);
    console.log("after verify token");
  }
  // async function handleCredentialResponse(response: any) {
  //   console.log("Encoded JWT ID token: " + response.credential);

  //   await verify(response.credential).catch(console.error);
  //   console.log("after verify token");
  // }

  return (
    <div>
      <div
        id="g_id_onload"
        data-client_id="148920992021-ra7stt37aqlqii1bojpe3enf3t800vdh.apps.googleusercontent.com"
        data-login_uri="http://localhost:3000/api/user/receiver"
        data-auto_prompt="false"
      ></div>
      <div
        className="g_id_signin"
        data-type="standard"
        data-size="large"
        data-theme="outline"
        data-text="sign_in_with"
        data-shape="rectangular"
        data-logo_alignment="left"
      ></div>
    </div>
  );
};

export default GoogleLoginButton;
