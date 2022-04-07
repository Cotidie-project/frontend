import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Navbar from "../components/navbar";

const Home: NextPage = () => {
    const [loggedin, setLoggedin] = useState(true);
    const router = useRouter();
    useEffect(() => {
        if (loggedin) router.push("/app");
    });
    return loggedin ? (
        <main></main>
    ) : (
        <main>
            <Navbar></Navbar>
            <h1>Landing Page here</h1>
        </main>
    );
};

export default Home;
