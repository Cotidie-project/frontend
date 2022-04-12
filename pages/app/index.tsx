import type { NextPage } from "next";
import Head from "next/head";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import Navbar from "../../components/navbar";
import Points from "../../components/points";
import Task, { taskProps } from "../../components/taskcard";
import icon from "../../public/icon.ico";

const Home: NextPage = () => {
    const [totalPoints, setTotalPoints] = useState(100);
    const [currentPoints, setCurrentPoints] = useState(69);
    const taskAreaRef = useRef<HTMLDivElement>(null);

    // test data

    const [tasks, setTasks] = useState([
        {
            id: 1,
            title: "Task 1",
            time: new Date(),
            description: "This is a description",
            completionPoints: 1,
        },
        {
            id: 12,
            title: "Task 1",
            time: new Date(),
            description: "This is a description",
            completionPoints: 1,
        },

        {
            id: 13,
            title: "Task 1",
            time: new Date(),
            description: "This is a description",
            completionPoints: 1,
        },

        {
            id: 3,
            title: "Task 1",
            time: new Date(),
            description: "This is a description",
            completionPoints: 1,
        },

        {
            id: 2,
            title: "Task 1",
            time: new Date(),
            description: "This is a description",
            completionPoints: 1,
        },
    ]);

    const [completed, setCompleted] = useState<number[]>([]);
    useEffect(() => {
        completed.forEach((value) => {
            setTasks((tasks) => tasks.filter((task) => value !== task.id));
        });
        // console.log(completed, tasks);
    }, [completed]);
    return (
        <>
            <Head>
                <title>Cotidie | Home</title>
                <link rel="shortcut icon" href={icon.src} type="image/x-icon" />
            </Head>
            <main className="bg-background text-white">
                <Navbar />
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
                            <div className="font-semibold text-3xl">Tasks</div>
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
                                    tasks.map((task, index) => (
                                        <Task
                                            id={task.id}
                                            title={task.title}
                                            time={task.time}
                                            description={task.description}
                                            setCompleted={setCompleted}
                                            completedArray={completed}
                                            points={{
                                                currentPoints,
                                                setCurrentPoints,
                                                completionPoints:
                                                    task.completionPoints,
                                            }}
                                            key={task.id}
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
                    <div className="flex flex-col h-7 rounded-lg border border-gray-200 shadow-md dark:bg-[#262633] dark:border-gray-700">
                        {" "}
                    </div>
                </div>
            </main>
        </>
    );
};

export default Home;
