import { NextPage } from "next";
import { useRef, useState } from "react";

interface Props {
    heading: string;
    headingCaption: string;
    content: { title: string; desc: string }[];
}

const Accordion: NextPage<Props> = ({ heading, headingCaption, content }) => {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const expandContent = () => {
        setIsOpen(!isOpen);
        if (ref.current) {
            if (isOpen) {
                ref.current.style.maxHeight = "0px";
            } else {
                ref.current.style.maxHeight = `${
                    ref.current.scrollHeight + 32
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

            <div className="w-6/12 bg-gray-800 mx-auto rounded-xl">
                <div className="p-10 shadow-2xl">
                    <h3 className="text-lg font-bold text-white">{heading}</h3>
                    <p className="text-sm font-semibold text-gray-600 my-3">
                        {headingCaption}
                    </p>

                    <div className="h-1 w-full mx-auto border-b my-5"></div>

                    {content.map((item, index) => (
                        <div className="transition hover:bg-gray-600 rounded-full" key={index}>
                            <div
                                onClick={expandContent}
                                className="accordion-header cursor-pointer transition flex space-x-5 px-5 items-center h-16"
                            >
                                <i
                                    className={`fas ${
                                        isOpen ? "fa-minus" : "fa-plus"
                                    }`}
                                ></i>
                                <h3>{item.title}</h3>
                            </div>
                            <div
                                ref={ref}
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
