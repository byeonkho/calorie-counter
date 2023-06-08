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
import { useTheme } from "@mui/material/styles";
import dayjs from "dayjs";
import PieChart from "./FoodPie";

const FoodHome = (props) => {
	const theme = useTheme();

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

	////////////////////////////////////////////////////////////////// handlers
	const handleDeleteNutrition = (el) => {
		fetchDeleteNutrition(el);
	};

	const handleToggleFoodHome = () => {
		props.setShowFoodHome(false);
		props.setShowFoodAdd(true);
	};

	//////////////////////////////////////////////////////////////////

	////////////////////////////////////////////////////////////////// fetchers
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
			// Handle successful deletion
			fetchHomeFoodData(); // Call the function to fetch updated data after deletion
		} catch (error) {
			console.error("Error deleting nutrition entry:", error);
			// Handle error
		}
	};

	const fetchHomeFoodData = async () => {
		const formattedDate = props.selectedDateState
			? dayjs(props.selectedDateState).format("DD-MM-YYYY").toString()
			: "";

		const backendURL = import.meta.env.VITE_BACKEND_URL;

		const requestOptions = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${accessToken}`,
			},
			body: JSON.stringify({ user_id: user_id, date_entered: formattedDate }),
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
			setHomeFoodDataState(data);
		} catch (error) {
			// redirect to login screen if GET failed
			window.location.href = "/";
		}
	};

	//////////////////////////////////////////////////////////////////

	useEffect(() => {
		// Code to run when `dateState` changes
		if (props.selectedDateState) {
			fetchHomeFoodData();
		}
		// Clean up the effect if needed
		return () => {
			// Code to clean up the effect
		};
	}, [props.formattedDateState, props.selectedDateState]);

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

		// round to 2 decimal places
		totals.calories = parseFloat(totals.calories.toFixed(2));
		totals.carbohydrates = parseFloat(totals.carbohydrates.toFixed(2));
		totals.fat = parseFloat(totals.fat.toFixed(2));
		totals.protein = parseFloat(totals.protein.toFixed(2));
		totals.sodium = parseFloat(totals.sodium.toFixed(2));
		totals.sugar = parseFloat(totals.sugar.toFixed(2));

		setTotals(totals);
	};

	return (
		<>
			<br />
			<Divider />
			<br />
			<br />
			<Grid container>
				<Grid
					item
					xs={2}
				>
					<Typography variant="h5">Breakfast</Typography>
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
						<TableRow>
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
									backgroundColor: theme.palette.primary.main,
									color: theme.palette.primary.contrastText,
									width: "10%",
									typography: theme.typography.subtitle1,
								}}
							>
								{/* Add padding here */}
								Calories
								<br />
								kcal
							</TableCell>
							<TableCell
								align="center"
								sx={{
									fontWeight: "bold",
									backgroundColor: theme.palette.primary.main,
									color: theme.palette.primary.contrastText,
									width: "10%",
									typography: theme.typography.subtitle1,
								}}
							>
								Carbs
								<br />g
							</TableCell>
							<TableCell
								align="center"
								sx={{
									fontWeight: "bold",
									backgroundColor: theme.palette.primary.main,
									color: theme.palette.primary.contrastText,
									width: "10%",
									typography: theme.typography.subtitle1,
								}}
							>
								Fat
								<br />g
							</TableCell>
							<TableCell
								align="center"
								sx={{
									fontWeight: "bold",
									backgroundColor: theme.palette.primary.main,
									color: theme.palette.primary.contrastText,
									width: "10%",
									typography: theme.typography.subtitle1,
								}}
							>
								Protein
								<br />g
							</TableCell>
							<TableCell
								align="center"
								sx={{
									fontWeight: "bold",
									backgroundColor: theme.palette.primary.main,
									color: theme.palette.primary.contrastText,
									width: "10%",
									typography: theme.typography.subtitle1,
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
									backgroundColor: theme.palette.primary.main,
									color: theme.palette.primary.contrastText,
									width: "10%",
									typography: theme.typography.subtitle1,
								}}
							>
								Sugar
								<br />g
							</TableCell>
							<TableCell
								align="center"
								sx={{
									fontWeight: "bold",

									width: "10%",
									border: "none",
								}}
							></TableCell>
						</TableRow>
					</TableHead>

					<TableBody>
						{homeFoodDataState.nutrients &&
							homeFoodDataState.nutrients
								.filter((nutrient) => nutrient.period_of_day === "Breakfast")
								.map((nutrient) => {
									const calories = Math.round(
										parseFloat(nutrient.Calories.replace(/[^0-9.]/g, ""))
									);
									const carbohydrates = Math.round(
										parseFloat(nutrient.Carbohydrates.replace(/[^0-9.]/g, ""))
									);
									const fat = Math.round(
										parseFloat(nutrient.Fat.replace(/[^0-9.]/g, ""))
									);
									const protein = Math.round(
										parseFloat(nutrient.Protein.replace(/[^0-9.]/g, ""))
									);
									const sodium = Math.round(
										parseFloat(nutrient.Sodium.replace(/[^0-9.]/g, ""))
									);
									const sugar = Math.round(
										parseFloat(nutrient.Sugar.replace(/[^0-9.]/g, ""))
									);
									return (
										<TableRow
											key={nutrient.nutrition_id}
											sx={{
												"&:last-child td, &:last-child th": { border: 0 },
											}}
										>
											<TableCell
												align="left"
												sx={{
													width: "20%",
												}}
											>
												<Typography
													sx={{ typography: theme.typography.subtitle2 }}
												>
													{nutrient.ingredient_name
														.toLowerCase()
														.split(" ")
														.map(
															(word) =>
																word.charAt(0).toUpperCase() + word.substring(1)
														)
														.join(" ")}{" "}
													- {nutrient.servings} {nutrient.unit}
												</Typography>
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
			<br />
			<Divider />
			<br />
			<Typography variant="h5">Lunch</Typography>

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
									const calories = Math.round(
										parseFloat(nutrient.Calories.replace(/[^0-9.]/g, ""))
									);
									const carbohydrates = Math.round(
										parseFloat(nutrient.Carbohydrates.replace(/[^0-9.]/g, ""))
									);
									const fat = Math.round(
										parseFloat(nutrient.Fat.replace(/[^0-9.]/g, ""))
									);
									const protein = Math.round(
										parseFloat(nutrient.Protein.replace(/[^0-9.]/g, ""))
									);
									const sodium = Math.round(
										parseFloat(nutrient.Sodium.replace(/[^0-9.]/g, ""))
									);
									const sugar = Math.round(
										parseFloat(nutrient.Sugar.replace(/[^0-9.]/g, ""))
									);

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
												<Typography
													sx={{ typography: theme.typography.subtitle2 }}
												>
													{nutrient.ingredient_name
														.toLowerCase()
														.split(" ")
														.map(
															(word) =>
																word.charAt(0).toUpperCase() + word.substring(1)
														)
														.join(" ")}{" "}
													- {nutrient.servings} {nutrient.unit}
												</Typography>
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
			<br />
			<Divider />
			<br />
			<Typography variant="h5">Dinner</Typography>

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
									const calories = Math.round(
										parseFloat(nutrient.Calories.replace(/[^0-9.]/g, ""))
									);
									const carbohydrates = Math.round(
										parseFloat(nutrient.Carbohydrates.replace(/[^0-9.]/g, ""))
									);
									const fat = Math.round(
										parseFloat(nutrient.Fat.replace(/[^0-9.]/g, ""))
									);
									const protein = Math.round(
										parseFloat(nutrient.Protein.replace(/[^0-9.]/g, ""))
									);
									const sodium = Math.round(
										parseFloat(nutrient.Sodium.replace(/[^0-9.]/g, ""))
									);
									const sugar = Math.round(
										parseFloat(nutrient.Sugar.replace(/[^0-9.]/g, ""))
									);

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
												<Typography
													sx={{ typography: theme.typography.subtitle2 }}
												>
													{nutrient.ingredient_name
														.toLowerCase()
														.split(" ")
														.map(
															(word) =>
																word.charAt(0).toUpperCase() + word.substring(1)
														)
														.join(" ")}{" "}
													- {nutrient.servings} {nutrient.unit}
												</Typography>
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
								<Typography variant="subtitle1"> Total</Typography>
							</TableCell>
							<TableCell
								align="center"
								sx={{
									width: "10%",
									backgroundColor: theme.palette.primary.main,
									color: theme.palette.primary.contrastText,
									typography: theme.typography.subtitle1,
								}}
							>
								{totals.calories}
							</TableCell>
							<TableCell
								align="center"
								sx={{
									width: "10%",
									backgroundColor: theme.palette.primary.main,
									color: theme.palette.primary.contrastText,
									typography: theme.typography.subtitle1,
								}}
							>
								{totals.carbohydrates}
							</TableCell>
							<TableCell
								align="center"
								sx={{
									width: "10%",
									backgroundColor: theme.palette.primary.main,
									color: theme.palette.primary.contrastText,
									typography: theme.typography.subtitle1,
								}}
							>
								{totals.fat}
							</TableCell>
							<TableCell
								align="center"
								sx={{
									width: "10%",
									backgroundColor: theme.palette.primary.main,
									color: theme.palette.primary.contrastText,
									typography: theme.typography.subtitle1,
								}}
							>
								{totals.protein}
							</TableCell>
							<TableCell
								align="center"
								sx={{
									width: "10%",
									backgroundColor: theme.palette.primary.main,
									color: theme.palette.primary.contrastText,
									typography: theme.typography.subtitle1,
								}}
							>
								{totals.sodium}
							</TableCell>
							<TableCell
								align="center"
								sx={{
									width: "10%",
									backgroundColor: theme.palette.primary.main,
									color: theme.palette.primary.contrastText,
									typography: theme.typography.subtitle1,
								}}
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
			<Box sx={{ margin: "auto", marginTop: "25px", width: "50%" }}>
				<PieChart totals={totals} />
			</Box>
		</>
	);
};

export default FoodHome;
