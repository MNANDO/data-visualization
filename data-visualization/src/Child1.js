import React, { useEffect, useState } from 'react'
import * as d3 from 'd3';

function Child1(props) {
    const { data } = props;
    const [barChartValues, setBarChartValues] = useState([
        {
            label: 'A',
            value: 0,
        },
        {
            label: 'B',
            value: 0,
        },
        {
            label: 'C',
            value: 0,
        },
    ]);

    useEffect(() => {
        let aCount,
            bCount,
            cCount = 0;
        if (data.length > 0) {
            aCount = data.reduce((accumulator, item) => {
                if (item.category === 'A') {
                    return (accumulator += 1);
                }
                return accumulator;
            }, 0);

            bCount = data.reduce((accumulator, item) => {
                if (item.category === 'B') {
                    return (accumulator += 1);
                }
                return accumulator;
            }, 0);

            cCount = data.reduce((accumulator, item) => {
                if (item.category === 'C') {
                    return (accumulator += 1);
                }
                return accumulator;
            }, 0);
        }

        setBarChartValues([
            {
                label: 'A',
                value: aCount,
            },
            {
                label: 'B',
                value: bCount,
            },
            {
                label: 'C',
                value: cCount,
            },
        ]);
    }, [data]);

    // set the dimensions and margins of the graph
    var margin = { top: 30, right: 30, bottom: 70, left: 60 },
        width = 460 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    // X axis
    const x = d3.scaleBand()
        .domain(barChartValues.map(i => i.label))
        .range([60, 360])
        .padding(0.1);

    const yScale = d3.scaleLinear()
        .domain([0, Math.ceil(d3.max(barChartValues, d => d.value) / 5) * 5])
        .range([300, 0]);

    useEffect(() => {
        console.log(barChartValues);
    }, [barChartValues]);

    return (
        <div className='bar-chart-container'>
            <svg width={400} height={400}>
                <g transform={`translate(0, 300)`}>
                    {x.domain().map((category, i) => (
                        <g
                            key={i}
                            transform={`translate(${
                                x(category) + x.bandwidth() / 2
                            }, 0)`}
                        >
                            <text
                                dy="1.25em"
                                style={{ fontSize: '10px' }}
                                textAnchor="middle"
                            >
                                {category}
                            </text>
                        </g>
                    ))}
                </g>
                <g transform={`translate(50, 0)`}>
                    {yScale.ticks().map((tick, i) => (
                        <g key={i} transform={`translate(0, ${yScale(tick)})`}>
                            <line x2={350} stroke="#ccc" />
                            <text
                                dy="0.32em"
                                style={{ fontSize: '10px' }}
                                x="-9"
                                y="0"
                            >
                                {tick.toFixed(2)}
                            </text>
                        </g>
                    ))}
                </g>
                {barChartValues.map((d, i) => (
                    <g key={i}>
                        <rect
                            x={x(d.label)}
                            y={yScale(d.value)}
                            width={x.bandwidth()}
                            height={300 - yScale(d.value)}
                            fill="steelblue"
                        />
                        <text
                            x={x(d.category) + x.bandwidth() / 2}
                            y={yScale(d.value) - 5}
                            fill="black"
                            textAnchor="middle"
                        >
                            {d.value}
                        </text>
                    </g>
                ))}
            </svg>

        </div>
	);
}

export default Child1;