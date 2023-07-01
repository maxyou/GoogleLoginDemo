import Image from 'next/image'
import Link from "next/link"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <div className="flex flex-col items-center justify-start">
          <div className='p-2 m-2'>
          <p className='p-2 m-2'>
            Try Google OAuth2.0 HTML button and JavaScript button on Next.js 13.
          </p>
          <p className='p-2 m-2'>
            Use Google OAuth for verification, use JWT to keep login.
          </p>
          </div>

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
