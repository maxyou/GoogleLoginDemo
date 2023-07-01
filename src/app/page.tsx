import Image from 'next/image'
import Link from "next/link"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <div className="flex flex-col items-center justify-start">
          <p className="pb-6 pt-8">
            Test Next.js with Google OAuth2.0 HTML button and JavaScript button.
          </p>

          <div>
            <Link href="/user/login/btn-html">
              <button className="bg-blue-500 min-w-fit hover:bg-blue-700 text-white p-2 m-2 rounded">
                Go to Google Login HTML button
              </button>
            </Link>
          </div>
          <div>
            <Link href="/user/login/btn-js">
              <button className="bg-blue-500 min-w-fit hover:bg-blue-700 text-white p-2 m-2 rounded">
                Go to Google Login JavaScript button
              </button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
