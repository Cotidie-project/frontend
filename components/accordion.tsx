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
    //    title = "What is term?";
    //    content = `Our asked sex point her she seems. New plenty she horses parish design you. Stuff sight equal of my woody. Him children bringing goodness suitable she entirely put far daughter.`;
    return (
      <div className="grid place-items-center">
          <div className="w-6/12 bg-gray-800 mx-auto rounded-xl">
          <div className="p-10 shadow-2xl">
              <h3 className="text-lg font-bold text-white">Frequently Asked Questions</h3>
              <p className="text-sm font-semibold text-gray-600 my-3">
              Here are the questions everyone asks and our answer to that! 
              </p>

              <div className="h-1 w-full mx-auto border-b my-5"></div>

              <div className="transition hover:bg-gray-600 rounded-full">
              <div className="accordion-header cursor-pointer transition flex space-x-5 px-5 items-center h-16">
                  <i className="fas fa-plus"></i>
                  <h3>What does Cotidie mean?</h3>
              </div>
              <div className="accordion-content px-5 pt-0 overflow-hidden max-h-0">
                  <p className="leading-6 font-light pl-9 text-justify">
                  Our asked sex point her she seems. New plenty she horses parish design you. Stuff sight equal of my woody. Him children bringing goodness suitable she entirely put
                  far daughter.
                  </p>
                  <button className="rounded-full bg-indigo-600 text-white font-medium font-lg px-6 py-2 my-5 ml-9">Learn more</button>
              </div>
              </div>

              <div className="transition hover:bg-gray-600 rounded-full">
              <div className="accordion-header cursor-pointer transition flex space-x-5 px-5 items-center h-16">
                  <i className="fas fa-plus"></i>
                  <h3>Why is this free?</h3>
              </div>
              <div className="accordion-content px-5 pt-0 overflow-hidden max-h-0">
                  <p className="leading-6 font-light pl-9 text-justify">
                  Our asked sex point her she seems. New plenty she horses parish design you. Stuff sight equal of my woody. Him children bringing goodness suitable she entirely put
                  far daughter.
                  </p>
                  <button className="rounded-full bg-indigo-600 text-white font-medium font-lg px-6 py-2 my-5 ml-9">Learn more</button>
              </div>
              </div>

              <div className="transition hover:bg-gray-600 rounded-full">
              <div className="accordion-header cursor-pointer transition flex space-x-5 px-5 items-center h-16">
                  <i className="fas fa-plus"></i>
                  <h3>How does it work?</h3>
              </div>
              <div className="accordion-content px-5 pt-0 overflow-hidden max-h-0">
                  <p className="leading-6 font-light pl-9 text-justify">
                  Our asked sex point her she seems. New plenty she horses parish design you. Stuff sight equal of my woody. Him children bringing goodness suitable she entirely put
                  far daughter.
                  </p>
                  <button className="rounded-full bg-indigo-600 text-white font-medium font-lg px-6 py-2 my-5 ml-9">Learn more</button>
              </div>
              </div>

              <div className="transition hover:bg-gray-600 rounded-full">
              <div className="accordion-header cursor-pointer transition flex space-x-5 px-5 items-center h-16">
                  <i className="fas fa-plus"></i>
                  <h3>How is it different from other day planners?</h3>
              </div>
              <div className="accordion-content px-5 pt-0 overflow-hidden max-h-0">
                  <p className="leading-6 font-light pl-9 text-justify">
                  Our asked sex point her she seems. New plenty she horses parish design you. Stuff sight equal of my woody. Him children bringing goodness suitable she entirely put
                  far daughter.
                  </p>
                  <button className="rounded-full bg-indigo-600 text-white font-medium font-lg px-6 py-2 my-5 ml-9">Learn more</button>
              </div>
              </div>
          </div>
          </div>
      </div>
    );
};

export default Accordion;
