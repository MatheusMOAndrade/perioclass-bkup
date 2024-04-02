import { useState } from "react";
import { Bar } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
Chart.register(CategoryScale);

import { useEffect } from "react";

const BarChart = ({ Data, barConfig }) => {
  const backgroundSet = () => {
    const maxArg = Data.map((x, i) => [x.quantity, i]).reduce((r, a) =>
      a[0] > r[0] ? a : r
    )[1];

    return Data.map((x, i) => {
      if (i === maxArg) {
        return "#7FD298";
      } else {
        return "#7FD298";
      }
    });
  };

  const backgroundSetHover = () => {
    const maxArg = Data.map((x, i) => [x.quantity, i]).reduce((r, a) =>
      a[0] > r[0] ? a : r
    )[1];

    return Data.map((x, i) => {
      if (i === maxArg) {
        return "#D92323C4";
      } else {
        return "#D92323C4";
      }
    });
  };

  // return

  const [options, setOptions] = useState({
    plugins: {
      legend: {
        display: false,
      },
    },
    maintainAspectRatio: false,
    indexAxis: "y",

    scales: {
      y: {
        grid: {
          drawOnChartArea: false,
        },
        ticks: {
          display: true,
          color: "white", // Change the color of the graph numbers here
        },
      },
      x: {
        grid: {
          drawOnChartArea: false,
          drawTicks: false,
          drawBorder: true,
        },
        display: true,
        ticks: {
          display: true,
          color: "white",
        },
      },
    },
  });

  const caseA = {};

  console.log('XABLAU', barConfig);

  const [stateData, setStateData] = useState(barConfig);

  return <Bar data={stateData} options={options} />;
};

export default BarChart;

function getGradeCounts(data) {
  const result = {};

  for (const key in data) {
    const stateData = data[key];
    result[key] = {
      male: {
        a: stateData.male.count.grade.a,
        b: stateData.male.count.grade.b,
        c: stateData.male.count.grade.c,
      },
      female: {
        a: stateData.female.count.grade.a,
        b: stateData.female.count.grade.b,
        c: stateData.female.count.grade.c,
      },
    };
  }

  return result;
}
