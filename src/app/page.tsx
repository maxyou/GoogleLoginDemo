import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">

          Test Next.js with Google OAuth2.0 HTML button and Javacript button.

          <ul>
            <li>Popup window for login with Google account</li>
            <li>HTML button will redirect to home page after login</li>
            <li>Javascript Button will just print JWT</li>
            <li>Logout</li>
          </ul>

        </p>

      </div>


    </main>
  )
}
