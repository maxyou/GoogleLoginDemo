'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const ClientPage: React.FC<{ middlewareSet: string | null }> = ({ middlewareSet }) => {

    const router = useRouter();

    const jwtUser = JSON.parse(middlewareSet || '{}');
    console.log("client page get sub:", jwtUser && jwtUser.sub);

    const logout = () => {

        const url = "/api/user/logout";
        const options = {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        };

        fetch(url, options)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                if (data.code === 0) {
                    // redirect to todolist page
                    router.refresh();
                }
            });

        if (typeof window.google !== 'undefined') {
            console.log("google is defined");

            window.google.accounts.id.revoke(jwtUser.sub, (done: { error: any; }) => {
                console.log(`revoke done error: ${done.error}`);
            });

            console.log("call window.google.accounts.id.revoke()");

        } else {
            console.log("google is undefined");
        }
    }

    return (
        <div>
            <h1 className="text-3xl font-bold mb-4">Client Component</h1>
            <br />
            <div>
                <p>login: {middlewareSet}</p>
            </div>
            <br />

            {jwtUser && jwtUser.sub ? (
                <div>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={logout}>
                        Logout
                    </button>
                </div>
            ) : null}

        </div>
    )
}

export default ClientPage