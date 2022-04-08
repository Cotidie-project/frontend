import { NextPage } from "next";

interface Props {
    totalPoints: number;
    currentPoints: number;
}
const ProgressBar: NextPage<Props> = ({ totalPoints, currentPoints }) => {
    return (
        <div className="flex flex-col p-10 gap-y-5">
            <p className="text-3xl font-bold">Points</p>
            <div className="flex flex-row gap-4" id="progress-container">
                <div
                    className="bg-gray-300 rounded-xl w-full"
                    id="progress-bar"
                >
                    <div
                        className="bg-green-500 rounded-l-xl h-full"
                        style={{
                            width: `${(currentPoints * 100) / totalPoints}%`,
                        }}
                    ></div>
                </div>
                <p className=" text-base font-semibold">
                    {currentPoints}/{totalPoints}
                </p>
            </div>
        </div>
    );
};

export default ProgressBar;
