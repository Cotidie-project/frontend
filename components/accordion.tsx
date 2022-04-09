import { NextPage } from "next";
import { useRef, useState } from "react";

interface Props {
    title: string;
    content: string;
}

const Accordion: NextPage<Props> = ({ title, content }) => {
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
    // test info
    //     title = "What is term?";
    //     content = `Our asked sex point her she seems. New plenty she horses parish design you. Stuff sight equal of my woody. Him children bringing goodness suitable she entirely put far daughter.`;
    return (
        <div className="accordion">
            <link
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css"
                rel="stylesheet"
            />
            {/* <!-- Accordion Wrapper --> */}
            <div
                className={`transition hover:bg-indigo-50 ${
                    isOpen ? "" : "bg-indigo-50"
                }`}
            >
                {/* <!-- header --> */}
                <div
                    onClick={expandContent}
                    className="accordion-header cursor-pointer transition flex space-x-5 px-5 items-center h-16"
                >
                    <i className={`fas ${isOpen ? "fa-minus" : "fa-plus"}`}></i>
                    <h3>{title}</h3>
                </div>
                {/* <!-- Content --> */}
                <div
                    className="accordion-content px-5 pt-0 overflow-hidden max-h-0"
                    ref={ref}
                    style={{
                        transition:
                            "max-height 0.3s ease-out, padding 0.3s ease",
                    }}
                >
                    <p className="leading-6 font-light pl-9 text-justify">
                        {content}
                    </p>
                    <button className="rounded-full bg-indigo-600 text-white font-medium font-lg px-6 py-2 my-5 ml-9">
                        Learn more
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Accordion;
