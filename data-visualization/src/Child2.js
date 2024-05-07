import React, { useEffect, useState, useRef } from 'react';
import * as d3 from 'd3';

function Child2(props) {
	const svgRef = useRef();
	const { data } = props;
	const options = ['A', 'B', 'C'];
	const [scatterplotData, setScatterplotData] = useState([]);

	const [selectedValue, setSelectedValue] = useState('A');

	useEffect(() => {
		// console.log(scatterplotData);
        if (data.length > 0) {
            setScatterplotData(
                data.filter((item) => {
                    return item.category === selectedValue;
                })
            );
        }
	}, [selectedValue, data]);

	const onOptionChange = (e) => {
		setSelectedValue(e.target.value);
	};

    useEffect(() => {
        if (scatterplotData.length === 0) return;

        const margin = { top: 20, right: 30, bottom: 40, left: 50 };
        const height = 400 - margin.top - margin.bottom;

        const svg = d3.select(svgRef.current)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);
        const resizeHandler = () => {
            const parentWidth = svgRef.current.parentElement.clientWidth;
            const width = parentWidth - margin.left - margin.right;

            svgRef.current.setAttribute("width", width);

            const x = d3.scaleLinear()
                .domain([0, 50])
                .range([0, width]);

            const y = d3.scaleLinear()
                .domain([0, 50]) 
                .range([height, 0]);

            svg.selectAll("g").remove(); 
            svg.selectAll("circle").remove(); 

            svg.append("rect")
                .attr("width", width)
                .attr("height", height)
                .attr("fill", "#f5f5f5"); 

            svg.append("g")
                .attr("transform", `translate(0,${height})`)
                .call(d3.axisBottom(x).ticks(6).tickFormat(d3.format(".0f")))
                .append("text")
                .attr("x", width / 2)
                .attr("y", margin.bottom - 10)
                .attr("fill", "#000")
                .attr("text-anchor", "middle")
                .text('X');

            svg.append("g")
                .call(d3.axisLeft(y).ticks(6)) 
                .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", -margin.left + 10)
                .attr("x", -height / 2)
                .attr("dy", "1em")
                .attr("fill", "#000")
                .attr("text-anchor", "middle")
                .text("Y");

            svg.selectAll("circle")
                .data(scatterplotData)
                .enter()
                .append("circle")
                .attr("cx", d => x(d.x))
                .attr("cy", d => y(d.y))
                .attr("r", 5);
        };

        resizeHandler(); 

        window.addEventListener("resize", resizeHandler); 

        return () => {
            window.removeEventListener("resize", resizeHandler); 
        };
    }, [scatterplotData]);
	return (
		<div className='scatter-plot-container'>
			<select onChange={onOptionChange}>
				{options.map((option, i) => (
					<option key={i}>{option}</option>
				))}
			</select>
            <div>
                <svg ref={svgRef}></svg>
            </div>
		</div>
	);
}

export default Child2;
