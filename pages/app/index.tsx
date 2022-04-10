import type { NextPage } from "next";
import { useRef, useState } from "react";
import Navbar from "../../components/navbar";
import Points from "../../components/points";
import Task, { taskProps } from "../../components/taskcard";

const Home: NextPage = () => {
    const [totalPoints, setTotalPoints] = useState(100);
    const [currentPoints, setCurrentPoints] = useState(69);
    const taskAreaRef = useRef<HTMLDivElement>(null);

    // test data
    const [tasks, setTasks] = useState<taskProps[]>([
        {
            title: "Task 1",
            time: new Date(),
            description: "This is a description",
            completed: false,
        },
        {
            title: "Task 2",
            time: new Date(),
            description: "This is a description",
            completed: false,
        },
        {
            title: "Task 2",
            time: new Date(),
            description: "This is a description",
            completed: false,
        },
        {
            title: "Task 2",
            time: new Date(),
            description: "This is a description",
            completed: false,
        },
        {
            title: "Task 2",
            time: new Date(),
            description: "This is a description",
            completed: false,
        },
    ]);

    return (
        <main className=" bg-background text-white min-h-screen">
            <Navbar />
            <div className="flex flex-row h-full">
                <button></button>
                <div
                    className="grid grid-flow-row w-3/4 m-10 absolute top-16 bottom-0 rounded-lg border border-gray-200 shadow-md dark:bg-[#262633] dark:border-gray-700"
                    style={{ gridTemplateRows: "20% 80%" }}
                >
                    <Points
                        totalPoints={totalPoints}
                        currentPoints={currentPoints}
                    />
                    <div
                        className="grid grid-rows-2 p-10 pt-2 gap-4 relative min-h-fit"
                        style={{ gridTemplateRows: "10%" }}
                        id="task-area"
                    >
                        <div className="font-semibold text-3xl">Tasks</div>
                        <div
                            className="customScroll flex flex-col p-5 pr-3 gap-5 min-h-full overflow-x-clip overflow-y-scroll shadow-inner sm:rounded-lg bg-[#20202d]"
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
                            {tasks.map((task, index) => (
                                <div
                                    onClick={() => {
                                        setCurrentPoints(currentPoints + 10);
                                        console.log("clicked");
                                    }}
                                    key={index}
                                >
                                    <Task
                                        title={task.title}
                                        time={task.time}
                                        description={task.description}
                                        completed={task.completed}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-1/4"> </div>
            </div>
        </main>
    );
};

export default Home;
