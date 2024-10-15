import React, { useEffect } from "react";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const Calci = () => {
  const [displayResultsOrNot, setdisplayResultsOrNot] = useState(false);
  const [day, setday] = useState(25);
  const [Check, setCheck] = useState(false);
  const [Pday, setPday] = useState(0);
  const [Pmonth, setPmonth] = useState("");

  const currMonth = new Date();
  const nxtMonth = new Date(
    currMonth.getFullYear(),
    currMonth.getMonth() + 1,
    1
  );

  const HandleCalenderChange = (e) => {
    // console.log(e);
    // console.log(e.toString().slice(4, 7));
    // console.log(e.toString().slice(8, 10));
    setPday(e.toString().slice(8, 10));
    setPmonth(e.toString().slice(4, 7));
  };

  const handleDrop = (e) => {
    console.log(e.target.value);
    setday(e.target.value);
  };

  const HandleSubmit = (e) => {
    e.preventDefault();
    setdisplayResultsOrNot(true);
  };

  const tileClassNameFunc1 = (e) => {
    // console.log(e);

    if (Check == true) {
      if (
        e.date.toString().slice(4, 7) == Pmonth &&
        e.date.toString().slice(8, 10) == Pday
      ) {
        // console.log(e.date);
        return "Pday";
      }
      if (
        e.date.toString().slice(4, 7) == Pmonth &&
        e.date.toString().slice(8, 10) == parseInt(Pday) + parseInt(day)
      ) {
        // console.log(e.date);
        return "Pday";
      }

      return "NormalDays";
    }
  };
  const tileClassNameFunc2 = (e) => {
    if (Check == true) {
      if (
        e.date.toString().slice(8, 10) == parseInt(Pday) + parseInt(day) - 31 ||
        e.date.toString().slice(8, 10) == parseInt(Pday) + parseInt(day) - 30
      ) {
        // console.log(e.date);
        return "Pday";
      }
      return "NormalDays";
    }
  };

  useEffect(() => {
    if (Pday != 0) {
      setCheck(true);
    }
  }, [Pday]);

  return (
    <>
      <div className="flex justify-center mt-10 pl-3 pr-3 mb-10">
        <div className="w-full  rounded-xl p-2" id="hero-box">
          <h2 className="font-medium text-gray-400 text-lg mt-1">
            FIND YOUR FERTILITY WINDOW
          </h2>
          <h1 className="text-3xl font-semibold text-blue-700 mb-3">
            Let's Start
          </h1>
          <p className="ml-1 text-md font-semibold text-black mb-3 ">
            To start select the last day of your period.
          </p>
          <form onSubmit={HandleSubmit}>
            <Calendar onChange={HandleCalenderChange} className="mb-5" />
            <p className="ml-1 text-md font-semibold text-black mb-3 ">
              How long is your cycle ?
            </p>
            <select
              name="days"
              id="days"
              className="w-full h-16 text-red-500 font-medium border border-red-500 p-4 rounded-lg"
              onChange={handleDrop}
            >
              <option value="25">25 days</option>
              <option value="26">26 days</option>
              <option value="27">27 days</option>
              <option value="28">28 days</option>
              <option value="29">29 days</option>
              <option value="30">30 days</option>
              <option value="31">31 days</option>
              <option value="32">32 days</option>
              <option value="33">33 days</option>
              <option value="34">34 days</option>
              <option value="35">35 days</option>
            </select>
            <div className="w-full flex justify-center">
              {Check ? (
                <button
                  className="bg-blue-600 mt-5 mb-8 rounded-md w-2/3 h-14 text-white font-bold  hover:bg-blue-800 duration-200 text-xl "
                  type="submit"
                >
                  Calculate
                </button>
              ) : (
                <button
                  className="bg-gray-500 mt-5 mb-8 rounded-md w-2/3 h-14 text-white font-bold text-xl "
                  type="button"
                >
                  Calculate
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
      <div className="flex justify-center mt-7 pl-3 pr-3 mb-20">
        {displayResultsOrNot && (
          <div className="w-full  rounded-xl p-2" id="hero-box">
            <h2 className="font-medium text-gray-400 text-lg mt-1">
              CHECK YOUR RESULTS
            </h2>
            <h1 className="text-3xl font-semibold text-blue-700 mb-3">
              RESULTS
            </h1>
            <p className="ml-1 text-md font-semibold text-black mb-3 ">
              Here are the results :
            </p>
            <Calendar
              className="mb-5"
              tileClassName={tileClassNameFunc1}
              value={new Date()}
            />
            <Calendar
              className="mb-5"
              tileClassName={tileClassNameFunc2}
              value={nxtMonth}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Calci;
