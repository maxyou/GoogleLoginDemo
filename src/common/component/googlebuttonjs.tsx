'use client'

import React, { useEffect } from 'react';
import { OAuth2Client } from 'google-auth-library';
import { GoogleLoginButtonProps } from '../interface';
import { useRouter } from 'next/navigation';

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



const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({
  gsi_src,
  client_id,
  login_uri,
  direct_uri
}) => {

  const router = useRouter();

  async function handleCredentialResponse(response: any) {


    console.log("Encoded JWT ID token: " + response.credential);

    // await verify(response.credential).catch(console.error);
    // console.log("after verify token");


    const url = "/api/user/login-google-js";
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        credential: response.credential,
      }),
    };


    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.code === 0) {
          // router.refresh();
          // redirect to todolist page
          console.log(`Login-google-js success: ${data.message}`);
          router.push('/home');
        } else {

          console.log(`Login-google-js failed: ${data.message}`);
        }
      });


    // Perform registration logic here
    // You can send the data to an API or handle it as per your requirement
    console.log('Login submitted');
  }

  function initializeGoogleLogin() {
    window.google.accounts.id.initialize({
      client_id: client_id,
      callback: handleCredentialResponse
    });
    window.google.accounts.id.renderButton(
      document.getElementById("buttonDiv"),
      { theme: "outline", size: "large" }
    );
    window.google.accounts.id.prompt();
  }

  useEffect(() => {

    if (typeof window.google !== 'undefined') {
      initializeGoogleLogin();
    } else {
      const script = document.createElement('script');
      script.src = gsi_src;
      script.async = true;
      script.defer = true;
      script.onload = initializeGoogleLogin;
      document.body.appendChild(script);
    }
  }, []);

  return <div id="buttonDiv"></div>;
};

export default GoogleLoginButton;
