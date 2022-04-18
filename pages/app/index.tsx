import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import Navbar from "../../components/navbar";
import Points from "../../components/points";
import TaskCard from "../../components/taskcard";
import icon from "../../public/icon.ico";
import Image from "next/image";
import { serialize } from "cookie";
import { Break, User } from "../../interface";
import { Task as taskInterface } from "../../interface/task.interface";

export const getServerSideProps: GetServerSideProps = async (context) => {
    const token = context.req.cookies["token"];
    const newLogin = context.query["new"];

    if (token) {
        const things = [
            fetch(`${process.env.api}/tasks/@me?token=${token}`),
            fetch(`${process.env.api}/breaks/@me?token=${token}`),
        ];
        const [tasks, breaks] = await Promise.all(
            (await Promise.all(things)).map((r) => r.json())
        );

        if (newLogin) {
            const response = await fetch(`${process.env.api}/auth/user`, {
                headers: {
                    "Discord-Token": token,
                },
            });
            const data = await response.json();

            context.res.setHeader("Set-Cookie", [
                serialize("user", JSON.stringify(data), {
                    maxAge: 30 * 24 * 60 * 60,
                    path: "/",
                    sameSite: "strict",
                }),
            ]);
            console.log(context.req.cookies);
            return { props: { token, user: data, tasks, breaks } };
        }
        const data = JSON.parse(context.req.cookies["user"]);
        return { props: { token, user: data, tasks, breaks } };
    }

    return {
        props: {},
    };
};

const parseTime = (time: number, date?: string): Date => {
    const _time = time.toString().split(".");
    const hour = parseInt(_time[0]);
    const minute = 60 / parseInt(_time[1]);
    const [year, month, day] = date?.split("-").map((x) => Number(x)) || [
        2000, 0, 0,
    ];
    return new Date(year, month, day, hour, minute);
};

// test data
const testTasks = [
    {
        id: 1,
        title: "Task 1",
        time: new Date(),
        description: "This is a description",
        points: 1,
    },
    {
        id: 12,
        title: "Task 1",
        time: new Date(),
        description: "This is a description",
        points: 1,
    },

    {
        id: 13,
        title: "Task 1",
        time: new Date(),
        description: "This is a description",
        points: 1,
    },

    {
        id: 3,
        title: "Task 1",
        time: new Date(),
        description: "This is a description",
        points: 1,
    },

    {
        id: 2,
        title: "Task 1",
        time: new Date(),
        description: "This is a description",
        points: 1,
    },
];

const Home: NextPage<{
    token: string;
    user: User;
    // tasks: taskInterface[];
    tasks: any[];
    // breaks: Break[];
    breaks: any[];
}> = (props) => {
    const { token, user } = props;
    const [loggedin, setLoggedin] = useState(user ? true : false);

    const [totalPoints, setTotalPoints] = useState(100);
    const [currentPoints, setCurrentPoints] = useState(69);
    const taskAreaRef = useRef<HTMLDivElement>(null);
    const breakAreaRef = useRef<HTMLDivElement>(null);

    const [tasks, setTasks] = useState<taskInterface[]>(
        props.tasks.map((x) => ({
            ...x,
            time: parseTime(x.time, x.date),
        }))
    );
    const [breaks, setBreaks] = useState<Break[]>(
        props.breaks.map((x) => ({
            ...x,
            stime: parseTime(x.stime),
            etime: parseTime(x.stime),
        }))
    );
    // {
    //     name: "Break",
    //     stime: new Date(2020, 1, 1, 8, 0, 0),
    //     etime: new Date(2020, 1, 1, 12, 0, 0),
    // },

    const [completed, setCompleted] = useState<number[]>([]);
    useEffect(() => {
        completed.forEach((value) => {
            setTasks((tasks) => tasks.filter((task) => value !== task.id));
        });
    }, [completed]);
    return (
        <>
            <Head>
                <title>Cotidie | Home</title>
                <link rel="shortcut icon" href={icon.src} type="image/x-icon" />
            </Head>
            <main className="bg-background text-white">
                <Navbar loggedin={loggedin} />
                {!loggedin ? (
                    <div></div>
                ) : (
                    <div
                        className="grid grid-cols-2 p-10 gap-10"
                        style={{ gridTemplateColumns: "3fr 1fr" }}
                    >
                        <div
                            className="grid grid-flow-row h-[81.5vh] rounded-lg border border-gray-200 shadow-md dark:bg-[#262633] dark:border-gray-700"
                            style={{ gridTemplateRows: "20% 80%" }}
                        >
                            <Points
                                totalPoints={totalPoints}
                                currentPoints={currentPoints}
                            />
                            <div
                                className="grid grid-rows-2 p-10 pt-2 gap-4 max-h-screen"
                                style={{ gridTemplateRows: "10% 90%" }}
                                id="task-area"
                            >
                                <div className="font-semibold text-3xl">
                                    Tasks
                                </div>
                                <div
                                    className="customScroll flex flex-col p-5 pr-3 gap-5 overflow-x-clip overflow-y-scroll shadow-inner sm:rounded-lg bg-[#20202d]"
                                    ref={taskAreaRef}
                                    onWheel={(e) => {
                                        taskAreaRef.current?.classList.remove(
                                            "customScroll"
                                        );
                                        setTimeout(() => {
                                            taskAreaRef.current?.classList.add(
                                                "customScroll"
                                            );
                                        }, 500);
                                    }}
                                >
                                    {tasks.length ? (
                                        tasks.map((task) => (
                                            <TaskCard
                                                id={task.id}
                                                title={task.title}
                                                time={task.time as Date}
                                                description={task.description}
                                                setCompleted={setCompleted}
                                                completedArray={completed}
                                                propPoints={{
                                                    currentPoints,
                                                    setCurrentPoints,
                                                    completionPoints:
                                                        task.points,
                                                }}
                                                key={task.id}
                                                points={task.points}
                                            />
                                        ))
                                    ) : (
                                        <div className="flex items-center justify-center text-center h-full font-thin italic text-6xl text-gray-800">
                                            No Tasks left
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div
                            className="grid grid-rows-2 gap-10"
                            style={{ gridTemplateRows: ".5fr 1.5fr" }}
                        >
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
                                <div className="flex flex-row items-baseline">
                                    <p className="text-2xl">{user.username}</p>
                                    <p className="text-sm">{`#${user.discriminator}`}</p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-4 p-6 rounded-lg border border-gray-200 shadow-md dark:bg-[#262633] dark:border-gray-700">
                                <div className="font-semibold text-2xl">
                                    Breaks
                                </div>
                                <div
                                    className="customScroll h-full flex flex-col p-5 pr-3 gap-5 overflow-x-clip overflow-y-scroll shadow-inner sm:rounded-lg bg-[#20202d]"
                                    ref={breakAreaRef}
                                    onWheel={(e) => {
                                        breakAreaRef.current?.classList.remove(
                                            "customScroll"
                                        );
                                        setTimeout(() => {
                                            breakAreaRef.current?.classList.add(
                                                "customScroll"
                                            );
                                        }, 500);
                                    }}
                                >
                                    {breaks.length ? (
                                        breaks.map((breakItem, index) => (
                                            <div
                                                className="flex flex-row justify-between overflow-x-clip shadow-md sm:rounded-lg bg-[#242431]"
                                                key={index}
                                            >
                                                <div className="flex flex-col justify-between p-4 gap-1">
                                                    <p className="text-xl font-medium">
                                                        {breakItem.name}
                                                    </p>
                                                    <p className="text-sm font-normal italic text-gray-500">
                                                        {`${breakItem.stime.toLocaleTimeString()} - ${breakItem.etime.toLocaleTimeString()}`}
                                                    </p>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="flex items-center justify-center text-center h-full font-thin italic text-4xl text-gray-800">
                                            No Breaks
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </>
    );
};

export default Home;
