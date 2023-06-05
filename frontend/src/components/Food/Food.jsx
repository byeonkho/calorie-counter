import { Button, Grid, TextField } from "@mui/material";
import { useState } from "react";
import { fetchSearchIngredients } from "../../api/apifetchers";
import FoodInput from "./FoodInput";
import FoodNutrition from "./FoodNutrition";
import FoodSearch from "./FoodSearch";

const Food = () => {
	// broad search query (step 1 search)
	const [searchQueryDataState, setSearchQueryDataState] = useState([]);

	// narrow search query (step 2 search) ingredient data containing nutrients, id etc
	const [ingredientDataState, setIngredientDataState] = useState([]);

	// input for the search query
	const [searchQueryInputState, setSearchQueryInputState] = useState("");

	///// handlers for onChange / onClick
	const handleSearchQueryInputChange = (event) => {
		setSearchQueryInputState(event.target.value);
	};

	const handleSearchQuerySubmit = () => {
		getSearchQueryDataState(searchQueryInputState);
	};

	/////

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
			<Grid
				item
				xs={10}
				// sx={{ width: "100%" }}
			>
				<TextField
					value={searchQueryInputState}
					onChange={handleSearchQueryInputChange}
					label="Search for food"
					variant="outlined"
					sx={{ width: "35%" }}
				/>
				<Button
					variant="contained"
					color="primary"
					onClick={handleSearchQuerySubmit}
				>
					Search
				</Button>
			</Grid>
			<Grid
				item
				xs={6}
			>
				<FoodSearch
					searchQueryDataState={searchQueryDataState}
					ingredientDataState={ingredientDataState}
					setIngredientDataState={setIngredientDataState}
				/>
			</Grid>
			<Grid
				item
				xs={6}
			>
				<FoodInput
					ingredientDataState={ingredientDataState}
					searchQueryDataState={searchQueryDataState}
					setIngredientDataState={setIngredientDataState}
				/>

				{/* conditionally render nutrition info only if ingredientDataState.name exists */}
				{ingredientDataState.name && (
					<FoodNutrition ingredientDataState={ingredientDataState} />
				)}
			</Grid>
		</Grid>
	);
};

export default Food;
