import {
	Box,
	Button,
	Divider,
	Typography,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableRow,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import * as React from "react";

const FoodHome = () => {
	return (
		<>
		
			<br />
			<Divider />
			<br />
			<Typography>Breakfast</Typography>
			<Button>Add Food</Button>
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
								component="th"
								scope="row"
								align="left"
							>
								foodname
							</TableCell>
							<TableCell
								component="th"
								scope="row"
								align="right"
							>
								calories
							</TableCell>
							<TableCell
								component="th"
								scope="row"
								align="right"
							>
								carbs
							</TableCell>
							<TableCell
								component="th"
								scope="row"
								align="right"
							>
								fat
							</TableCell>
							<TableCell
								component="th"
								scope="row"
								align="right"
							>
								protein
							</TableCell>
							<TableCell
								component="th"
								scope="row"
								align="right"
							>
								sodium
							</TableCell>
							<TableCell
								component="th"
								scope="row"
								align="right"
							>
								sugar
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</TableContainer>

			<Divider />
			<Typography>Lunch</Typography>
			<Button>Add Food</Button>
			<Divider />
			<Typography>Dinner</Typography>
			<Button>Add Food</Button>
		</>
	);
};

export default FoodHome;
