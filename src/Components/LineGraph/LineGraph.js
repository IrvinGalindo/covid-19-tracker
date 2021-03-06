import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import numeral from 'numeral';

import './LineGraph.scss'

const options = {
    legend: {
        display: false,
    },
    elements: {
        point: {
            radius: 0,
        },
    },
    maintainAspectRatio: false,
    tooltips: {
        mode: "index",
        intersect: false,
        callbacks: {
            label: function (tooltipItem, data) {
                return numeral(tooltipItem.value).format("+0.0");
            },
        },
    },
    scales: {
        xAxes: [
            {
                type: "time",
                time: {
                    format: "MM/DD/YY",
                    tooltipFormat: "ll",
                },
            },
        ],
        yAxes: [
            {
                gridLines: {
                    display: false,

                },
                ticks: {
                    callback: function (value, index, values) {
                        return numeral(value).format("0a");
                    },
                },
            },
        ],
    },
}

function LineGraph({ casesType, ...props }) {
    const [data, setData] = useState([]);

    const buildChartData = (data, casesType = "cases") => {
        if (!data) return
        const chartData = [];
        let lastDataPoint;

        for (let date in data[casesType]) {
            const casesAtDate = data[casesType][date];
            if (lastDataPoint) {
                const newDataPoint = {
                    x: date,
                    y: casesAtDate - lastDataPoint
                }
                chartData.push(newDataPoint);
            }
            lastDataPoint = casesAtDate;
        }
        return chartData;
    }

    useEffect(() => {
        fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=120')
            .then(response => response.json())
            .then(data => {
                const chartData = buildChartData(data, casesType);
                setData(chartData);
            });
    }, [casesType]);

    return (
        <div className='graph'>
            <Line
                data={{
                    datasets: [{
                        backgroundColor: "rgba(204, 16, 52, 0.5)",
                        borderColor: "#CC1034",
                        data: data,
                    }]
                }}
                options={options}
            ></Line>
        </div>
    )
}

export default LineGraph;
