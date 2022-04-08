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
            <div className="flex flex-row min-h-full">
                <div className="flex flex-col w-3/4 m-10 border rounded-xl">
                    <div className="" id="points area">
                        <Points
                            totalPoints={totalPoints}
                            currentPoints={currentPoints}
                        />
                    </div>
                    <div className="" id="task-area"></div>
                </div>
                <div className="flex flex-col w-1/4"> </div>
            </div>
        </main>
    );
};

export default Home;
