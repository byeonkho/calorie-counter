import {
	Box,
	Divider,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableRow,
	Typography
} from "@mui/material";
import React, { useEffect, useState } from "react";

const FoodNutrition = (props) => {
	const [rowsState, setRowsState] = useState([
		{
			name: "Calories",
			amount: null,
			secondname: "Sodium",
			secondamount: null,
		},
		{
			name: "Fat",
			amount: null,
			secondname: "Potassium",
			secondamount: null,
		},
		{
			name: "Saturated",
			amount: null,
			secondname: "Carbohydrates",
			secondamount: null,
		},
		{
			name: "Poly Unsaturated Fat",
			amount: null,
			secondname: "Fiber",
			secondamount: null,
		},
		{
			name: "Mono Unsaturated Fat",
			amount: null,
			secondname: "Sugar",
			secondamount: null,
		},
		{
			name: "Trans Fat",
			amount: null,
			secondname: "Protein",
			secondamount: null,
		},

		{ name: "Cholesterol", amount: null },
	]);

	const populateNutrientAmounts = () => {
		const rows = JSON.parse(JSON.stringify(rowsState));

		for (const obj of rows) {
			console.log("objname", obj.name);
			const firstNutrientObj = props.ingredientDataState.nutrients.find(
				(nutrientObj) => nutrientObj.name.includes(obj.name)
			);
			const secondNutrientObj = props.ingredientDataState.nutrients.find(
				(nutrientObj) => nutrientObj.name.includes(obj.secondname)
			);

			try {
				obj.amount = firstNutrientObj.amount + firstNutrientObj.unit;
			} catch {
				obj.amount = "0g";
			}
			try {
				obj.secondamount = secondNutrientObj.amount + secondNutrientObj.unit;
			} catch {
				if (obj.secondamount) {
					obj.secondamount = "0g";
				}
			}
		}
		setRowsState(rows);
	};

	useEffect(() => {
		if (props.ingredientDataState.name) {
			populateNutrientAmounts();
		}
	}, [props.ingredientDataState]);

	const boldedItems = [
		"Calories",
		"Total Fat",
		"Cholesterol",
		"Sodium",
		"Potassium",
		"Total Carbs",
		"Dietary Fiber",
		"Sugars",
		"Protein",
	];

	return (
		<Box
			sx={{
				width: "100%",
				// maxWidth: 360,
				bgcolor: "background.paper",
				border: "1px solid gray",
			}}
		>
			<Typography>Nutrition facts</Typography>
			<Typography>
				{props.ingredientDataState.name} -{" "}
				{props.ingredientDataState.category[0]}
			</Typography>
			<Divider />
			<TableContainer component={Paper}>
				<Table
					// sx={{ minWidth: 650 }}
					size="small"
					aria-label="a dense table"
				>
					<TableBody>
						{rowsState.map((row) => (
							<TableRow
								key={row.name}
								sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
							>
								<TableCell
									component="th"
									scope="row"
									sx={{
										fontWeight: boldedItems.includes(row.name) ? "bold" : null,
									}}
								>
									{row.name}
								</TableCell>
								<TableCell align="left">{row.amount}</TableCell>
								<TableCell
									component="th"
									scope="row"
									sx={{
										fontWeight: boldedItems.includes(row.secondname)
											? "bold"
											: null,
									}}
								>
									{row.secondname}
								</TableCell>
								<TableCell align="left">{row.secondamount}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			<Divider />
		</Box>
	);
};

export default FoodNutrition;
