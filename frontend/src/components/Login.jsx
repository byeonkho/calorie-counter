import React, { useState, useEffect } from "react";
import {
	Container,
	TextField,
	Button,
	Typography,
	Link,
	Grid,
	Box,
} from "@mui/material";
import { useUserInfo } from "./UserInfoContext";

const Login = (props) => {
	// init useContext
	const { setUserID, setAccessToken, setRefreshToken, setUserIsAdmin } =
		useUserInfo();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleEmailChange = (event) => {
		setEmail(event.target.value);
	};

	const handlePasswordChange = (event) => {
		setPassword(event.target.value);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			console.log(email);
			console.log(password);
			const backendURL = import.meta.env.VITE_BACKEND_URL;

			const requestOptions = {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					username: email,
					password: password,
				}),
			};

			const response = await fetch(`${backendURL}/login`, requestOptions);
			const data = await response.json();

			console.log(data);
			if (response.ok) {
				const { access_token, refresh_token, user_id, user_is_admin } = data;

				// Update the context state with the received data
				await setAccessToken(access_token);
				await setRefreshToken(refresh_token);
				await setUserID(user_id);
				await setUserIsAdmin(user_is_admin);
				console.log("login user id", user_id);
				// Perform any necessary actions after successful login
				if (setAccessToken) {
					props.setShowLogin(false);
				}
				// Clear the form fields
				setEmail("");
				setPassword("");
			} else {
				// Handle login failure
				console.error("Login failed:", data.error);
			}
		} catch (error) {
			console.error("Error during login:", error);
			// Handle error
		}
	};

	const handleGoToSignupPage = () => {
		props.setShowLogin(false);
		props.setShowSignup(true);
	};

	useEffect(() => {
		const storedRefreshToken = localStorage.getItem("refreshToken");
		if (storedRefreshToken) {
			setRefreshToken(storedRefreshToken);
			console.log("refresh token retrieved", storedRefreshToken);
		}
	}, []);

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
					Login
				</Typography>
				<Box
					component="form"
					onSubmit={handleSubmit}
					sx={{ mt: 1 }}
				>
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
					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
					>
						Sign In
					</Button>
					<Grid container>
						<Grid
							item
							xs
						>
							<Link
								href="#"
								variant="body2"
							>
								Forgot password?
							</Link>
						</Grid>
						<Grid item>
							<Link
								href="#"
								variant="body2"
								onClick={handleGoToSignupPage}
							>
								Don't have an account? Sign Up
							</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Container>
	);
};

export default Login;
