'use client';

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

export default function Form () {
    const router = useRouter();
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData (e.currentTarget);
        const response = await signIn('credentials', {
            email: formData.get ('email') as string,
            password: formData.get ('password') as string,
            redirect: false,
        });

        console.log({ response });
        if(!response?.error){
            router.push("/");
            router.refresh();
        }
    };
    
    return (
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 mx-auto max-w-md mt-10 border-black">
        <h1 className="text-center">LOG IN</h1>
        <input name="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:border-blue-500 block w-full p-2 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black" type="email"></input>
        <input name="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:border-blue-500 block w-full p-2 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black" type="password"></input>
        
        <button type="submit">Submit</button>
        <br />
        <button><Link href="/register">Click here to Register</Link></button>
        
    </form>
    )
}