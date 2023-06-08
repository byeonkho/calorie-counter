import {
	Button,
	Divider,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableRow,
	Typography,
	Box,
	Grid,
	TableHead,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";
import React, { useEffect, useState, useContext } from "react";
import { useUserInfo } from "../UserInfoContext";

const FoodHome = (props) => {
	const { userID, accessToken } = useUserInfo();

	const [homeFoodDataState, setHomeFoodDataState] = useState([]);

	const [totals, setTotals] = useState({
		calories: 0,
		carbohydrates: 0,
		fat: 0,
		protein: 0,
		sodium: 0,
		sugar: 0,
	});

	const user_id = userID;
	const date_entered = props.formattedDateState;

	////////////////////// handlers
	const handleDeleteNutrition = (el) => {
		fetchDeleteNutrition(el);
	};

	const handleToggleFoodHome = () => {
		props.setShowFoodHome(false);
		props.setShowFoodAdd(true);
	};

	////////////////////// fetchers
	const fetchDeleteNutrition = async (nutritionId) => {
		try {
			const backendURL = import.meta.env.VITE_BACKEND_URL;

			const requestOptions = {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ nutrition_id: nutritionId }),
			};

			const response = await fetch(
				backendURL + "/delete_nutrition",
				requestOptions
			);
			const data = await response.json();
			console.log("Nutrition entry deleted:", data);
			// Handle successful deletion
			fetchHomeFoodData(); // Call the function to fetch updated data after deletion
		} catch (error) {
			console.error("Error deleting nutrition entry:", error);
			// Handle error
		}
	};

	const fetchHomeFoodData = async () => {
		console.log("fetching homefooddata");
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
			console.log("Nutrients:", data);
			setHomeFoodDataState(data);
			// Process the received nutrients data
		} catch (error) {
			console.error("Error:", error);
			// Handle the error
		}
	};

	//////////////////////

	useEffect(() => {
		// Code to run when `dateState` changes
		if (props.formattedDateState) {
			fetchHomeFoodData();
		}

		// Make API call or perform any other necessary actions

		// Clean up the effect if needed
		return () => {
			// Code to clean up the effect
		};
	}, [props.formattedDateState]);

	// why does useeffect trigger when i submit food?

	useEffect(() => {
		// Calculate totals whenever homeFoodDataState changes
		if (homeFoodDataState.nutrients) {
			calculateTotals();
		}
	}, [homeFoodDataState]);

	const calculateTotals = () => {
		const totals = {
			calories: 0,
			carbohydrates: 0,
			fat: 0,
			protein: 0,
			sodium: 0,
			sugar: 0,
		};

		for (const nutrient of homeFoodDataState.nutrients) {
			const calories = parseFloat(nutrient.Calories.replace(/[^0-9.]/g, ""));
			const carbohydrates = parseFloat(
				nutrient.Carbohydrates.replace(/[^0-9.]/g, "")
			);
			const fat = parseFloat(nutrient.Fat.replace(/[^0-9.]/g, ""));
			const protein = parseFloat(nutrient.Protein.replace(/[^0-9.]/g, ""));
			const sodium = parseFloat(nutrient.Sodium.replace(/[^0-9.]/g, ""));
			const sugar = parseFloat(nutrient.Sugar.replace(/[^0-9.]/g, ""));

			totals.calories += calories;
			totals.carbohydrates += carbohydrates;
			totals.fat += fat;
			totals.protein += protein;
			totals.sodium += sodium;
			totals.sugar += sugar;
		}

		setTotals(totals);
	};
	return (
		<>
			<br />
			<Divider />
			<br />
			<Grid
				container
				// sx={{ width: "100%", maxWidth: "1000px" }}
				// justifyContent="center"
				// alignItems="center"
			>
				<Grid
					item
					xs={2}
				></Grid>
				<Grid
					item
					xs={10}
				></Grid>
				<Grid
					item
					xs={2}
				>
					<Typography>Breakfast</Typography>
				</Grid>
				<Grid
					item
					xs={10}
				></Grid>
			</Grid>

			<TableContainer component={Paper}>
				<Table
					size="small"
					aria-label="a dense table"
				>
					<TableHead sx={{ border: "none" }}>
						<TableRow sx={{ border: "none" }}>
							<TableCell
								sx={{
									width: "20%",
									border: "none",
								}}
							></TableCell>
							<TableCell
								align="center"
								sx={{
									fontWeight: "bold",
									backgroundColor: (theme) => theme.palette.secondary.main,
									width: "10%",
								}}
							>
								Calories
								<br />
								kcal
							</TableCell>
							<TableCell
								align="center"
								sx={{
									fontWeight: "bold",
									backgroundColor: (theme) => theme.palette.secondary.main,
									width: "10%",
								}}
							>
								Carbs
								<br />g
							</TableCell>
							<TableCell
								align="center"
								sx={{
									fontWeight: "bold",
									backgroundColor: (theme) => theme.palette.secondary.main,
									width: "10%",
								}}
							>
								Fat
								<br />g
							</TableCell>
							<TableCell
								align="center"
								sx={{
									fontWeight: "bold",
									backgroundColor: (theme) => theme.palette.secondary.main,
									width: "10%",
								}}
							>
								Protein
								<br />g
							</TableCell>
							<TableCell
								align="center"
								sx={{
									fontWeight: "bold",
									backgroundColor: (theme) => theme.palette.secondary.main,
									width: "10%",
								}}
							>
								Sodium
								<br />
								mg
							</TableCell>
							<TableCell
								align="center"
								sx={{
									fontWeight: "bold",
									backgroundColor: (theme) => theme.palette.secondary.main,
									width: "10%",
								}}
							>
								Sugar
								<br />g
							</TableCell>
							<TableCell
								align="center"
								sx={{
									fontWeight: "bold",
									backgroundColor: (theme) => theme.palette.secondary.main,
									width: "10%",
								}}
							></TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{homeFoodDataState.nutrients &&
							homeFoodDataState.nutrients
								.filter((nutrient) => nutrient.period_of_day === "Breakfast")
								.map((nutrient) => {
									const calories = nutrient.Calories.replace(/[^0-9.]/g, "");
									const carbohydrates = nutrient.Carbohydrates.replace(
										/[^0-9.]/g,
										""
									);
									const fat = nutrient.Fat.replace(/[^0-9.]/g, "");
									const protein = nutrient.Protein.replace(/[^0-9.]/g, "");
									const sodium = nutrient.Sodium.replace(/[^0-9.]/g, "");
									const sugar = nutrient.Sugar.replace(/[^0-9.]/g, "");
									return (
										<TableRow
											key={nutrient.nutrition_id}
											sx={{
												"&:last-child td, &:last-child th": { border: 0 },
											}}
										>
											<TableCell
												align="left"
												sx={{ width: "20%" }}
											>
												{nutrient.ingredient_name} - {nutrient.servings}{" "}
												{nutrient.unit}
											</TableCell>
											<TableCell
												align="center"
												sx={{ width: "10%" }}
											>
												{calories}
											</TableCell>
											<TableCell
												align="center"
												sx={{ width: "10%" }}
											>
												{carbohydrates}
											</TableCell>
											<TableCell
												align="center"
												sx={{ width: "10%" }}
											>
												{fat}
											</TableCell>
											<TableCell
												align="center"
												sx={{ width: "10%" }}
											>
												{protein}
											</TableCell>
											<TableCell
												align="center"
												sx={{ width: "10%" }}
											>
												{sodium}
											</TableCell>
											<TableCell
												align="center"
												sx={{ width: "10%" }}
											>
												{sugar}
											</TableCell>
											<TableCell
												align="center"
												sx={{ width: "10%" }}
											>
												<IconButton
													onClick={() =>
														handleDeleteNutrition(nutrient.nutrition_id)
													}
													aria-label="delete"
													sx={{ width: "10%" }}
												>
													<ClearIcon />
												</IconButton>
											</TableCell>
										</TableRow>
									);
								})}
					</TableBody>
				</Table>
			</TableContainer>
			<Button onClick={handleToggleFoodHome}>Add Food</Button>
			<Divider />
			<Typography>Lunch</Typography>

			<TableContainer component={Paper}>
				<Table
					// sx={{ minWidth: 650 }}
					size="small"
					aria-label="a dense table"
				>
					<TableBody>
						{homeFoodDataState.nutrients &&
							homeFoodDataState.nutrients
								.filter((nutrient) => nutrient.period_of_day === "Lunch")
								.map((nutrient) => {
									const calories = nutrient.Calories.replace(/[^0-9.]/g, "");
									const carbohydrates = nutrient.Carbohydrates.replace(
										/[^0-9.]/g,
										""
									);
									const fat = nutrient.Fat.replace(/[^0-9.]/g, "");
									const protein = nutrient.Protein.replace(/[^0-9.]/g, "");
									const sodium = nutrient.Sodium.replace(/[^0-9.]/g, "");
									const sugar = nutrient.Sugar.replace(/[^0-9.]/g, "");

									return (
										<TableRow
											key={nutrient.nutrition_id}
											sx={{
												"&:last-child td, &:last-child th": { border: 0 },
											}}
										>
											<TableCell
												align="left"
												sx={{ width: "20%" }}
											>
												{nutrient.ingredient_name} - {nutrient.servings}{" "}
												{nutrient.unit}
											</TableCell>
											<TableCell
												align="center"
												sx={{ width: "10%" }}
											>
												{calories}
											</TableCell>
											<TableCell
												align="center"
												sx={{ width: "10%" }}
											>
												{carbohydrates}
											</TableCell>
											<TableCell
												align="center"
												sx={{ width: "10%" }}
											>
												{fat}
											</TableCell>
											<TableCell
												align="center"
												sx={{ width: "10%" }}
											>
												{protein}
											</TableCell>
											<TableCell
												align="center"
												sx={{ width: "10%" }}
											>
												{sodium}
											</TableCell>
											<TableCell
												align="center"
												sx={{ width: "10%" }}
											>
												{sugar}
											</TableCell>
											<TableCell
												align="center"
												sx={{ width: "10%" }}
											>
												<IconButton
													onClick={() =>
														handleDeleteNutrition(nutrient.nutrition_id)
													}
													aria-label="delete"
													sx={{ width: "10%" }}
												>
													<ClearIcon />
												</IconButton>
											</TableCell>
										</TableRow>
									);
								})}
					</TableBody>
				</Table>
			</TableContainer>
			<Button onClick={handleToggleFoodHome}>Add Food</Button>
			<Divider />
			<Typography>Dinner</Typography>

			<TableContainer component={Paper}>
				<Table
					// sx={{ minWidth: 650 }}
					size="small"
					aria-label="a dense table"
				>
					<TableBody>
						{homeFoodDataState.nutrients &&
							homeFoodDataState.nutrients
								.filter((nutrient) => nutrient.period_of_day === "Dinner")
								.map((nutrient) => {
									const calories = nutrient.Calories.replace(/[^0-9.]/g, "");
									const carbohydrates = nutrient.Carbohydrates.replace(
										/[^0-9.]/g,
										""
									);
									const fat = nutrient.Fat.replace(/[^0-9.]/g, "");
									const protein = nutrient.Protein.replace(/[^0-9.]/g, "");
									const sodium = nutrient.Sodium.replace(/[^0-9.]/g, "");
									const sugar = nutrient.Sugar.replace(/[^0-9.]/g, "");

									return (
										<TableRow
											key={nutrient.nutrition_id}
											sx={{
												"&:last-child td, &:last-child th": { border: 0 },
											}}
										>
											<TableCell
												align="left"
												sx={{ width: "20%" }}
											>
												{nutrient.ingredient_name} - {nutrient.servings}{" "}
												{nutrient.unit}
											</TableCell>
											<TableCell
												align="center"
												sx={{ width: "10%" }}
											>
												{calories}
											</TableCell>
											<TableCell
												align="center"
												sx={{ width: "10%" }}
											>
												{carbohydrates}
											</TableCell>
											<TableCell
												align="center"
												sx={{ width: "10%" }}
											>
												{fat}
											</TableCell>
											<TableCell
												align="center"
												sx={{ width: "10%" }}
											>
												{protein}
											</TableCell>
											<TableCell
												align="center"
												sx={{ width: "10%" }}
											>
												{sodium}
											</TableCell>
											<TableCell
												align="center"
												sx={{ width: "10%" }}
											>
												{sugar}
											</TableCell>
											<TableCell
												align="center"
												sx={{ width: "10%" }}
											>
												<IconButton
													onClick={() =>
														handleDeleteNutrition(nutrient.nutrition_id)
													}
													aria-label="delete"
												>
													<ClearIcon />
												</IconButton>
											</TableCell>
										</TableRow>
									);
								})}
					</TableBody>
				</Table>
			</TableContainer>
			<Button onClick={handleToggleFoodHome}>Add Food</Button>

			<TableContainer component={Paper}>
				<Table
					// sx={{ minWidth: 650 }}
					size="small"
					aria-label="a dense table"
				>
					<TableBody>
						<TableRow
							sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
						>
							<TableCell
								align="right"
								sx={{ width: "20%" }}
							>
								Total
							</TableCell>
							<TableCell
								align="center"
								sx={{ width: "10%" }}
							>
								{totals.calories}
							</TableCell>
							<TableCell
								align="center"
								sx={{ width: "10%" }}
							>
								{totals.carbohydrates}
							</TableCell>
							<TableCell
								align="center"
								sx={{ width: "10%" }}
							>
								{totals.fat}
							</TableCell>
							<TableCell
								align="center"
								sx={{ width: "10%" }}
							>
								{totals.protein}
							</TableCell>
							<TableCell
								align="center"
								sx={{ width: "10%" }}
							>
								{totals.sodium}
							</TableCell>
							<TableCell
								align="center"
								sx={{ width: "10%" }}
							>
								{totals.sugar}
							</TableCell>
							<TableCell
								align="center"
								sx={{ width: "10%" }}
							></TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
};

export default FoodHome;
