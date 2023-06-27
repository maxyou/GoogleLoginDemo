'use client'

import Link from "next/link"
import GoogleLogoutButtonJs from '@/common/component/googlebuttonjs';
// import GoogleLoginButtonHtml from '@/component/googlebuttonhtml';

export default function About() {


  function handleOnclick() {
    if (typeof window.google !== 'undefined') {
      console.log("google is defined");
      window.google.accounts.id.revoke('114503523336788240762', (done: { error: any; }) => {
        console.log(`revoke done error: ${done.error}`);
      });
    } else {
      console.log("google is not defined");
    }
  }

  return (
    <main className="w-full h-full flex flex-col items-center justify-between p-24">

      <div>
        <div>
        Here is logout of google.
        </div>
        <div>
          {/* <button onClick={() => {} }>Logout</button> */}
          <GoogleLogoutButtonJs />
        </div>
        <button onClick={handleOnclick}>Google Logout</button>
      </div>
    </main>
  )
}
