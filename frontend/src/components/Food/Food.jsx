import { Box, Grid, Typography } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { useState, useContext } from "react";
import { fetchSearchIngredients } from "../../api/apifetchers";
import FoodAdd from "./FoodAdd";
import FoodHome from "./FoodHome";
import { useUserInfo } from "../UserInfoContext";

const Food = () => {
	const [selectedDateState, setSelectedDateState] = useState("");
	const [formattedDateState, setFormattedDateState] = useState("");
	const currentDate = dayjs();

	const [showFoodHome, setShowFoodHome] = useState(true);
	const [showFoodAdd, setShowFoodAdd] = useState(false);

	// broad search query (step 1 search)
	const [searchQueryDataState, setSearchQueryDataState] = useState([]);

	// narrow search query (step 2 search) ingredient data containing nutrients, id etc
	const [ingredientDataState, setIngredientDataState] = useState([]);

	// input for the search query
	const [searchQueryInputState, setSearchQueryInputState] = useState("");

	///////////////////////////////// handlers for onChange / onClick
	const handleSearchQueryInputChange = (event) => {
		setSearchQueryInputState(event.target.value);
	};

	const handleSearchQuerySubmit = () => {
		getSearchQueryDataState(searchQueryInputState);
	};

	const handleSelectedDateState = (date) => {
		setSelectedDateState(date);

		const formattedDate = date
			? dayjs(date).format("DD-MM-YYYY").toString()
			: "";

		setFormattedDateState(formattedDate);
	};

	/////////////////////////////////

	// fetchers
	const getSearchQueryDataState = async (searchQueryInputState) => {
		const { ok, data } = await fetchSearchIngredients(
			searchQueryInputState,
			null,
			"GET"
		);

		if (ok) {
			setSearchQueryDataState(data);
			console.log("res ok", data);
		} else {
			console.log("res failed");
		}
	};

	return (
		<Grid
			container
			sx={{ width: "100%", maxWidth: "1000px" }}
			justifyContent="center"
			alignItems="center"
		>
			{/* date picker */}
			<Box
				display="flex"
				flexDirection="row"
				alignItems="center"
			>
				<Typography>Your food diary for:</Typography>
				<LocalizationProvider dateAdapter={AdapterDayjs}>
					<DatePicker
						value={selectedDateState}
						onChange={handleSelectedDateState}
						maxDate={currentDate}
						defaultValue={currentDate}
						format="DD-MM-YYYY"
					/>
				</LocalizationProvider>
				{formattedDateState}
			</Box>
			{/* food homepage component for showing food entries on selected date */}
			<Grid
				item
				xs={10}
				// sx={{ width: "100%" }}
			>
				{showFoodHome ? (
					<FoodHome
						formattedDateState={formattedDateState}
						// fetchHomeFoodData={fetchHomeFoodData}
						setShowFoodAdd={setShowFoodAdd}
						setShowFoodHome={setShowFoodHome}
					/>
				) : null}
			</Grid>
			<Grid
				item
				xs={12}
			>
				{/* parent component for FoodSearch, FoodInput, FoodNutrition */}
				{showFoodAdd ? (
					<FoodAdd
						searchQueryInputState={searchQueryInputState}
						handleSearchQueryInputChange={handleSearchQueryInputChange}
						handleSearchQuerySubmit={handleSearchQuerySubmit}
						searchQueryDataState={searchQueryDataState}
						ingredientDataState={ingredientDataState}
						setIngredientDataState={setIngredientDataState}
						formattedDateState={formattedDateState}
						setShowFoodAdd={setShowFoodAdd}
						setShowFoodHome={setShowFoodHome}
					/>
				) : null}
			</Grid>
			<Grid
				item
				xs={6}
			></Grid>
		</Grid>
	);
};

export default Food;
