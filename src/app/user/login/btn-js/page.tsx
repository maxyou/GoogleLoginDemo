import Link from "next/link"
import GoogleLoginButtonJs from '@/common/component/googlebuttonjs';
// import GoogleLoginButtonHtml from '@/component/googlebuttonhtml';

export default function About() {

  return (
    <main className="w-full h-full flex flex-col items-center justify-between p-24">

      <div>
        <div>
          Here is google login Javascript button. After login, it will keep to this page. Please check devtools console for token.
        </div>
        <div>
          <GoogleLoginButtonJs
            gsi_src={process.env.GOOGLE_ACCOUNT_GSI_CLIENT!}
            login_uri={process.env.GOOGLE_LOGIN_URI!}
            client_id={process.env.GOOGLE_CLIENT_ID!}
          />
        </div>

      </div>
    </main>
  )
}
