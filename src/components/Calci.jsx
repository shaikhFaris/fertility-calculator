import React, { useEffect } from "react";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { FaEdit } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Calci = () => {
  const [displayResultsOrNot, setdisplayResultsOrNot] = useState(false);
  const [day, setday] = useState(25);
  const [data, setData] = useState(null);
  const [Currdata, setCurrData] = useState(null);
  const [CheckBtn, setCheckBtn] = useState(false);
  const [CheckCalender, setCheckCalender] = useState(true);
  const [Pday, setPday] = useState(0);
  const [Pmonth, setPmonth] = useState("");
  const settings = {
    // className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "40px",
    slidesToShow: 3,
    draggable: true,
    speed: 200,
    initialSlide: 3,
    easing: "ease-in-out",
    focusOnSelect: true,
    dots: false,
  };

  const handleAfterChange = (e) => {
    console.log(`days=${e + 25}`);
    setday(e + 25);
  };

  const year = [
    { name: "Jan", days: 31 },
    { name: "Feb", days: 28 },
    { name: "Mar", days: 31 },
    { name: "Apr", days: 30 },
    { name: "May", days: 31 },
    { name: "Jun", days: 30 },
    { name: "Jul", days: 31 },
    { name: "Aug", days: 31 },
    { name: "Sep", days: 30 },
    { name: "Oct", days: 31 },
    { name: "Nov", days: 30 },
    { name: "Dec", days: 31 },
    { name: "Jan", days: 31 },
  ];

  const HandleCalenderChange = (e) => {
    console.log(e.getMonth());
    setPday(e.toString().slice(8, 10));
    setPmonth(e.getMonth());
  };

  // const handleDrop = (e) => {
  //   console.log("days= " + e.target.value);
  //   setday(parseInt(e.target.value));
  // };
  const handleEdit = () => {
    setCheckCalender(true);
    setdisplayResultsOrNot(false);
  };

  const HandleSubmit = (e) => {
    e.preventDefault();
    setdisplayResultsOrNot(true);
    setCheckBtn(false);
    setCheckCalender(false);
  };

  useEffect(() => {
    if (Pday != 0) {
      setCheckBtn(true);
    }
  }, [Pday]);

  const periodDate = () => {
    if (
      parseInt(Pday) + parseInt(day) >
      year[Pmonth].days + year[Pmonth + 1].days
    ) {
      return `${
        parseInt(Pday) +
        parseInt(day) -
        year[Pmonth].days -
        year[Pmonth + 1].days
      } ${year[Pmonth + 2].name}`;
    }
    if (parseInt(Pday) + parseInt(day) > year[Pmonth].days) {
      return `${parseInt(Pday) + parseInt(day) - year[Pmonth].days} ${
        year[Pmonth + 1].name
      }`;
    } else {
      console.log(parseInt(Pday) + parseInt(day));

      return `${parseInt(Pday) + parseInt(day)} ${year[Pmonth].name}`;
    }
  };
  const pregnancyTestDate = () => {
    if (
      parseInt(Pday) + parseInt(day) + 1 >
      year[Pmonth].days + year[Pmonth + 1].days
    ) {
      return `${
        parseInt(Pday) +
        parseInt(day) -
        year[Pmonth].days -
        year[Pmonth + 1].days +
        1
      } ${year[Pmonth + 2].name}`;
    }
    if (parseInt(Pday) + parseInt(day) + 1 > year[Pmonth].days) {
      return `${parseInt(Pday) + parseInt(day) + 1 - year[Pmonth].days} ${
        year[Pmonth + 1].name
      }`;
    } else {
      console.log(parseInt(Pday) + parseInt(day));

      return `${parseInt(Pday) + parseInt(day) + 1} ${year[Pmonth].name}`;
    }
  };
  const ovulationDate = () => {
    if (parseInt(Pday) + (parseInt(day) - 14) > year[Pmonth].days) {
      return `${parseInt(Pday) + (parseInt(day) - 14) - year[Pmonth].days} ${
        year[Pmonth + 1].name
      }`;
    } else {
      // console.log(parseInt(Pday) + parseInt(day));

      return `${parseInt(Pday) + (parseInt(day) - 14)} ${year[Pmonth].name}`;
    }
  };
  const fertileDate = () => {
    if (parseInt(Pday) + (parseInt(day) - 19) > year[Pmonth].days) {
      return `${parseInt(Pday) + (parseInt(day) - 19) - year[Pmonth].days} ${
        year[Pmonth + 1].name
      } - ${ovulationDate()}`;
    } else {
      // console.log(parseInt(Pday) + parseInt(day));

      return `${parseInt(Pday) + (parseInt(day) - 19)} ${
        year[Pmonth].name
      } - ${ovulationDate()}`;
    }
  };

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
            {CheckCalender && (
              <div>
                <Calendar onChange={HandleCalenderChange} className="mb-5" />
                <p className="ml-1 text-md font-semibold text-black mb-3 ">
                  How long is your cycle ?
                </p>

                <Slider
                  {...settings}
                  className="mt-1"
                  afterChange={handleAfterChange}
                >
                  <div className="h-[88px] cards p-1">
                    <div className="balls bg-pink-300 h-full w-full flex items-center justify-center rounded-full">
                      25 days
                    </div>
                  </div>
                  <div className="h-[88px] cards p-1">
                    <div className="balls bg-pink-300 h-full w-full flex items-center justify-center rounded-full">
                      26 days
                    </div>
                  </div>
                  <div className="h-[88px] cards p-1">
                    <div className="balls bg-pink-300 h-full w-full flex items-center justify-center rounded-full">
                      27 days
                    </div>
                  </div>
                  <div className="h-[88px] cards p-1">
                    <div className="balls bg-pink-300 h-full w-full flex items-center justify-center rounded-full">
                      28 days
                    </div>
                  </div>
                  <div className="h-[88px] cards p-1">
                    <div className="balls bg-pink-300 h-full w-full flex items-center justify-center rounded-full">
                      29 Days
                    </div>
                  </div>
                  <div className="h-[88px] cards p-1">
                    <div className="balls bg-pink-300 h-full w-full flex items-center justify-center rounded-full">
                      30 Days
                    </div>
                  </div>
                  <div className="h-[88px] cards p-1">
                    <div className="balls bg-pink-300 h-full w-full flex items-center justify-center rounded-full">
                      31 Days
                    </div>
                  </div>
                  <div className="h-[88px] cards p-1">
                    <div className="balls bg-pink-300 h-full w-full flex items-center justify-center rounded-full">
                      32 Days
                    </div>
                  </div>
                  <div className="h-[88px] cards p-1">
                    <div className="balls bg-pink-300 h-full w-full flex items-center justify-center rounded-full">
                      33 Days
                    </div>
                  </div>
                  <div className="h-[88px] cards p-1">
                    <div className="balls bg-pink-300 h-full w-full flex items-center justify-center rounded-full">
                      34 Days
                    </div>
                  </div>
                  <div className="h-[88px] cards p-1">
                    <div className="balls bg-pink-300 h-full w-full flex items-center justify-center rounded-full">
                      35 Days
                    </div>
                  </div>
                  <div className="h-[88px] cards p-1">
                    <div className="balls bg-pink-300 h-full w-full flex items-center justify-center rounded-full">
                      36 Days
                    </div>
                  </div>
                  <div className="h-[88px] cards p-1">
                    <div className="balls bg-pink-300 h-full w-full flex items-center justify-center rounded-full">
                      37 Days
                    </div>
                  </div>
                  <div className="h-[88px] cards p-1">
                    <div className="balls bg-pink-300 h-full w-full flex items-center justify-center rounded-full">
                      38 Days
                    </div>
                  </div>
                  <div className="h-[88px] cards p-1">
                    <div className="balls bg-pink-300 h-full w-full flex items-center justify-center rounded-full">
                      39 Days
                    </div>
                  </div>
                  <div className="h-[88px] cards p-1">
                    <div className="balls bg-pink-300 h-full w-full flex items-center justify-center rounded-full">
                      40 Days
                    </div>
                  </div>
                  <div className="h-[88px] cards p-1">
                    <div className="balls bg-pink-300 h-full w-full flex items-center justify-center rounded-full">
                      41 Days
                    </div>
                  </div>
                  <div className="h-[88px] cards p-1">
                    <div className="balls bg-pink-300 h-full w-full flex items-center justify-center rounded-full">
                      42 Days
                    </div>
                  </div>
                  <div className="h-[88px] cards p-1">
                    <div className="balls bg-pink-300 h-full w-full flex items-center justify-center rounded-full">
                      43 Days
                    </div>
                  </div>
                  <div className="h-[88px] cards p-1">
                    <div className="balls bg-pink-300 h-full w-full flex items-center justify-center rounded-full">
                      44 Days
                    </div>
                  </div>
                  <div className="h-[88px] cards p-1">
                    <div className="balls bg-pink-300 h-full w-full flex items-center justify-center rounded-full">
                      45 Days
                    </div>
                  </div>
                </Slider>
              </div>
            )}

            <div className="w-full">
              {CheckBtn ? (
                <div className="w-full flex items-center justify-evenly">
                  <button
                    className="bg-blue-600 mt-5 mb-5 rounded-md w-3/6 h-14 text-white font-bold  hover:bg-blue-800 duration-200 text-xl "
                    type="submit"
                  >
                    Calculate
                  </button>
                  <button
                    className="bg-pink-500 flex items-center justify-center gap-3 mt-5 mb-5 rounded-md w-2/6 h-14 text-white font-bold  hover:bg-pink-700 duration-200 text-xl "
                    type="button"
                  >
                    <FaEdit /> Edit
                  </button>
                </div>
              ) : (
                <div className="w-full flex items-center justify-evenly ">
                  <button
                    className="bg-gray-500 mt-5 mb-5 rounded-md w-3/6 h-14 text-white font-bold text-xl "
                    type="button"
                  >
                    Calculate
                  </button>
                  <button
                    className="bg-pink-500 flex items-center justify-center gap-3 mt-5 mb-5 rounded-md w-2/6 h-14 text-white font-bold  hover:bg-pink-700 duration-200 text-xl "
                    type="button"
                    onClick={handleEdit}
                  >
                    <FaEdit /> Edit
                  </button>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>

      <div className="flex justify-center mt-7 pl-3 pr-3 mb-10">
        {displayResultsOrNot && (
          <div className="w-full  rounded-xl p-2 duration-1000" id="hero-box">
            <h2 className="font-medium text-gray-400 text-lg mt-1">
              CHECK YOUR RESULTS
            </h2>
            <h1 className="text-3xl font-semibold text-blue-700 mb-3">
              RESULTS
            </h1>
            <p className="ml-1 text-md font-semibold text-black mb-3 ">
              Here are the results :
            </p>
            <div className="bg-blue-300 mb-3 h-20 text-xl font-semibold text-blue-900 flex flex-col justify-center  pl-2 pr-2 rounded-lg">
              Fertility Window
              <p className="text-sm text-black">{fertileDate()}</p>
            </div>
            <div className="bg-green-300 mb-3 h-20 text-xl font-semibold text-blue-900 flex flex-col justify-center pl-2 pr-2 rounded-lg">
              Approximate ovulation
              <p className="text-sm text-black">{ovulationDate()}</p>
            </div>
            <div className="bg-pink-300 mb-3 h-20 text-xl font-semibold text-blue-900 flex flex-col justify-center  pl-2 pr-2 rounded-lg">
              Next Period
              <p className="text-sm text-black">{periodDate()}</p>
            </div>
            <div className="bg-yellow-200 mb-8 h-20 text-xl font-semibold text-blue-900 flex flex-col justify-center pl-2 pr-2 rounded-lg ">
              Pregnancy Test Day
              <p className="text-sm text-black">{pregnancyTestDate()}</p>
            </div>
          </div>
        )}
      </div>

      {/* Graph-div */}
      {/* <div className="flex justify-center mt-0 pl-3 pr-3 mb-20">
        {true && (
          <div className="w-full  rounded-xl p-2 duration-1000" id="hero-box">
            <h2 className="font-medium text-gray-400 text-lg mt-1">
              OVERVIEW GRAPH
            </h2>
            <h1 className="text-3xl font-semibold text-blue-700 mb-3">GRAPH</h1>
            <p className="ml-1 text-md font-semibold text-black mb-3 ">
              This graph can give you a more clearer understanding for your
              cycle.
            </p>
          </div>
        )}
      </div> */}
    </>
  );
};

export default Calci;
