import { NextPage } from "next";
import { useState } from "react";

interface Props {
    totalPoints: number;
    currentPoints: number;
}
const ProgressBar: NextPage<Props> = ({ totalPoints, currentPoints }) => {
    const [points, setPoints] = useState((currentPoints * 100) / totalPoints);
    return (
        <div className="flex flex-col relative p-10 gap-y-1">
            <div className="flex justify-between mb-1">
                <span className="text-xl font-medium text-blue-700 dark:text-white">
                    Points
                </span>
                <span className="text-sm font-medium text-blue-700 dark:text-white">
                    {`${points.toFixed(2)}%`}
                </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 dark:bg-gray-700">
                <div
                    className="bg-blue-600 h-4 rounded-full"
                    style={{
                        width: `${points}%`,
                    }}
                ></div>
            </div>
        </div>
    );
};

export default ProgressBar;
