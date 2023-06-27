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

declare global {
  interface Window {
    google: any;
  }
}

const GoogleLoginButton: React.FC = () => {
  useEffect(() => {
    async function handleCredentialResponse(response: any) {
      console.log("Encoded JWT ID token: " + response.credential);

      await verify(response.credential).catch(console.error);
      console.log("after verify token");
    }

    function initializeGoogleLogin() {
      window.google.accounts.id.initialize({
        client_id: "148920992021-ra7stt37aqlqii1bojpe3enf3t800vdh.apps.googleusercontent.com",
        callback: handleCredentialResponse
      });
      window.google.accounts.id.renderButton(
        document.getElementById("buttonDiv"),
        { theme: "outline", size: "large" }
      );
      window.google.accounts.id.prompt();
    }

    if (typeof window.google !== 'undefined') {
      initializeGoogleLogin();
    } else {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = initializeGoogleLogin;
      document.body.appendChild(script);
    }
  }, []);

  return <div id="buttonDiv"></div>;
};

export default GoogleLoginButton;
