import Link from "next/link"
import GoogleLoginButtonJs from '@/component/googlebuttonjs';
// import GoogleLoginButtonHtml from '@/component/googlebuttonhtml';

export default function About() {

  return (
    <main className="w-full h-full flex flex-col items-center justify-between p-24">

      <div>
        <div>
        Here is google login Javascript button. After login, it will keep to this page. Please check devtools console for token.
        </div>
        <div>
          <GoogleLoginButtonJs />
        </div>

      </div>
    </main>
  )
}
