import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Navbar from "../components/navbar";

const Home: NextPage = () => {
    const [loggedin, setLoggedin] = useState(false);
    const router = useRouter();
    useEffect(() => {
        if (loggedin) router.push("/app");
    });
    return loggedin ? (
        <main></main>
    ) : (
        <main className="bg-[#07070A] h-screen text-white">
            <Navbar></Navbar>
            <div className="py-24 flex flex-col items-center text-5xl font-extrabold">
                <div>
                    The Planner{" "}
                    <strong className="underline decoration-[#BC248C] decoration-[6px]">
                        that Works
                    </strong>
                    <a className="bg-gradient-to-r from-[#BC248C] to-[#F75F8C] bg-clip-text text-transparent">
                        .
                    </a>
                </div>
            </div>
        </main>
    );
};

export default Home;
