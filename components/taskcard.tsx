import { NextPage } from "next";
import { useState } from "react";

export interface taskProps {
    title: string;
    time: Date;
    description: string;
    completed: boolean;
}

const Task: NextPage<taskProps> = ({ ...task }) => {
    return (
        <div
            className="grid grid-flow-col"
            style={{ gridTemplateColumns: "1fr 8fr" }}
        >
            <div className="flex flex-col pr-3 text-center justify-center">
                {task.time.toLocaleTimeString([], {
                    hour: "numeric",
                    minute: "2-digit",
                    second: undefined,
                })}
            </div>
            <div className="flex flex-col overflow-x-clip shadow-md sm:rounded-lg bg-[#242431]">
                <div>
                    <div className="flex flex-col justify-between p-4 gap-1">
                        <p className="text-3xl font-medium">{task.title}</p>
                        <p className="text-sm font-normal italic text-gray-500">
                            {task.description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Task;
