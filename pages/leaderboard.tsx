import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import Navbar from "../components/navbar";
import icon from "../public/icon.ico";
import Image from "next/image";

export const getServerSideProps: GetServerSideProps = async (context) => {
    const user = context.req.cookies["user"];
    const token = context.req.cookies["token"];
    if (user) {
        const data = [
            { id: 1, username: "test" },
            { id: 2, username: "test2" },
            { id: 3, username: "test3" },
            { id: 4, username: "test4" },
            { id: 5, username: "test5" },
            { id: 6, username: "test6" },
            JSON.parse(user),
        ];
        // const data = await fetch(`${process.env.api}/leaderboard`, {
        //     headers: {
        //         "Discord-Token": token,
        //     },
        // });
        return { props: { user: JSON.parse(user), leaderboard: data } };
    }
    return {
        props: {},
    };
};

const Leaderboard: NextPage<{ user: any; leaderboard: any[] }> = ({
    user,
    leaderboard,
}) => {
    const [loggedin, setLoggedin] = useState(user ? true : false);
    return (
        <>
            <Head>
                <title>Cotidie | Leaderboard</title>
                <link rel="shortcut icon" href={icon.src} type="image/x-icon" />
            </Head>
            <Navbar loggedin={loggedin} />
            {!loggedin ? (
                <div></div>
            ) : (
                <div
                    className="grid grid-cols-2 p-10 gap-10 text-white"
                    style={{ gridTemplateColumns: "3fr 1fr" }}
                >
                    <div className="grid grid-flow-row h-[81.5vh] rounded-lg border border-gray-200 shadow-md dark:bg-[#262633] dark:border-gray-700">
                        {leaderboard.map((person: any, index) =>
                            person.id === user.id ? (
                                <div key={index}>{person.username}</div>
                            ) : (
                                <div id="position" key={index}>
                                    {person.username}
                                </div>
                            )
                        )}
                    </div>
                    <div
                        id="user info"
                        className="flex flex-col h-fit gap-4 p-6 pl-10 rounded-lg border border-gray-200 shadow-md dark:bg-[#262633] dark:border-gray-700"
                    >
                        <div className="rounded-full p-0.5 border-2 h-24 w-24 overflow-hidden">
                            <Image
                                src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=256`}
                                width="256"
                                height="256"
                                alt={`${user.username}'s avatar`}
                                className="rounded-full m-0 p-0"
                            />
                        </div>
                        {/* <div>{`${user.username}#${user.discriminator}`}</div> */}
                        <div className="flex flex-row items-baseline">
                            <p className="text-2xl">{user.username}</p>
                            <p className="text-sm">{`#${user.discriminator}`}</p>
                        </div>
                        <a href="#position">jump</a>
                    </div>
                </div>
            )}
        </>
    );
};

export default Leaderboard;
