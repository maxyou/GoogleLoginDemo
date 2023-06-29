'use client'

import React, { useState } from 'react';

const ClientPage: React.FC<{ middlewareSet: string | null }> = (middlewareSet) => {

    const logout = () => {
        if (typeof window.google !== 'undefined') {
            console.log("google is defined");
        } else {
            console.log("google is undefined");
        }
    }

    return (
        <div>
            <p className="font-bold">ClientPage</p>
            {
                middlewareSet && JSON.stringify({ middlewareSet })
            }
            <div>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={logout}>
                    Logout
                </button>
            </div>

        </div>
    )
}

export default ClientPage