import React from "react";
import Chart from "react-apexcharts";

const PieChart = (props) => {
	const chartData = {
		series: [
			props.totals.carbohydrates,
			props.totals.fat,
			props.totals.protein,
		],
		options: {
			chart: {
				type: "pie",
			},
			labels: ["Carbohydrates", "Fat", "Protein"],
		},
	};

	return (
		<Chart
			options={chartData.options}
			series={chartData.series}
			type="pie"
			width="100%"
		/>
	);
};

export default PieChart;
