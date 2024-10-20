import React, { useEffect } from "react";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { FaEdit } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Line } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
// Register components
ChartJS.register(
  ChartDataLabels,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Calci = () => {
  const [displayResultsOrNot, setdisplayResultsOrNot] = useState(false);
  const [day, setday] = useState(28);
  const [xCords, setxCords] = useState([]);
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
    setCheckBtn(true);
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
    // console.log(e.getMonth());
    setPday(e.toString().slice(8, 10));
    setPmonth(e.getMonth());
  };

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
      // console.log("pday= " + Pday);
      let s = parseInt(fertileDate().match(/\d+/g)[0]);
      let e = parseInt(fertileDate().match(/\d+/g)[1]);
      console.log(fertileDate());

      const tempArr = [];
      if (s < e) {
        for (let i = s; i <= e; i++) {
          // console.log(i + "");
          tempArr.push(i);
        }
      } else {
        let sMonthIndex = year.findIndex(
          (element) => element.name === fertileDate().slice(3, 6)
        );
        // console.log(sMonthIndex);

        for (let i = s; i <= year[sMonthIndex].days; i++) {
          // console.log(i + "");
          tempArr.push(i);
        }
        for (let i = 1; i <= e; i++) {
          // console.log(i + "");
          tempArr.push(i);
        }
      }
      // console.log(tempArr);

      setxCords(tempArr);
    }
  }, [Pday, day]);

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
      // console.log(parseInt(Pday) + parseInt(day));

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
      // console.log(parseInt(Pday) + parseInt(day));

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

  const data = {
    labels: xCords,
    datasets: [
      {
        data: [1, 1.1, 1.5, 2.5, 5, 5.9],
        borderColor: "#9586c0",
        backgroundColor: "#9586c0",
        fill: false,
        tension: 0.2, // For smooth curves
        pointStyle: "circle",
        pointRadius: 5,
        pointHoverRadius: 8,
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        display: false,
        max: 7,
        grid: {
          display: false, // Hides the vertical grid lines
        },
      },
      x: {
        ticks: {
          color: "#231942",
          font: {
            size: 12,
            weight: "800",
          },
        },
        beginAtZero: false,
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false, // Disable the legend
      },
      tooltip: {
        enabled: false, // Disable the tooltip
      },
      datalabels: {
        color: (index) => {
          // console.log(index);

          if (index.dataIndex == 5) {
            return "#9586c0";
          }
          return "#231942";
        },
        font: {
          size: 12,
          weight: 900,
        },
        display: true, // Show data labels
        align: "top", // Position above the points
        formatter: (value) => {
          console.log(value);
          if (value == 1) {
            return "   LOW";
          }
          if (value <= 1.5) {
            return "LOW";
          }
          if (value > 1.5 && value < 5.9) {
            return "HIGH";
          } else {
            return "PEAK    ";
          }
        },
      },
    },
  };

  return (
    <>
      <div className="flex justify-center mt-10 pl-3 pr-3 mb-10">
        <div className="w-full  rounded-xl p-2" id="hero-box">
          <h2 className="font-medium text-gray-400 text-lg mt-1">
            FIND YOUR FERTILITY WINDOW
          </h2>
          <h1 className="pt-serif-caption text-3xl font-semibold text-[#231942] mb-3">
            Let's Start
          </h1>
          <p className="ml-1 text-md  text-black mb-3 ">
            To start select the last day of your period.
          </p>

          <form onSubmit={HandleSubmit}>
            {CheckCalender && (
              <div>
                <Calendar
                  onChange={HandleCalenderChange}
                  className="mb-5"
                  tileClassName={(e) => {
                    return Pday == e.date.toString().slice(8, 10) &&
                      Pmonth == e.date.getMonth().toString()
                      ? "Pday"
                      : "tiles";
                  }}
                />
                <p className="ml-1 text-md font-semibold text-black mb-3 ">
                  How long is your cycle ?
                </p>

                <Slider
                  {...settings}
                  className="mt-1"
                  afterChange={handleAfterChange}
                >
                  <div className="h-[88px] cards p-1">
                    <div className="balls bg-[#9f86C0] text-white h-full w-full flex items-center justify-center rounded-full">
                      25 days
                    </div>
                  </div>
                  <div className="h-[88px] cards p-1">
                    <div className="balls bg-[#9f86C0] text-white h-full w-full flex items-center justify-center rounded-full">
                      26 days
                    </div>
                  </div>
                  <div className="h-[88px] cards p-1">
                    <div className="balls bg-[#9f86C0] text-white h-full w-full flex items-center justify-center rounded-full">
                      27 days
                    </div>
                  </div>
                  <div className="h-[88px] cards p-1">
                    <div className="balls bg-[#9f86C0] text-white h-full w-full flex items-center justify-center rounded-full">
                      28 days
                    </div>
                  </div>
                  <div className="h-[88px] cards p-1">
                    <div className="balls bg-[#9f86C0] text-white h-full w-full flex items-center justify-center rounded-full">
                      29 Days
                    </div>
                  </div>
                  <div className="h-[88px] cards p-1">
                    <div className="balls bg-[#9f86C0] text-white h-full w-full flex items-center justify-center rounded-full">
                      30 Days
                    </div>
                  </div>
                  <div className="h-[88px] cards p-1">
                    <div className="balls bg-[#9f86C0] text-white h-full w-full flex items-center justify-center rounded-full">
                      31 Days
                    </div>
                  </div>
                  <div className="h-[88px] cards p-1">
                    <div className="balls bg-[#9f86C0] text-white h-full w-full flex items-center justify-center rounded-full">
                      32 Days
                    </div>
                  </div>
                  <div className="h-[88px] cards p-1">
                    <div className="balls bg-[#9f86C0] text-white h-full w-full flex items-center justify-center rounded-full">
                      33 Days
                    </div>
                  </div>
                  <div className="h-[88px] cards p-1">
                    <div className="balls bg-[#9f86C0] text-white h-full w-full flex items-center justify-center rounded-full">
                      34 Days
                    </div>
                  </div>
                  <div className="h-[88px] cards p-1">
                    <div className="balls bg-[#9f86C0] text-white h-full w-full flex items-center justify-center rounded-full">
                      35 Days
                    </div>
                  </div>
                  <div className="h-[88px] cards p-1">
                    <div className="balls bg-[#9f86C0] text-white h-full w-full flex items-center justify-center rounded-full">
                      36 Days
                    </div>
                  </div>
                  <div className="h-[88px] cards p-1">
                    <div className="balls bg-[#9f86C0] text-white h-full w-full flex items-center justify-center rounded-full">
                      37 Days
                    </div>
                  </div>
                  <div className="h-[88px] cards p-1">
                    <div className="balls bg-[#9f86C0] text-white h-full w-full flex items-center justify-center rounded-full">
                      38 Days
                    </div>
                  </div>
                  <div className="h-[88px] cards p-1">
                    <div className="balls bg-[#9f86C0] text-white h-full w-full flex items-center justify-center rounded-full">
                      39 Days
                    </div>
                  </div>
                  <div className="h-[88px] cards p-1">
                    <div className="balls bg-[#9f86C0] text-white h-full w-full flex items-center justify-center rounded-full">
                      40 Days
                    </div>
                  </div>
                  <div className="h-[88px] cards p-1">
                    <div className="balls bg-[#9f86C0] text-white h-full w-full flex items-center justify-center rounded-full">
                      41 Days
                    </div>
                  </div>
                  <div className="h-[88px] cards p-1">
                    <div className="balls bg-[#9f86C0] text-white h-full w-full flex items-center justify-center rounded-full">
                      42 Days
                    </div>
                  </div>
                  <div className="h-[88px] cards p-1">
                    <div className="balls bg-[#9f86C0] text-white h-full w-full flex items-center justify-center rounded-full">
                      43 Days
                    </div>
                  </div>
                  <div className="h-[88px] cards p-1">
                    <div className="balls bg-[#9f86C0] text-white h-full w-full flex items-center justify-center rounded-full">
                      44 Days
                    </div>
                  </div>
                  <div className="h-[88px] cards p-1">
                    <div className="balls bg-[#9f86C0] text-white h-full w-full flex items-center justify-center rounded-full">
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
                    className="bg-[#9586C0] mt-5 mb-5 rounded-md w-3/6 h-14 text-white font-bold  hover:bg-blue-800 duration-200 text-xl "
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
            <h1 className="pt-serif-caption text-3xl font-semibold text-[#231942] mb-3">
              RESULTS
            </h1>
            {/* <p className="ml-1 text-md font-semibold text-black mb-3 ">
              Here are the results :
            </p> */}

            <div className="mt-12 mb-3 text-xl pb-4 font-semibold text-blue-900 flex flex-col items-center  pl-2 pr-2 rounded-lg">
              <div className="cricle-animate w-64 bg-[#dad2f1] h-64 rounded-full text-white flex justify-center items-center ">
                <div className="w-56 bg-[#cfc5ef] h-56 rounded-full text-white flex justify-center items-center">
                  <div className="w-48 bg-[#b8a9e1] h-48 rounded-full text-white flex justify-center items-center ">
                    {/* main div */}
                    <div className="w-40 bg-[#9586c0] h-40 rounded-full text-white flex justify-center items-center">
                      <div className="text-center pt-serif-caption">
                        <p className="text-4xl font-semibold">PEAK</p>
                        <p className="text-2xl">fertility</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ***************************************** */}

              {/* Graph-div */}
              <div className=" w-full h-36 mb-2 mt-8 ">
                <Line data={data} options={options} />
              </div>
              <p className="helvica-font text-sm text-black ">
                {fertileDate()}
              </p>
            </div>

            {/* ***************************************** */}

            <div className="pt-serif-caption bg-[#9f86C0] mb-3 h-20 text-xl font-semibold text-white flex flex-col justify-center pl-2 pr-2 rounded-lg">
              Approximate ovulation
              <p className="helvica-font text-sm text-white ">
                {ovulationDate()}
              </p>
            </div>
            <div className="pt-serif-caption bg-[#be95c4] mb-3 h-20 text-xl font-semibold text-black flex flex-col justify-center  pl-2 pr-2 rounded-lg">
              Next Period
              <p className="helvica-font text-sm text-black ">{periodDate()}</p>
            </div>
            <div className="pt-serif-caption bg-[#595489] mb-8 h-20 text-xl font-semibold text-white flex flex-col justify-center pl-2 pr-2 rounded-lg ">
              Pregnancy Test Day
              <p className="helvica-font text-sm text-white ">
                {pregnancyTestDate()}
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Calci;
