import React, { useState, useEffect } from "react";
import {
	Box,
	Typography,
	TextField,
	Select,
	MenuItem,
	Button,
} from "@mui/material";
import { fetchIngredientData } from "../../api/apifetchers";
import moment from "moment";

const FoodInput = (props) => {
	const [servingsInput, setServingsInput] = useState("");

	const handleServingsInputChange = (event) => {
		setServingsInput(event.target.value);
	};

	const [selectedUnitOption, setSelectedUnitOption] = useState("");

	const handleUnitOptionChange = (event) => {
		setSelectedUnitOption(event.target.value);
	};

	const [selectedDayOption, setSelectedDayOption] = useState("");

	const handleDayOptionChange = (event) => {
		setSelectedDayOption(event.target.value);
	};

	const getIngredientData = async (ingredientID, amount, unit) => {
		const { ok, data } = await fetchIngredientData(
			ingredientID,
			null,
			amount,
			unit
		);

		if (ok) {
			const cleanedData = {
				name: data.name,
				// is an array
				possibleUnits: data.possibleUnits,
				estimatedCost: data.estimatedCost,
				nutrients: data.nutrition.nutrients,
				category: data.categoryPath,
				id: data.id,
			};
			props.setIngredientDataState(cleanedData);
			console.log("res ok", "ingredientDataState", cleanedData);
		} else {
			console.log("res failed");
		}
	};

	const putDBSubmit = async (data) => {
		const backendURL = import.meta.env.VITE_BACKEND_URL;

		try {
			const response = await fetch(backendURL + "/addfood", {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});

			if (!response.ok) {
				throw new Error("Request failed with status " + response.status);
			}

			const result = await response.json();
			console.log(result); // Handle the response from the backend
		} catch (error) {
			console.error("Error:", error.message);
		}
	};

	const handleDBsubmit = () => {
		const nutrientList = [
			"Calories",
			"Sodium",
			"Fat",
			"Potassium",
			"Saturated",
			"Carbohydrates",
			"Poly Unsaturated Fat",
			"Fiber",
			"Mono Unsaturated Fat",
			"Sugar",
			"Trans Fat",
			"Protein",
			"Cholesterol",
		];

		const dbObj = {
			user_id: "1",
			ingredient_id: props.ingredientDataState.id,
			name: props.ingredientDataState.name,
			servings: servingsInput,
			unit: selectedUnitOption,
			date_entered: props.formattedDateState,
			dayPeriod: selectedDayOption,
		};

		nutrientList.forEach((nutrient) => {
			const nutrientObj = props.ingredientDataState.nutrients.find(
				(nut) => nut.name.toLowerCase() === nutrient.toLowerCase()
			);

			const amount = nutrientObj ? nutrientObj.amount : null;
			const unit = nutrientObj ? nutrientObj.unit : null;
			dbObj[nutrient] = nutrientObj ? `${amount}${unit}` : null;
		});

		console.log(dbObj);

		putDBSubmit(dbObj);
	};

	useEffect(() => {
		if (servingsInput && selectedUnitOption) {
			getIngredientData(
				props.ingredientDataState.id,
				servingsInput,
				selectedUnitOption
			);
		}
	}, [servingsInput, selectedUnitOption]);

	return (
		<Box
			sx={{
				width: "100%",
				maxWidth: 360,
				bgcolor: "background.paper",
				border: "1px solid gray",
			}}
		>
			{props.ingredientDataState.name && (
				<>
					<Typography>
						{props.ingredientDataState.name} -{" "}
						{props.ingredientDataState.category[0]}
					</Typography>
					<Typography>How much?</Typography>
					<Box sx={{ display: "flex" }}>
						<TextField
							value={servingsInput}
							onChange={handleServingsInputChange}
							label="Quantity"
							variant="outlined"
							sx={{ width: "15%" }}
						/>
						<Typography>Servings of</Typography>
						<Select
							value={selectedUnitOption}
							onChange={handleUnitOptionChange}
						>
							{props.ingredientDataState.possibleUnits.map((option) => (
								<MenuItem
									key={option}
									value={option}
								>
									{option}
								</MenuItem>
							))}
						</Select>
					</Box>
					<Typography>To which meal?</Typography>
					<Select
						value={selectedDayOption}
						onChange={handleDayOptionChange}
					>
						<MenuItem value={"Breakfast"}>Breakfast</MenuItem>
						<MenuItem value={"Lunch"}>Lunch</MenuItem>
						<MenuItem value={"Dinner"}>Dinner</MenuItem>
					</Select>
					<Button
						variant="contained"
						color="primary"
						onClick={handleDBsubmit}
					>
						Submit
					</Button>
				</>
			)}
		</Box>
	);
};

export default FoodInput;
