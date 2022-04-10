import { NextPage } from "next";
import { useEffect, useState } from "react";

interface Props {
    totalPoints: number;
    currentPoints: number;
}
const ProgressBar: NextPage<Props> = ({ totalPoints, currentPoints }) => {
    const [points, setPoints] = useState((currentPoints * 100) / totalPoints);
    useEffect(() => {
        const calculatedPoints = (currentPoints * 100) / totalPoints;
        console.log(calculatedPoints);

        if (points < 100) {
            if (calculatedPoints > 100) {
                setPoints(100);
            } else {
                setPoints(calculatedPoints);
            }
        }
    }, [currentPoints, totalPoints, points]);
    return (
        <div className="flex flex-col relative p-10 gap-y-1">
            <div className="flex justify-between mb-1">
                <span className="text-xl font-medium text-blue-700 dark:text-white">
                    Points
                </span>
                <span className="text-sm font-medium text-blue-700 dark:text-white">
                    {`${points.toFixed(0)}%`}
                </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 dark:bg-gray-700">
                <div
                    className="bg-blue-600 h-4 rounded-full transition-all duration-200 ease-in-out"
                    style={{
                        // width: `${points}%`,
                        transformOrigin: "left",
                        transform: `scaleX(${points}%)`,
                    }}
                ></div>
            </div>
        </div>
    );
};

export default ProgressBar;
