'use client'

export default function Home() {

    const logout = () => {
        if (typeof window.google !== 'undefined') {
            console.log("google is defined");
          } else {
            console.log("google is undefined");
          }
    }
    // function logout() {
    //     if (typeof window.google !== 'undefined') {
    //         console.log("google is defined");
    //       } else {
    //         console.log("google is undefined");
    //       }
    // }

    return (
        <div>
            <h1>Home after redirect</h1>
            <button onClick={logout}>Logout</button>
        </div>
    )
}