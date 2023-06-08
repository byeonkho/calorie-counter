import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { useUserInfo } from "../UserInfoContext";

const BarChart = (props) => {
	const { userID, accessToken } = useUserInfo();
	const [weights, setWeights] = useState([]);

	// Init chart
	const [chartData, setChartData] = useState({
		options: {
			chart: {
				id: "basic-bar",
			},
			xaxis: {
				categories: [],
			},
			legend: {
				show: true,
				position: "top",
				horizontalAlign: "center",
				labels: {
					colors: "#333",
					useSeriesColors: true,
				},
			},
			yaxis: {
				min: 0,
			},
		},
		series: [
			{
				name: "Weight",
				data: [],
			},
		],
	});

	// Chart re-render logic
	useEffect(() => {
		const fetchUserWeights = async () => {
			try {
				const user_id = userID; // Replace with the actual user ID
				const backendURL = import.meta.env.VITE_BACKEND_URL;

				const requestOptions = {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${accessToken}`,
					},
					body: JSON.stringify({ user_id: user_id }),
				};

				const response = await fetch(
					`${backendURL}/user_weights`,
					requestOptions
				);
				const data = await response.json();

				if (response.ok) {
					setWeights(data.weights);
					const sortedWeights = data.weights.sort((a, b) => {
						const dateA = new Date(
							a.weight_date_entered.split("-").reverse().join("-")
						);
						const dateB = new Date(
							b.weight_date_entered.split("-").reverse().join("-")
						);
						return dateA - dateB;
					});

					const categories = sortedWeights.map(
						(weight) => weight.weight_date_entered
					);
					const weightValues = sortedWeights.map((weight) => weight.weight);

					setChartData((prevState) => ({
						...prevState,
						options: {
							...prevState.options,
							xaxis: {
								...prevState.options.xaxis,
								categories: categories,
							},
						},
						series: [
							{
								...prevState.series[0],
								data: weightValues,
							},
						],
					}));
				} else {
					console.error("Failed to fetch user weights:", data.error);
				}
			} catch (error) {
				console.error("Error during fetch:", error);
			}
		};

		fetchUserWeights();
	}, [props.triggerChartRender]);

	return (
		<div style={{ display: "flex", justifyContent: "center" }}>
			<Chart
				options={chartData.options}
				series={chartData.series}
				type="bar"
				width={1000}
			/>
		</div>
	);
};

export default BarChart;
