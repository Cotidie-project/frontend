import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import Navbar from "../components/navbar";
import icon from "../public/icon.ico";
import Image from "next/image";
import { User } from "../interface";

interface Person extends User {
    points: number;
    position: number;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const rawUser = context.req.cookies["user"];
    const token = context.req.cookies["token"];
    if (rawUser) {
        const user: User = JSON.parse(rawUser);
        const data: Person[] = [
            {
                id: "1",
                username: "test",
                discriminator: user.discriminator,
                avatar: user.avatar,
                points: 0,
                position: 1,
                public_flags: user.public_flags,
            },
            {
                id: "2",
                username: "test",
                discriminator: user.discriminator,
                avatar: user.avatar,
                points: 0,
                position: 2,
                public_flags: user.public_flags,
            },
            {
                id: "3",
                username: "test",
                discriminator: user.discriminator,
                avatar: user.avatar,
                points: 0,
                position: 3,
                public_flags: user.public_flags,
            },
            {
                id: "4",
                username: "test",
                discriminator: user.discriminator,
                avatar: user.avatar,
                points: 0,
                position: 4,
                public_flags: user.public_flags,
            },
            {
                id: "5",
                username: "test",
                discriminator: user.discriminator,
                avatar: user.avatar,
                points: 0,
                position: 5,
                public_flags: user.public_flags,
            },
            {
                id: "6",
                username: "test",
                discriminator: user.discriminator,
                avatar: user.avatar,
                points: 0,
                position: 6,
                public_flags: user.public_flags,
            },
            {
                id: "7",
                username: "test",
                discriminator: user.discriminator,
                avatar: user.avatar,
                points: 0,
                position: 7,
                public_flags: user.public_flags,
            },
            {
                id: "8",
                username: "test",
                discriminator: user.discriminator,
                avatar: user.avatar,
                points: 0,
                position: 8,
                public_flags: user.public_flags,
            },
            { ...user, points: 100, position: 9 },
        ];

        // TODO: Get data from api
        // const data = await fetch(`${process.env.api}/leaderboard`, {
        //     headers: {
        //         "Discord-Token": token,
        //     },
        // });

        return { props: { user, leaderboard: data } };
    }
    return {
        props: {},
    };
};

const Leaderboard: NextPage<{ user: User; leaderboard: Person[] }> = ({
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
                    <div className="grid grid-flow-row p-10 gap-10 rounded-lg border border-gray-200 shadow-md dark:bg-[#262633] dark:border-gray-700">
                        {leaderboard.map((person: Person, index) => (
                            <div
                                id={person.id === user.id ? "me" : ""}
                                className="flex flex-row justify-between items-center h-fit p-6 pl-10 rounded-lg border border-gray-200 shadow-md dark:bg-[#22222e] dark:border-gray-700"
                                key={index}
                            >
                                <div className="flex flex-row items-center gap-4">
                                    <div className="rounded-full p-0.5 border-2 h-16 w-16 overflow-hidden">
                                        <Image
                                            src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=256`}
                                            width="256"
                                            height="256"
                                            alt={`${user.username}'s avatar`}
                                            className="rounded-full m-0 p-0"
                                        />
                                    </div>
                                    <div className="flex flex-row items-baseline">
                                        <p className="text-2xl">
                                            {user.username}
                                        </p>
                                        <p className="text-sm">{`#${user.discriminator}`}</p>
                                    </div>
                                </div>
                                <p className=" text-4xl pr-10">{`#${person.position}`}</p>
                            </div>
                        ))}
                    </div>
                    <div
                        id="user info"
                        className="flex flex-col sticky top-20 h-fit gap-4 p-6 pl-10 rounded-lg border border-gray-200 shadow-md dark:bg-[#262633] dark:border-gray-700"
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
                        <div className="flex flex-row items-baseline">
                            <p className="text-2xl">{user.username}</p>
                            <p className="text-sm">{`#${user.discriminator}`}</p>
                        </div>
                        <div className="w-fit p-2 px-4 text-center border-gray-700 border shadow-md rounded-xl bg-[#21212d]">
                            <a href="#me">Jump to position</a>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Leaderboard;
