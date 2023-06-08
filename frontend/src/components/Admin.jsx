import React, { useEffect, useState } from "react";
import {
	Container,
	Typography,
	TableContainer,
	Table,
	TableHead,
	TableBody,
	TableRow,
	TableCell,
	Paper,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";
import { useUserInfo } from "./UserInfoContext";

const Admin = () => {
	const [users, setUsers] = useState("");
	const { accessToken } = useUserInfo();

	const fetchDeleteUser = async (user_id) => {
		console.log("deleting user", user_id);
		const backendURL = import.meta.env.VITE_BACKEND_URL;

		const requestOptions = {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${accessToken}`,
			},
			body: JSON.stringify({ user_id }),
		};

		try {
			const response = await fetch(backendURL + "/delete_user", requestOptions);
			if (!response.ok) {
				throw new Error("Request failed with status " + response.status);
			}
			fetchUsersData();
		} catch (error) {
			console.error("Error:", error);
			// Handle the error
		}
	};

	const fetchUsersData = async () => {
		console.log("fetching admindata");
		const backendURL = import.meta.env.VITE_BACKEND_URL;

		const requestOptions = {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${accessToken}`,
			},
		};

		try {
			const response = await fetch(backendURL + "/users", requestOptions);
			if (!response.ok) {
				throw new Error("Request failed with status " + response.status);
			}

			const data = await response.json();

			setUsers(data);
		} catch (error) {
			console.error("Error:", error);
			// Handle the error
		}
	};

	useEffect(() => {
		fetchUsersData();
	}, []); // Empty dependency array to run the effect only once

	if (users.length === 0) {
		return <div>Loading...</div>; // Render a loading indicator or placeholder
	}

	return (
		<Container maxWidth="md">
			<Typography
				variant="h4"
				component="h1"
				align="center"
				mt={4}
				mb={2}
			>
				Admin View
			</Typography>
			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>ID</TableCell>
							<TableCell>Username</TableCell>
							<TableCell>First Name</TableCell>
							<TableCell>Last Name</TableCell>
							<TableCell>Privilleges</TableCell>
							<TableCell></TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{users.users.map((user) => (
							<TableRow key={user.user_id}>
								<TableCell>{user.user_id}</TableCell>
								<TableCell>{user.username}</TableCell>
								<TableCell>{user.user_firstname}</TableCell>
								<TableCell>{user.user_lastname}</TableCell>
								<TableCell>
									{user.user_is_admin ? "Admin" : "Regular User"}
								</TableCell>
								<TableCell>
									<IconButton
										onClick={() => fetchDeleteUser(user.user_id)}
										aria-label="delete"
										sx={{ width: "10%" }}
									>
										<ClearIcon />
									</IconButton>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Container>
	);
};

export default Admin;
