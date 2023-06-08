import { Box, Button, Grid, TextField } from "@mui/material";
import FoodInput from "./FoodInput";
import FoodNutrition from "./FoodNutrition";
import FoodSearch from "./FoodSearch";

const FoodAdd = (props) => {
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
				sx={{ width: "90%" }}
				justifyContent="center"
				alignItems="top"
				marginTop={"20px"}
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
					<Box sx={{ width: "100%" }}>
						<FoodInput
							ingredientDataState={props.ingredientDataState}
							searchQueryDataState={props.searchQueryDataState}
							setIngredientDataState={props.setIngredientDataState}
							formattedDateState={props.formattedDateState}
							setShowFoodAdd={props.setShowFoodAdd}
							setShowFoodHome={props.setShowFoodHome}
							selectedDateState={props.selectedDateState}
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
