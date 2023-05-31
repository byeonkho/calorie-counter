import React, { useState, useEffect } from "react";
import {
	fetchSearchIngredients,
	fetchIngredientData,
} from "../api/apifetchers";
import { TextField, Button, Typography } from "@mui/material";

const Food = () => {
	const [searchQueryData, setSearchQueryData] = useState([]);
	const [searchQueryInput, setSearchQueryInput] = useState("");
	const [ingredientData, setIngredientData] = useState([]);

	///// handlers for onChange / onClick
	const handleSearchQueryInputChange = (event) => {
		setSearchQueryInput(event.target.value);
	};

	const handleSearchQuerySubmit = () => {
		getSearchQueryData(searchQueryInput);
	};

	const handleIngredientClick = (value) => {
		console.log("Clicked value:", value);
		getIngredientData(value);
	};

	/////

	const getSearchQueryData = async (searchQueryInput) => {
		const { ok, data } = await fetchSearchIngredients(
			searchQueryInput,
			null,
			"GET"
		);

		if (ok) {
			setSearchQueryData(data);
			console.log("res ok", data);
		} else {
			console.log("res failed");
		}
	};

	const getIngredientData = async (ingredientID) => {
		const { ok, data } = await fetchIngredientData(ingredientID, null, "GET");

		if (ok) {
			const cleanedData = {
				name: data.name,
				// is an array
				possibleUnits: data.possibleUnits,
				estimatedCost: data.estimatedCost,
				nutrients: data.nutrition.nutrients,
				category: data.categoryPath,
			};
			setIngredientData(cleanedData);
			console.log("res ok", cleanedData);
		} else {
			console.log("res failed");
		}
	};

	// useEffect(() => {
	// 	// Code to run on component mount
	// 	// getData();
	// 	// Return a cleanup function (optional) for component unmount or before re-run
	// 	return () => {
	// 		// Cleanup code here
	// 	};
	// }, []); // Empty dependency array means it will only run once on mount

	return (
		<>
			<Typography>Search for your food by name</Typography>
			<TextField
				value={searchQueryInput}
				onChange={handleSearchQueryInputChange}
				label="Search for food"
				variant="outlined"
			/>
			<Button
				variant="contained"
				color="primary"
				onClick={handleSearchQuerySubmit}
			>
				Submit
			</Button>
			{searchQueryData.results &&
				searchQueryData.results.map((result) => (
					<Typography
						key={result.id}
						variant="body1"
						onClick={() => handleIngredientClick(result.id)}
						style={{ cursor: "pointer" }}
						// value={result.id}
					>
						{result.id} - {result.name}
					</Typography>
				))}
		</>
	);
};

export default Food;
