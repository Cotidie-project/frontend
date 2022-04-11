import { NextPage } from "next";
import Head from "next/head";
import icon from "../../public/icon.ico"
import Navbar from "../../components/navbar";

const createTasks: NextPage = () => {
    return (
        <>
            <Head>
                <title>Cotidie | Create Tasks</title>
                <link rel="shortcut icon" href={icon.src} type="image/x-icon" />
            </Head>
	    <Navbar />
	    
        </>
    );
};
export default createTasks;
