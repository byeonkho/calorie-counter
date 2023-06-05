import React from "react";
import { List, Box, ListItemButton, ListItemText } from "@mui/material";

import { fetchIngredientData } from "../../api/apifetchers";

const FoodSearch = (props) => {
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

	// export default function SelectedListItem() {
	//     const [selectedIndex, setSelectedIndex] = React.useState(1);

	//     const handleListItemClick = (event, index) => {
	//       setSelectedIndex(index);
	//     };

	return (
		<Box
			sx={{
				width: "100%",
				maxWidth: 360,
				bgcolor: "background.paper",
				border: "1px solid gray",
			}}
		>
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
