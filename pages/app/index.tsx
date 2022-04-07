import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";

const Home: NextPage = () => {
    const [loggedin, setLoggedin] = useState(false);
    return (
        <main>
            <h1>Ello</h1>
        </main>
    );
};

export default Home;
