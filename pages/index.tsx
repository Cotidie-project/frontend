import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import Accordion from "../components/accordion";
import Image from "next/image";
import logo from "../public/logo.png";
import icon from "../public/icon.ico";
import screenshot from "../public/screenshot.png";
import { useRouter } from "next/router";

export const getServerSideProps: GetServerSideProps = async (context) => {
    return {
        props: {
            token: context.req.cookies["token"]
                ? context.req.cookies["token"]
                : null,
        },
    };
};

const Home: NextPage<{ token?: string }> = ({ token }) => {
    const [loggedin, setLoggedin] = useState(token ? true : false);
    const [faq, setFaq] = useState<
        { title: string; desc: string; btntext: string; btnhref: string }[]
    >([
        {
            title: "What does Cotidie mean?",
            desc: "Cotidie is Latin for Daily! That's all it is!",
            btntext: "Get Started",
            btnhref: "#",
        },
        {
            title: "Why is this free?",
            desc: "Cotidie was made as a project for Timathon, a Code Jam, so it is a 100% free and open source! So what are you waiting for, get started!",
            btntext: "Get Started",
            btnhref: "#",
        },
        {
            title: "How does it work?",
            desc: "Cotidie's algorithm is simple. You give it a list of tasks, the day, and a list of your breaks. Cotidie carefully analyses and plans out you day for you. You can check the complete algorithm on our GitHub!",
            btntext: "GitHub",
            btnhref: "https://github.com/Cotidie-project/backend",
        },
        {
            title: "How is it different from other day planners?",
            desc: "Cotidie isn't yet another day planner! It's your daily helper!",
            btntext: "What are you waiting for?",
            btnhref: "#",
        },
    ]);
    const router = useRouter();
    useEffect(() => {
        if (loggedin) router.push("/app");
    });
    return (
        <>
            <Head>
                <title>Cotidie</title>
                <link rel="shortcut icon" href={icon.src} type="image/x-icon" />
            </Head>
            <Navbar loggedin={loggedin} />
            {loggedin ? (
                <div></div>
            ) : (
                <main className="bg-[#1D1D26] font-[Poppins] h-full text-white">
                    <div className="py-24 flex flex-col items-center">
                        <div className="text-5xl font-extrabold">
                            The Planner{" "}
                            <strong className="underline decoration-[#BC248C] decoration-[6px]">
                                that Works
                            </strong>
                            <a className="bg-gradient-to-r from-[#BC248C] to-[#F75F8C] bg-clip-text text-transparent">
                                .
                            </a>
                        </div>
                        &nbsp;
                        <div>
                            <div className="text-gray-600 font-semibold text-center pb-8">
                                Give us your tasks, we plan your day,
                                <br />
                                so you can get your tasks done!
                            </div>
                        </div>
                        &nbsp; &nbsp;
                        <div>
                            <a
                                href="#"
                                className="bg-gradient-to-tr from-[#BC248C] to-[#D3B8BA] text-white font-semibold py-3 px-8 border-b-4 border-[#DE2D66] rounded-lg"
                            >
                                Get Started
                            </a>
                            &nbsp;&nbsp;&nbsp;
                            <a
                                href="#"
                                className="bg-[#2F303D] text-white font-semibold py-3 px-8 border-b-4 border-gray-800 rounded-lg"
                            >
                                Learn More
                            </a>
                        </div>
                        <div>
                            <Image src={screenshot} alt="screenshot" />
                        </div>
                        <div>
                            <h1
                                className="font-extrabold text-4xl"
                                id="Features"
                            >
                                Features
                            </h1>
                        </div>
                        &nbsp;&nbsp;&nbsp;
                        <div className="py-8"></div>
                        <div className="w-full px-20 flex flex-row items-center">
                            <div className="float-left">
                                <h1 className="text-3xl font-bold">
                                    Automatic Day Scheduler
                                </h1>
                                <br />
                                <div className="text-gray-400 font-semibold leading-relaxed w-1/2">
                                    Our automatic day scheduler can schedule
                                    entire weeks for you, given you give us the
                                    list of your tasks. It just needs you list
                                    of tasks for a week or day, and it can
                                    create the entire week/day&apos;s schedule
                                    in a matter of minutes.
                                </div>
                            </div>
                            <div className="float-right">
                                <Image src={logo} alt="illustration" />
                            </div>
                        </div>
                        &nbsp;&nbsp;&nbsp;
                        <div className="py-8"></div>
                        <div className="w-full px-20 flex flex-row items-center">
                            <div className="w-1/2">
                                <Image src={logo} alt="illustration" />
                            </div>
                            <div className="text-right">
                                <h1 className="text-3xl font-bold">
                                    Gamified Experience
                                </h1>
                                <br />
                                <div className=" float-right text-gray-400 font-semibold leading-relaxed w-1/2">
                                    Cotidie has a gamified experience using the
                                    system of points. This makes the overall
                                    process more fun for the user, and studies
                                    show that people are more interested in
                                    games and/or fun things rather than same old
                                    boring tasks.
                                </div>
                            </div>
                        </div>
                        &nbsp;&nbsp;&nbsp;
                        <div className="py-8"></div>
                        <div className="w-full px-20 flex flex-row items-center">
                            <div className="float-left">
                                <h1 className="text-3xl font-bold">
                                    Get Organised
                                </h1>
                                <br />
                                <div className="text-gray-400 font-semibold leading-relaxed w-1/2">
                                    With our carefully crafted User Interface
                                    and Gamified experience, you get your tasks
                                    done in a fun way. This increases your
                                    productivity, as well as makes you more
                                    organised.
                                </div>
                            </div>
                            <div className="float-right">
                                <Image src={logo} alt="illustration" />
                            </div>
                        </div>
                        &nbsp;&nbsp;&nbsp;
                        <div className="py-8"></div>
                        <div className="w-full px-20 flex flex-row items-center">
                            <div className="w-1/2">
                                <Image src={logo} alt="illustration" />
                            </div>
                            <div className="text-right">
                                <h1 className="text-3xl font-bold">
                                    Google Calendar Integration
                                </h1>
                                <br />
                                <div className=" float-right text-gray-400 font-semibold leading-relaxed w-1/2">
                                    If you login/sign up using Google, Cotidie
                                    integrates with your Google Calendar and
                                    adds your tasks into it. Thus you get
                                    reminders for them. This also allows you to
                                    access your schedule anytime, anywhere.
                                </div>
                            </div>
                        </div>
                        &nbsp;&nbsp;&nbsp;
                        <div className="py-8"></div>
                        <div>
                            <h1 className="text-4xl font-extrabold">
                                Why Trust Us, Trust Our Users
                            </h1>
                        </div>
                        &nbsp;&nbsp;&nbsp;
                        <div className="py-8"></div>
                        <div className="px-48 flex flex-row items-center">
                            <article>
                                <div className="flex items-center mb-4 space-x-4">
                                    <Image
                                        className="w-10 h-10 rounded-full"
                                        src={logo}
                                        width="50"
                                        height="50"
                                        alt=""
                                    />
                                    <div className="space-y-1 font-medium dark:text-white">
                                        <p>
                                            Cotidie User #1{" "}
                                            <time
                                                dateTime="2014-08-16 19:00"
                                                className="block text-sm text-gray-500 dark:text-gray-400"
                                            >
                                                Joined on April 2022
                                            </time>
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center mb-1">
                                    <svg
                                        className="w-5 h-5 text-yellow-400"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                    </svg>
                                    <svg
                                        className="w-5 h-5 text-yellow-400"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                    </svg>
                                    <svg
                                        className="w-5 h-5 text-yellow-400"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                    </svg>
                                    <svg
                                        className="w-5 h-5 text-yellow-400"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                    </svg>
                                    <svg
                                        className="w-5 h-5 text-gray-600"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                    </svg>
                                    <h3 className="ml-2 text-sm font-semibold text-gray-900 dark:text-white">
                                        Got my life in order!
                                    </h3>
                                </div>
                                <footer className="mb-5 text-sm text-gray-500 dark:text-gray-400">
                                    <p>
                                        Reviewed in India on{" "}
                                        <time dateTime="2022-08-04 19:00">
                                            April 8th, 2022
                                        </time>
                                    </p>
                                </footer>
                                <p className="mb-2 font-light text-gray-500 dark:text-gray-400">
                                    I recently started using Cotidie, and I
                                    can&apos;t beleive how drastically my daily
                                    life has improved since.
                                </p>
                                <p className="mb-3 font-light text-gray-500 dark:text-gray-400">
                                    Cotidie helped me get my life in order,
                                    esspecially its gamified task system
                                    motivated me to complete tasks so I could
                                    get to the top of the leaderboard! The
                                    Google Calendar integration and its
                                    reminders were also helpful! And the fact
                                    that this is all a 100% free and open source
                                    just makes it 10% better!
                                </p>
                            </article>
                            <div className="px-14"></div>
                            <article>
                                <div className="flex items-center mb-4 space-x-4">
                                    <Image
                                        className="w-10 h-10 rounded-full"
                                        src={logo}
                                        width="50"
                                        height="50"
                                        alt=""
                                    />
                                    <div className="space-y-1 font-medium dark:text-white">
                                        <p>
                                            Cotidie User #2{" "}
                                            <time
                                                dateTime="2014-08-16 19:00"
                                                className="block text-sm text-gray-500 dark:text-gray-400"
                                            >
                                                Joined on April 2022
                                            </time>
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center mb-1">
                                    <svg
                                        className="w-5 h-5 text-yellow-400"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                    </svg>
                                    <svg
                                        className="w-5 h-5 text-yellow-400"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                    </svg>
                                    <svg
                                        className="w-5 h-5 text-yellow-400"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                    </svg>
                                    <svg
                                        className="w-5 h-5 text-yellow-400"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                    </svg>
                                    <svg
                                        className="w-5 h-5 text-yellow-400"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                    </svg>
                                    <h3 className="ml-2 text-sm font-semibold text-gray-900 dark:text-white">
                                        Helped me make my week reach its full
                                        potential!
                                    </h3>
                                </div>
                                <footer className="mb-5 text-sm text-gray-500 dark:text-gray-400">
                                    <p>
                                        Reviewed in India on{" "}
                                        <time dateTime="2022-08-04 19:00">
                                            April 8th, 2022
                                        </time>
                                    </p>
                                </footer>
                                <p className="mb-2 font-light text-gray-500 dark:text-gray-400">
                                    I wouldn&apos;t say I was unorganised but
                                    rather slow. I could rarely get myself to
                                    complete my tasks within the day/week. This
                                    is when I cam across Cotidie and since it
                                    was 100% free, I thought of trying it. And
                                    boy, oh boy, have I improved.
                                </p>
                                <p className="mb-3 font-light text-gray-500 dark:text-gray-400">
                                    Cotidie&apos;s Automatic Week/Day planner
                                    helped me the most. As it planned my day for
                                    me, I did my tasks rather than spending an
                                    hour doing making my schedule. Their point
                                    system also motivated me! This paired with
                                    Google Calendar reminders worked wonders on
                                    me!
                                </p>
                            </article>
                        </div>
                        &nbsp;&nbsp;&nbsp;
                        <div className="py-8"></div>
                        <div>
                            <h1 className="text-4xl font-extrabold" id="faq">
                                FAQ
                            </h1>
                        </div>
                        &nbsp;&nbsp;&nbsp;
                        <div className="py-8"></div>
                        <div>
                            <Accordion
                                heading={"Frequently Asked Questions"}
                                headingCaption={
                                    "Here are the questions everyone asks and our answer to that!"
                                }
                                content={faq}
                            />
                        </div>
                    </div>
                    <footer className="p-4 bg-white sm:p-6 dark:bg-gray-800">
                        <div className="md:flex md:justify-between">
                            <div className="mb-6 md:mb-0">
                                <a href="#" className="flex items-center">
                                    <Image
                                        src={logo}
                                        className="mr-3 h-8"
                                        height="40"
                                        width="40"
                                        alt="Cotidie Logo"
                                    />
                                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                                        &nbsp;&nbsp;Cotidie
                                    </span>
                                </a>
                            </div>
                            <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                                <div>
                                    <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                                        Resources
                                    </h2>
                                    <ul className="text-gray-600 dark:text-gray-400">
                                        <li className="mb-4">
                                            <a
                                                href="https://nextjs.org"
                                                className="hover:underline"
                                            >
                                                NextJS
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="https://tailwindcss.com/"
                                                className="hover:underline"
                                            >
                                                Tailwind CSS
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                                        Follow us
                                    </h2>
                                    <ul className="text-gray-600 dark:text-gray-400">
                                        <li className="mb-4">
                                            <a
                                                href="https://github.com/Cotidie-project"
                                                className="hover:underline "
                                            >
                                                Github
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="https://discord.gg/KYH4Y8aktx"
                                                className="hover:underline"
                                            >
                                                Discord
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                                        Code Jam
                                    </h2>
                                    <ul className="text-gray-600 dark:text-gray-400">
                                        <li className="mb-4">
                                            <a
                                                href="https://twtcodejam.net/timathon/"
                                                className="hover:underline"
                                            >
                                                Timathon
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="https://twtcodejam.net/timathon/team/1424"
                                                className="hover:underline"
                                            >
                                                Our Team
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                        <div className="sm:flex sm:items-center sm:justify-between">
                            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
                                © 2022{" "}
                                <a href="#" className="hover:underline">
                                    Cotidie &amp; Contributors
                                </a>
                                . All Rights Reserved.
                            </span>
                            <div className="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
                                <a
                                    href="https://github.com/Cotidie-project"
                                    className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
                                >
                                    <svg
                                        className="w-5 h-5"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                        aria-hidden="true"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </footer>
                </main>
            )}
        </>
    );
};

export default Home;
