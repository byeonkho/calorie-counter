import { Box, IconButton, Typography, TextField, Button } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useState, useContext } from "react";
import dayjs from "dayjs";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useUserInfo } from "../UserInfoContext";
import LineChart from "./Chart";

const Weight = () => {
	const { userID, accessToken } = useUserInfo();

	const [triggerChartRender, setTriggerChartRender] = useState(0);

	const [selectedWeightDateState, setSelectedWeightDateState] = useState(
		dayjs()
	);
	const [formattedWeightDateState, setFormattedWeightDateState] = useState(
		dayjs().format("DD-MM-YYYY").toString()
	);
	const currentDate = dayjs();

	const [weight, setWeight] = useState("");

	const handleSelectedWeightDateState = (date) => {
		setSelectedWeightDateState(date);

		const formattedDate = date
			? dayjs(date).format("DD-MM-YYYY").toString()
			: "";

		setFormattedWeightDateState(formattedDate);
	};

	const handlePrevDay = () => {
		if (selectedWeightDateState) {
			const prevDay = dayjs(selectedWeightDateState).subtract(1, "day");
			setSelectedWeightDateState(prevDay);
		}
	};

	const handleNextDay = () => {
		if (selectedWeightDateState) {
			const nextDay = dayjs(selectedWeightDateState).add(1, "day");
			const currentDate = dayjs();

			if (nextDay.isAfter(currentDate, "day")) {
				return; // Exit the function if trying to go beyond or equal to the current date
			}

			setSelectedWeightDateState(nextDay);
		}
	};

	const handleWeightChange = (event) => {
		setWeight(event.target.value);
	};

	const handleWeightSubmit = async (event) => {
		event.preventDefault();

		try {
			const formattedDate = selectedWeightDateState
				? dayjs(selectedWeightDateState).format("DD-MM-YYYY").toString()
				: "";

			const backendURL = import.meta.env.VITE_BACKEND_URL;

			const requestOptions = {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${accessToken}`,
				},
				body: JSON.stringify({
					user_id: userID,
					weight: weight,
					date_entered: formattedDate,
				}),
			};

			const response = await fetch(`${backendURL}/add_weight`, requestOptions);
			const data = await response.json();

			if (response.ok) {
				if (triggerChartRender == 0) {
					setTriggerChartRender(1);
				} else {
					setTriggerChartRender(0);
				}
			} else {
				// Handle login failure
				console.error("Login failed:", data.error);
			}
		} catch (error) {
			console.error("Error during login:", error);
			// Handle error
		}
	};

	return (
		<>
			<Box
				display="flex"
				flexDirection="row"
				alignItems="center"
				gap="16px"
				sx={{ marginTop: "20px", marginLeft: "20px" }}
			>
				<Typography variant="h6">Your weight for:</Typography>
				<IconButton onClick={handlePrevDay}>
					<ChevronLeftIcon />
				</IconButton>
				<LocalizationProvider dateAdapter={AdapterDayjs}>
					<DatePicker
						value={selectedWeightDateState}
						onChange={handleSelectedWeightDateState}
						maxDate={currentDate}
						format="DD MMMM YYYY"
						sx={{ minWidth: "200px" }}
					/>
				</LocalizationProvider>
				<IconButton onClick={handleNextDay}>
					<ChevronRightIcon />
				</IconButton>
			</Box>
			<Box
				component="form"
				onSubmit={handleWeightSubmit}
				sx={{ mt: 1 }}
			>
				<TextField
					id="weight"
					label="weight"
					type="text"
					variant="outlined"
					margin="normal"
					required
					value={weight}
					onChange={handleWeightChange}
					sx={{ ml: 2 }}
				/>
				<Button
					type="submit"
					variant="contained"
					sx={{ mt: 3, mb: 2, ml: 1 }}
				>
					Submit
				</Button>
			</Box>
			<LineChart triggerChartRender={triggerChartRender} />
		</>
	);
};

export default Weight;
