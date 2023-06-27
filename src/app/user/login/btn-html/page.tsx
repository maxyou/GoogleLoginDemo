import Link from "next/link"
// import GoogleLoginButtonJs from '@/component/googlebuttonjs';
import GoogleLoginButtonHtml from '@/common/component/googlebuttonhtml';

export default function About() {
  
  console.log(`gsi_src: ${process.env.GOOGLE_ACCOUNT_GSI_CLIENT}`);
  console.log(`login_uri: ${process.env.GOOGLE_LOGIN_URI}`);
  console.log(`client_id: ${process.env.GOOGLE_CLIENT_ID}`);

  return (
    <main className="w-full h-full flex flex-col items-center justify-between p-24">

      <div>
        <div>
          Here is google login HTML button. After login, it will redirect to home page. Please check sever log for token.
        </div>
        <div>
          <GoogleLoginButtonHtml 
            gsi_src={process.env.GOOGLE_ACCOUNT_GSI_CLIENT!}
            login_uri={process.env.GOOGLE_LOGIN_URI!} 
            client_id={process.env.GOOGLE_CLIENT_ID!}
          />
        </div>

      </div>
    </main>
  )
}
