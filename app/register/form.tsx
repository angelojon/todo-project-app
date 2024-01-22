'use client';

import Link from "next/link";
import { FormEvent } from "react";

export default function Form () {

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData (e.currentTarget);
        const response = await fetch ('/api/auth/register', {
            method: 'POST',
            body: JSON.stringify({
                email: formData.get('email'),
                password: formData.get('password'),
    
            }),
        });
        console.log ({response});
    };
    
    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 mx-auto max-w-md mt-10 ">
        <h1 className="text-center">REGISTER</h1>
        <input name="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:border-blue-500 block w-full p-2 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black" type="email"></input>
        <input name="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:border-blue-500 block w-full p-2 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black" type="password"></input>
        <button type="submit">Submit</button>
        <br />
        <button><Link href="/login">Click here to Login</Link></button>
    </form>
    )
}