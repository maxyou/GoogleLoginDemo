import { headers, cookies } from 'next/headers'
import ClientPage from './clientpage'

export default function Home() {

    const headersList = headers()
    const middlewareSet = headersList.get('middlewareSet')

    const cookiesList = cookies()
    const jwt = cookiesList.get('jwt')


    // function logout() {
    //     if (typeof window.google !== 'undefined') {
    //         console.log("google is defined");
    //       } else {
    //         console.log("google is undefined");
    //       }
    // }

    return (
        <div className="p-8">
            <h1 className="text-4xl font-bold mb-4">Server Component</h1>
            <br />
            <div>
                <p>login: {middlewareSet}</p>
            </div>
            <br />
            <div>
                <ClientPage middlewareSet={middlewareSet} />
            </div>
        </div>
    );

}