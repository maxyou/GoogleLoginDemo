import Link from "next/link"
import GoogleLoginButtonJs from '@/component/googlebuttonjs';
import GoogleLoginButtonHtml from '@/component/googlebuttonhtml';

export default function About() {

  return (
    <main className="w-full h-full flex flex-col items-center justify-between p-24">

      <div>
        <div>
          this is login page
        </div>
        <div>
          here will embed google login button
        </div>
        <div>
          {/* <GoogleLoginButtonJs /> */}
        </div>
        <div>
          <GoogleLoginButtonHtml />
        </div>

      </div>
    </main>
  )
}
