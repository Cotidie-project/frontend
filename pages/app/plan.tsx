import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import icon from "../../public/icon.ico";
import Navbar from "../../components/navbar";
import { FormEvent, useRef, useState } from "react";
import { Break, PlanType } from "../../interface";
import { useRouter } from "next/router";
import makeSchedule from "../../utils/makeSchedule";

interface breakProp extends Break {
    stime: Date;
    etime: Date;
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const token = req.cookies["token"];
    if (token) {
        return { props: { token } };
    }
    return {
        props: {},
    };
};

const toDate = (date: string, planType: PlanType): Date => {
    if (planType === PlanType.WEEK) {
        const [year, month, day] = date.split("T")[0].split("-");
        const [hour, minute] = date.split("T")[1].split(":");
        return new Date(
            Number(year),
            Number(month) - 1,
            Number(day),
            Number(hour),
            Number(minute)
        );
    }
    const [hour, minute] = date.split(":");
    return new Date(0, 0, 0, Number(hour), Number(minute));
};
const fromDate = (date: Date, planType: PlanType): string => {
    if (planType === PlanType.WEEK) {
        const dateString = date
            .toLocaleDateString("en-IN", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
            })
            .split("/")
            .reverse()
            .join("-");
        return `${dateString}T${date.getHours()}:${date.getMinutes()}`;
    }
    return `${date.getHours()}:${date.getMinutes()}`;
};

const Plan: NextPage<{ token?: string }> = ({ token }) => {
    const [loggedin, setLoggedin] = useState(token ? true : false);

    const router = useRouter();
    const planType = router.query.type
        ? (router.query.type as PlanType)
        : PlanType.DAY;

    const [breaks, setBreaks] = useState<breakProp[]>([
        // { name: "Test break", stime: new Date(), etime: new Date() },
    ]);
    const ref = useRef<HTMLDivElement>(null);
    const addBreak = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);

        setBreaks((breaks) => [
            ...breaks,
            {
                name: form.get("break-title") as string,
                stime: toDate(form.get("start-time") as string, planType),
                etime: toDate(form.get("end-time") as string, planType),
            },
        ]);

        e.currentTarget.reset();
    };
    const removeBreak = (index: number) => {
        setBreaks((breaks) => breaks.filter((_, i) => i !== index));
    };
    const createSchedule = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const taskList = (form.get("task-list") as string).split(",");
        const schedule = makeSchedule(taskList, breaks, planType);
        fetch(`${process.env.api}/plan`, {
            method: "POST",
            mode: "no-cors",
            body: JSON.stringify({
                plan: schedule,
                plan_type: planType,
                token,
            }),
        }).then(() => {
            router.push("/app");
        });
    };
    return (
        <>
            <Head>
                <title>Cotidie | Plan {planType}</title>
                <link rel="shortcut icon" href={icon.src} type="image/x-icon" />
            </Head>
            <Navbar loggedin={loggedin} />
            {!loggedin ? (
                <div></div>
            ) : (
                <div
                    className="flex flex-col m-10 p-10 gap-8 h-[81vh] rounded-lg text-white border border-gray-200 shadow-md dark:bg-[#262633] dark:border-gray-700"
                    id="main-div"
                >
                    <form
                        className="flex px-2 gap-2 flex-col justify-center"
                        onSubmit={createSchedule}
                    >
                        <h1 className="text-xl text-gray-300 italic">
                            Enter list of tasks
                        </h1>
                        <textarea
                            className="w-full p-4 resize-none outline-none rounded-lg border border-gray-200 dark:bg-[#20202b] dark:border-gray-700"
                            name="task-list"
                            required
                        ></textarea>
                        <label
                            htmlFor="task-list"
                            className="font-thin text-xs text-gray-500 italic -mt-2"
                        >
                            comma seperated list*
                        </label>
                        <div className="flex flex-col pr-10 items-end">
                            <button
                                className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-lg"
                                type="submit"
                            >
                                Create Schedule
                            </button>
                        </div>
                    </form>
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
                            required
                            autoComplete="off"
                        />
                        <input
                            type={
                                planType === PlanType.DAY
                                    ? "time"
                                    : "datetime-local"
                            }
                            className="outline-none px-4 border dark:bg-[#20202b] dark:border-gray-700 rounded-md"
                            name="start-time"
                            required
                        />
                        <div className="flex flex-col text-xl font-light text-gray-300 text-center justify-center">
                            to
                        </div>
                        <input
                            type={
                                planType === PlanType.DAY
                                    ? "time"
                                    : "datetime-local"
                            }
                            className="outline-none px-4 border dark:bg-[#20202b] dark:border-gray-700 rounded-md"
                            name="end-time"
                            required
                        />
                        <button
                            type="submit"
                            className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-lg"
                        >
                            + Add Break
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
                                style={{
                                    gridTemplateColumns:
                                        "4fr 2fr .25fr 2fr 1fr",
                                }}
                                id="add-break"
                                key={index}
                            >
                                <div className="p-3 font-medium text-gray-100 text-xl border dark:bg-[#20202b] dark:border-gray-700 rounded-md">
                                    {breakItem.name}
                                </div>
                                <input
                                    type={
                                        planType === PlanType.DAY
                                            ? "time"
                                            : "datetime-local"
                                    }
                                    className="outline-none px-4 border dark:bg-[#20202b] dark:border-gray-700 rounded-md"
                                    id="start-time"
                                    value={fromDate(breakItem.stime, planType)}
                                    disabled
                                />
                                <div className="flex flex-col text-xl font-light text-gray-300 text-center justify-center">
                                    to
                                </div>
                                <input
                                    type={
                                        planType === PlanType.DAY
                                            ? "time"
                                            : "datetime-local"
                                    }
                                    className="outline-none px-4 border dark:bg-[#20202b] dark:border-gray-700 rounded-md"
                                    id="end-time"
                                    // value={`${breakItem.etime.getHours()}:${breakItem.etime.getMinutes()}`}
                                    value={fromDate(breakItem.etime, planType)}
                                    disabled
                                />
                                {/* {console.log(
                                    `${breakItem.etime.getFullYear()}-${breakItem.etime.getMonth()}-${breakItem.etime.getDate()}T${breakItem.etime.getHours()}:${breakItem.etime.getMinutes()}`
                                )} */}
                                <button
                                    className="bg-red-500 hover:bg-red-600 text-white my-2 mr-4 font-bold rounded-lg"
                                    onClick={() => removeBreak(index)}
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};
export default Plan;
