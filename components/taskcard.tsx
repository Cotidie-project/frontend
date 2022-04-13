import { NextPage } from "next";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

export interface taskProps {
    id: number;
    title: string;
    time: Date;
    description: string;
    completedArray: number[];
    setCompleted: Dispatch<SetStateAction<number[]>>;
    points: {
        currentPoints: number;
        setCurrentPoints: Dispatch<SetStateAction<number>>;
        completionPoints: number;
    };
}

const Task: NextPage<taskProps> = ({ ...task }) => {
    const taskRef = useRef<HTMLDivElement>(null);
    const handleCompleted = () => {
        task.points.setCurrentPoints(
            task.points.currentPoints + task.points.completionPoints
        );
        // if (taskRef.current) {
        //     taskRef.current.classList.add("")
        // }
        task.setCompleted(task.completedArray.concat(task.id));
    };
    return (
        <div
            className="grid grid-flow-col"
            style={{ gridTemplateColumns: "1fr 8fr" }}
            ref={taskRef}
        >
            <div
                id="time"
                className="flex flex-col pr-3 text-center justify-center"
            >
                {task.time.toLocaleTimeString([], {
                    hour: "numeric",
                    minute: "2-digit",
                    second: undefined,
                })}
            </div>
            <div
                id="info"
                className="flex flex-row justify-between overflow-x-clip shadow-md sm:rounded-lg bg-[#242431]"
            >
                <div>
                    <div className="flex flex-col justify-between p-4 gap-1">
                        <p className="text-3xl font-medium">{task.title}</p>
                        <p className="text-sm font-normal italic text-gray-500">
                            {task.description}
                        </p>
                    </div>
                </div>
                <div
                    className="flex flex-col justify-center text-sm text-center border-l border-gray-700 cursor-pointer p-4 text-blue-600"
                    onClick={handleCompleted}
                >
                    Mark as Done
                </div>
            </div>
        </div>
    );
};

export default Task;
