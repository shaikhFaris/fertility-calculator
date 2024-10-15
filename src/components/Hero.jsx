import React from "react";

const Hero = () => {
  return (
    <div className="flex justify-center mt-7 pl-3 pr-3">
      <div className="w-full  rounded-xl p-2" id="hero-box">
        <h2 className="font-medium text-gray-400 text-lg mt-1">
          HEATH AND PREGNANCY
        </h2>
        <h1 className="text-3xl font-semibold text-blue-700 mb-3">
          Ovulution Calculator
        </h1>
        <p className="ml-1 text-sm font-normal text-black">
          Your menstrual cycle can vary from month to month, and not everyone's
          is the same length. Use this calculator to see when you may be
          ovulating to find your most fertile days. Typically, you can get
          pregnant during about 6 days each month. That's called your fertility
          window.
        </p>
        <div className="w-full flex justify-center">
          <button className="bg-blue-600 mt-4 mb-2 rounded-sm w-1/3 h-12 text-white font-bold  hover:bg-blue-800 duration-200">
            <a
              href="https://simple.wikipedia.org/wiki/Menstrual_cycle"
              target="_blank"
            >
              More info
            </a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
