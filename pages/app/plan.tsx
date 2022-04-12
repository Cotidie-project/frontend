import { NextPage } from "next";
import Head from "next/head";
import icon from "../../public/icon.ico";
import Navbar from "../../components/navbar";
import { FormEvent, useRef, useState } from "react";

const Plan: NextPage = () => {
    const [breaks, setBreaks] = useState<
        {
            name: string;
            start: Date;
            end: Date;
        }[]
    >([{ name: "Test break", start: new Date(), end: new Date() }]);
    const ref = useRef<HTMLDivElement>(null);
    const addBreak = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const [endTimeHour, endTimeMinute] = (
            form.get("end-time") as string
        ).split(":");
        const [startTimeHour, startTimeMinute] = (
            form.get("start-time") as string
        ).split(":");

        setBreaks((breaks) => [
            ...breaks,
            {
                name: form.get("break-title") as string,
                start: new Date(
                    2000,
                    0,
                    1,
                    Number.parseInt(startTimeHour),
                    Number.parseInt(startTimeMinute)
                ),
                end: new Date(
                    2000,
                    0,
                    1,
                    Number.parseInt(endTimeHour),
                    Number.parseInt(endTimeMinute)
                ),
            },
        ]);

        e.currentTarget.reset();
    };
    return (
        <>
            <Head>
                <title>Cotidie | Create Tasks</title>
                <link rel="shortcut icon" href={icon.src} type="image/x-icon" />
            </Head>
            <Navbar />
            <div
                className="flex flex-col m-10 p-10 gap-8 h-[81vh] rounded-lg text-white border border-gray-200 shadow-md dark:bg-[#262633] dark:border-gray-700"
                id="main-div"
            >
                <div className="flex px-2 gap-2 flex-col justify-center">
                    <h1 className="text-xl text-gray-300 italic">
                        Enter list of tasks
                    </h1>
                    <textarea
                        className="w-full h-32 p-4 resize-none outline-none rounded-lg border border-gray-200 dark:bg-[#20202b] dark:border-gray-700"
                        id="task-list"
                    ></textarea>
                    <label
                        htmlFor="task-list"
                        className="font-thin text-xs text-gray-500 italic -mt-2"
                    >
                        comma seperated list*
                    </label>
                </div>
                <h1 className="text-xl text-gray-300 italic">Add breaks</h1>
                <form
                    onSubmit={addBreak}
                    className="grid grid-cols-4 p-5 py-0 gap-5"
                    style={{ gridTemplateColumns: "4fr 2fr .25fr 2fr 1fr" }}
                    id="add-break"
                >
                    <input
                        type="text"
                        className="outline-none px-4 border dark:bg-[#20202b] dark:border-gray-700 rounded-md"
                        placeholder="Enter Break Name"
                        name="break-title"
                        onSubmit={(e) => {
                            e.currentTarget.value = "";
                        }}
                        required
                        autoComplete="off"
                    />
                    <input
                        type="time"
                        className="outline-none px-4 border dark:bg-[#20202b] dark:border-gray-700 rounded-md"
                        name="start-time"
                        required
                    />
                    <div className="flex flex-col text-xl font-light text-gray-300 text-center justify-center">
                        to
                    </div>
                    <input
                        type="time"
                        className="outline-none px-4 border dark:bg-[#20202b] dark:border-gray-700 rounded-md"
                        name="end-time"
                        required
                    />
                    <button
                        type="submit"
                        className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-lg"
                    >
                        + Add Break{" "}
                    </button>
                </form>
                <div
                    className="customScroll flex flex-col-reverse gap-5 overflow-y-scroll"
                    ref={ref}
                    onWheel={(e) => {
                        ref.current?.classList.remove("customScroll");
                        setTimeout(() => {
                            ref.current?.classList.add("customScroll");
                        }, 500);
                    }}
                >
                    {breaks.map((breakItem, index) => (
                        <div
                            className="grid grid-cols-4 gap-5"
                            style={{ gridTemplateColumns: "6fr 2fr .5fr 2fr" }}
                            id="add-break"
                            key={index}
                        >
                            <div className="p-3 font-medium text-gray-100 text-xl border dark:bg-[#20202b] dark:border-gray-700 rounded-md">
                                {breakItem.name}
                            </div>
                            <input
                                type="time"
                                className="outline-none px-4 border dark:bg-[#20202b] dark:border-gray-700 rounded-md"
                                id="start-time"
                                value={`${breakItem.start.getHours()}:${breakItem.start.getMinutes()}`}
                                disabled
                            />
                            <div className="flex flex-col text-xl font-light text-gray-300 text-center justify-center">
                                to
                            </div>
                            <input
                                type="time"
                                className="outline-none px-4 border dark:bg-[#20202b] dark:border-gray-700 rounded-md"
                                id="end-time"
                                value={`${breakItem.end.getHours()}:${breakItem.end.getMinutes()}`}
                                disabled
                            />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};
export default Plan;
