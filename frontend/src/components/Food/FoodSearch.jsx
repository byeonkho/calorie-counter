import React, { useState } from "react";
import {
	List,
	Box,
	ListItemButton,
	ListItemText,
	TextField,
	Button,
} from "@mui/material";

import { fetchIngredientData } from "../../api/apifetchers";

const FoodSearch = (props) => {
	// input for the search query
	const [searchQueryInputState, setSearchQueryInputState] = useState("");

	///// handlers for onChange / onClick
	const handleSearchQueryInputChange = (event) => {
		setSearchQueryInputState(event.target.value);
	};

	const handleSearchQuerySubmit = () => {
		getSearchQueryDataState(searchQueryInputState);
	};

	// broad search query (step 1 search)
	const [searchQueryDataState, setSearchQueryDataState] = useState([]);

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

	const getIngredientData = async (ingredientID) => {
		const { ok, data } = await fetchIngredientData(ingredientID, null);

		if (ok) {
			const cleanedData = {
				name: data.name,
				// is an array
				possibleUnits: data.possibleUnits,
				estimatedCost: data.estimatedCost,
				nutrients: data.nutrition.nutrients,
				category: data.categoryPath,
				id: data.id,
				dayPeriod: null,
			};
			props.setIngredientDataState(cleanedData);
			console.log("res ok", "ingredientDataState", cleanedData);
		} else {
			console.log("res failed");
		}
	};

	const handleIngredientClick = (value) => {
		console.log("Clicked value:", value);
		getIngredientData(value);
	};


	return (
		<Box
			sx={{
				width: "100%",
				// maxWidth: 500,
				bgcolor: "background.paper",
				border: "1px solid gray",
			}}
		>
			{/* <TextField
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
			</Button> */}
			<List
				component="nav"
				style={{ maxHeight: 400, overflow: "auto" }}
				subheader={<li />}
			>
				{props.searchQueryDataState.results &&
					props.searchQueryDataState.results.map((result, index) => (
						<ListItemButton
							key={index}
							onClick={() => handleIngredientClick(result.id)}
						>
							<ListItemText primary={result.name} />
						</ListItemButton>
					))}
			</List>
		</Box>
	);
};

export default FoodSearch;
