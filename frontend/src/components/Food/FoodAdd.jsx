import { Button, TextField, Box, Grid } from "@mui/material";
import FoodSearch from "./FoodSearch";
import FoodInput from "./FoodInput";
import FoodNutrition from "./FoodNutrition";
import { useState } from "react";

const FoodAdd = (props) => {
	// const [foodAddModalOpen, setFoodAddModalOpen] = useState(False)

	return (
		<>
			<TextField
				value={props.searchQueryInputState}
				onChange={props.handleSearchQueryInputChange}
				label="Search for food"
				variant="outlined"
				sx={{ width: "35%" }}
			/>
			<Button
				variant="contained"
				color="primary"
				onClick={props.handleSearchQuerySubmit}
			>
				Search
			</Button>
			<Grid
				container
				sx={{ width: "100%", maxWidth: "2000px" }}
				justifyContent="center"
				alignItems="center"
			>
				<Grid
					item
					xs={6}
				>
					<FoodSearch
						searchQueryDataState={props.searchQueryDataState}
						ingredientDataState={props.ingredientDataState}
						setIngredientDataState={props.setIngredientDataState}
					/>
				</Grid>

				<Grid
					item
					xs={6}
				>
					<Box sx={{ width: "400px" }}>
						<FoodInput
							ingredientDataState={props.ingredientDataState}
							searchQueryDataState={props.searchQueryDataState}
							setIngredientDataState={props.setIngredientDataState}
							formattedDateState={props.formattedDateState}
							// setFoodAddModalOpen={setFoodAddModalOpen}
                            setShowFoodAdd={props.setShowFoodAdd}
                            setShowFoodHome={props.setShowFoodHome}
						/>
						{props.ingredientDataState.name && (
							<FoodNutrition ingredientDataState={props.ingredientDataState} />
						)}
					</Box>
				</Grid>
			</Grid>
		</>
	);
};

export default FoodAdd;
