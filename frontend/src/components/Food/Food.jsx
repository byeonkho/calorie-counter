import { Box, Grid, IconButton, Typography } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { useState } from "react";
import { fetchSearchIngredients } from "../../api/apifetchers";
import FoodAdd from "./FoodAdd";
import FoodHome from "./FoodHome";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const Food = () => {
	const [selectedDateState, setSelectedDateState] = useState(dayjs());
	const [formattedDateState, setFormattedDateState] = useState(
		dayjs().format("DD-MM-YYYY").toString()
	);
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
		} else {
			console.log("res failed");
		}
	};

	const handlePrevDay = () => {
		if (selectedDateState) {
			const prevDay = dayjs(selectedDateState).subtract(1, "day");
			setSelectedDateState(prevDay);

			const formattedDate = selectedDateState
				? dayjs(selectedDateState).format("DD-MM-YYYY").toString()
				: "";
			setFormattedDateState(formattedDate);
		}
	};

	const handleNextDay = () => {
		if (selectedDateState) {
			const nextDay = dayjs(selectedDateState).add(1, "day");
			const currentDate = dayjs();

			if (nextDay.isAfter(currentDate, "day")) {
				return; // Exit the function if trying to go beyond or equal to the current date
			}

			setSelectedDateState(nextDay);

			const formattedDate = nextDay
				? nextDay.format("DD-MM-YYYY").toString()
				: "";
			setFormattedDateState(formattedDate);
		}
	};

	return (
		<Grid
			container
			sx={{
				width: "100%",
				maxWidth: "100%",
				// justifyContent: "center",
				// alignItems: "center",
				gap: "16px",
				padding: "16px",
			}}
		>
			{/* date picker */}
			<Box
				display="flex"
				flexDirection="row"
				alignItems="center"
				gap="16px"
			>
				<Typography variant="h6">Your food diary for:</Typography>
				<IconButton onClick={handlePrevDay}>
					<ChevronLeftIcon />
				</IconButton>
				<LocalizationProvider dateAdapter={AdapterDayjs}>
					<DatePicker
						value={selectedDateState}
						onChange={handleSelectedDateState}
						maxDate={currentDate}
						format="DD MMMM YYYY"
						sx={{ minWidth: "200px" }}
					/>
				</LocalizationProvider>
				<IconButton onClick={handleNextDay}>
					<ChevronRightIcon />
				</IconButton>
			</Box>
			{/* food homepage component for showing food entries on selected date */}
			<Grid
				item
				xs={12}
			>
				<Box sx={{ width: "80%", margin: "0 auto" }}>
					{showFoodHome && (
						<FoodHome
							formattedDateState={formattedDateState}
							selectedDateState={selectedDateState}
							setShowFoodAdd={setShowFoodAdd}
							setShowFoodHome={setShowFoodHome}
						/>
					)}
				</Box>
			</Grid>
			{/* parent component for FoodSearch, FoodInput, FoodNutrition */}
			<Grid
				item
				xs={12}
			>
				{showFoodAdd && (
					<FoodAdd
						searchQueryInputState={searchQueryInputState}
						handleSearchQueryInputChange={handleSearchQueryInputChange}
						handleSearchQuerySubmit={handleSearchQuerySubmit}
						searchQueryDataState={searchQueryDataState}
						ingredientDataState={ingredientDataState}
						setIngredientDataState={setIngredientDataState}
						selectedDateState={selectedDateState}
						formattedDateState={formattedDateState}
						setShowFoodAdd={setShowFoodAdd}
						setShowFoodHome={setShowFoodHome}
					/>
				)}
			</Grid>
		</Grid>
	);
};

export default Food;
