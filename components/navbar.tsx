import Link from "next/link";

export default function Navbar(){

    return(
        <nav className="flex justify-between items-center bg-blue-700 px-8 py-3 rounded">
            <Link className="text-white font-bold hover:text-blue-400" href={"/"}>TO DO APP</Link>
            <Link className="text-white font-bold hover:text-blue-400" href={"/addTopic"}>ADD TASK</Link>
        </nav>
    );
}
