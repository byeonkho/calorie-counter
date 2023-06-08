import React, { useState } from "react";
import {
	Container,
	TextField,
	Button,
	Typography,
	Link,
	Grid,
	Box,
} from "@mui/material";

const Signup = (props) => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const handleFirstNameChange = (event) => {
		setFirstName(event.target.value);
	};

	const handleLastNameChange = (event) => {
		setLastName(event.target.value);
	};

	const handleEmailChange = (event) => {
		setEmail(event.target.value);
	};

	const handlePasswordChange = (event) => {
		setPassword(event.target.value);
	};

	const handleConfirmPasswordChange = (event) => {
		setConfirmPassword(event.target.value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		if (password !== confirmPassword) {
			alert("Passwords do not match!");
			return;
		}
		const registerObj = {
			username: email,
			password: password,
			user_firstname: firstName,
			user_lastname: lastName,
		};

		fetchRegisterUser(registerObj);
	};

	const fetchRegisterUser = async (registerObj) => {
		const backendURL = import.meta.env.VITE_BACKEND_URL;
		try {
			const response = await fetch(backendURL + "/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(registerObj),
			});

			if (!response.ok) {
				throw new Error("Registration failed");
			}

			const data = await response.json();
			// Handle the response data
			console.log(data);

			props.setShowLogin(true);
			props.setShowSignup(false);
		} catch (error) {
			// Handle any errors
			console.error("Error:", error);
		}
	};

	return (
		<Container maxWidth="xs">
			<Box
				sx={{
					marginTop: 8,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<Typography
					component="h1"
					variant="h5"
				>
					Signup
				</Typography>
				<Box
					component="form"
					onSubmit={handleSubmit}
					sx={{ mt: 1 }}
				>
					<TextField
						id="firstName"
						label="First Name"
						variant="outlined"
						margin="normal"
						required
						fullWidth
						value={firstName}
						onChange={handleFirstNameChange}
					/>
					<TextField
						id="lastName"
						label="Last Name"
						variant="outlined"
						margin="normal"
						required
						fullWidth
						value={lastName}
						onChange={handleLastNameChange}
					/>
					<TextField
						id="email"
						label="Email"
						type="email"
						variant="outlined"
						margin="normal"
						required
						fullWidth
						value={email}
						onChange={handleEmailChange}
					/>
					<TextField
						id="password"
						label="Password"
						type="password"
						variant="outlined"
						margin="normal"
						required
						fullWidth
						value={password}
						onChange={handlePasswordChange}
					/>
					<TextField
						id="confirmPassword"
						label="Confirm Password"
						type="password"
						variant="outlined"
						margin="normal"
						required
						fullWidth
						value={confirmPassword}
						onChange={handleConfirmPasswordChange}
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
					>
						Sign Up
					</Button>
					<Grid container>
						<Grid item>
							<Link
								href="#"
								variant="body2"
								onClick={() => {
									props.setShowSignup(false);
									props.setShowLogin(true);
								}}
							>
								Already have an account? Sign In
							</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Container>
	);
};

export default Signup;
