import type { NextPage } from "next";
import { useState } from "react";
import Navbar from "../../components/navbar";
import Points from "../../components/points";

const Home: NextPage = () => {
    const [totalPoints, setTotalPoints] = useState(420);
    const [currentPoints, setCurrentPoints] = useState(69);

    return (
        <main className=" bg-background text-white min-h-screen">
            <Navbar />
            <div className="flex flex-row h-full">
                <div className="flex flex-col w-3/4 m-10 rounded-lg border border-gray-200 shadow-md dark:bg-inherit dark:border-gray-700">
                    <Points
                        totalPoints={totalPoints}
                        currentPoints={currentPoints}
                    />
                    <div className="flex flex-col p-10 gap-4 relative" id="task-area">
                        <p className="font-semibold text-3xl">Tasks</p>
                        <div className=" rounded-lg border border-gray-200 shadow-inner dark:bg-inherit dark:border-gray-700">
                            {}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-1/4"> </div>
            </div>
        </main>
    );
};

export default Home;
