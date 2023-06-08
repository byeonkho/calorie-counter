import {
	Box,
	Button,
	MenuItem,
	Select,
	TextField,
	Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { fetchIngredientData } from "../../api/apifetchers";
import { useUserInfo } from "../UserInfoContext";
import dayjs from "dayjs";

const FoodInput = (props) => {
	const { userID, accessToken } = useUserInfo();

	const user_id = userID;
	const date_entered = props.formattedDateState;

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
		
		} else {
			console.log("res failed");
		}
	};

	//////////////////////// fetchers

	const fetchHomeFoodData = async () => {
		
		const backendURL = import.meta.env.VITE_BACKEND_URL;

		const requestOptions = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${accessToken}`,
			},
			body: JSON.stringify({ user_id, date_entered }),
		};

		try {
			const response = await fetch(
				backendURL + "/getuserfoods",
				requestOptions
			);
			if (!response.ok) {
				throw new Error("Request failed with status " + response.status);
			}

			const data = await response.json();
		
			// setHomeFoodDataState(data);
			// Process the received nutrients data
		} catch (error) {
			console.error("Error:", error);
			// Handle the error
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
		
			fetchHomeFoodData();
		} catch (error) {
			console.error("Error:", error.message);
		}
		props.setShowFoodHome(true);
		props.setShowFoodAdd(false);
	};

	////////////////////////

	const handleDBsubmit = () => {
		const formattedDate = props.selectedDateState
			? dayjs(props.selectedDateState).format("DD-MM-YYYY").toString()
			: "";

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
			user_id: user_id,
			ingredient_id: props.ingredientDataState.id,
			name: props.ingredientDataState.name,
			servings: servingsInput,
			unit: selectedUnitOption,
			date_entered: formattedDate,
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
				bgcolor: "background.paper",
				border: "1px solid gray",
			}}
		>
			{props.ingredientDataState.name && (
				<>
					<Typography
						sx={{ textTransform: "capitalize", marginTop: "10px" }}
						variant="h6"
					>
						{props.ingredientDataState.name} -{" "}
						{props.ingredientDataState.category[0]}
					</Typography>
					<br />
					<Typography>How much?</Typography>
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							marginTop: "5px",
							marginBottom: "5px",
						}}
					>
						<TextField
							value={servingsInput}
							onChange={handleServingsInputChange}
							label="Quantity"
							variant="outlined"
							InputProps={{
								inputProps: {
									type: "number",
									min: "0",
								},
							}}
							sx={{ width: "15%" }}
						/>
						<Typography sx={{ marginRight: "10px", marginLeft: "10px" }}>
							Servings of
						</Typography>
						<Select
							value={selectedUnitOption}
							onChange={handleUnitOptionChange}
							sx={{ minWidth: "15%" }}
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
					<Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
						<Select
							value={selectedDayOption}
							onChange={handleDayOptionChange}
							sx={{ minWidth: "20%", marginRight: "10px" }}
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
							Add food
						</Button>
					</Box>
					<br />
				</>
			)}
		</Box>
	);
};

export default FoodInput;
