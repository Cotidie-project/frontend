/* eslint-disable react-hooks/rules-of-hooks */
import { NextPage } from "next";
import { Dispatch, RefObject, SetStateAction, useRef, useState } from "react";

interface Props {
    heading: string;
    headingCaption: string;
    content: { title: string; desc: string }[];
}

type modifedContentType = {
    title: string;
    desc: string;
    ref: RefObject<HTMLDivElement>;
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const Accordion: NextPage<Props> = ({ heading, headingCaption, content }) => {
    const modifedContent: modifedContentType[] = [];
    for (const item of content) {
        const [isOpen, setIsOpen] = useState(false);
        modifedContent.push({
            title: item.title,
            desc: item.desc,
            ref: useRef<HTMLDivElement>(null),
            isOpen,
            setIsOpen,
        });
    }

    const expandContent = (content: {
        title: string;
        desc: string;
        ref: RefObject<HTMLDivElement>;
        isOpen: boolean;
        setIsOpen: Dispatch<SetStateAction<boolean>>;
    }) => {
        content.setIsOpen(!content.isOpen);
        if (content.ref.current) {
            if (content.isOpen) {
                content.ref.current.style.maxHeight = "0px";
            } else {
                content.ref.current.style.maxHeight = `${
                    content.ref.current.scrollHeight + 32
                }px`;
            }
        }
        console.log("click");
    };
    return (
        <div className="grid place-items-center">
            <link
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css"
                rel="stylesheet"
            />

            <div className="w-max bg-gray-800 mx-auto rounded-xl">
                <div className="p-10 shadow-2xl">
                    <h3 className="text-lg font-bold text-white">{heading}</h3>
                    <p className="text-sm font-semibold text-gray-600 my-3">
                        {headingCaption}
                    </p>

                    <div className="h-1 w-full mx-auto border-b my-5"></div>

                    {modifedContent.map((item, index) => (
                        <div
                            className="transition hover:bg-gray-600 rounded-full"
                            key={index}
                        >
                            <div
                                onClick={() => expandContent(item)}
                                className="accordion-header cursor-pointer transition flex space-x-5 px-5 items-center h-16"
                            >
                                <i
                                    className={`fas ${
                                        item.isOpen ? "fa-minus" : "fa-plus"
                                    }`}
                                ></i>
                                <h3>{item.title}</h3>
                            </div>
                            <div
                                ref={item.ref}
                                className="accordion-content px-5 pt-0 overflow-hidden max-h-0"
                                style={{
                                    transition:
                                        "max-height 0.3s ease-out, padding 0.3s ease",
                                }}
                            >
                                <p className="leading-6 font-light pl-9 text-justify">
                                    {item.desc}
                                </p>
                                <button className="rounded-full bg-indigo-600 text-white font-medium font-lg px-6 py-2 my-5 ml-9">
                                    Learn more
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Accordion;
