import React, { useState, useEffect } from "react";
import { Box, Typography, TextField, Select, MenuItem } from "@mui/material";
import { fetchIngredientData } from "../../api/apifetchers";

const FoodInput = (props) => {
	const [servingsInput, setServingsInput] = useState("");

	const handleServingsInputChange = (event) => {
		setServingsInput(event.target.value);
	};

	const [selectedUnitOption, setSelectedUnitOption] = useState("");

	const handleUnitOptionChange = (event) => {
		setSelectedUnitOption(event.target.value);
	};

	const [selectedMealOption, setSelectedMealOption] = useState("");

	const handleMealOptionChange = (event) => {
		setSelectedMealOption(event.target.value);
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
						value={selectedMealOption}
						onChange={handleMealOptionChange}
					>
						<MenuItem value={"Breakfast"}>Breakfast</MenuItem>
						<MenuItem value={"Lunch"}>Lunch</MenuItem>
						<MenuItem value={"Dinner"}>Dinner</MenuItem>
					</Select>
				</>
			)}
		</Box>
	);
};

export default FoodInput;
