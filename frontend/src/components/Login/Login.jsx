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
import { useUserInfo } from "../UserInfoContext";
import jwt_decode from "jwt-decode";
import CircularProgress from "@mui/material/CircularProgress";

const Login = (props) => {
	// const [relogin, setRelogin] = useState(false);
	// State variable for loading screen

	// init useContext
	const {
		setUserID,
		setAccessToken,
		accessToken,
		setRefreshToken,
		setUserIsAdmin,
	} = useUserInfo();

	// states and handlers for email and password input
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleEmailChange = (event) => {
		setEmail(event.target.value);
	};

	const handlePasswordChange = (event) => {
		setPassword(event.target.value);
	};

	const handleLogin = async (event) => {
		event.preventDefault();

		try {
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

			if (response.ok) {
				const { access_token, refresh_token, user_id, user_is_admin } = data;

				// Update the context state with the received data
				await setAccessToken(access_token);
				await setRefreshToken(refresh_token);
				await setUserID(user_id);
				await setUserIsAdmin(user_is_admin);

				// Perform any necessary actions after successful login
				if (accessToken) {
					// Clear the form fields and render homepage
					setEmail("");
					setPassword("");
					props.setShowLogin(false);
				}
			} else {
				// Handle login failure
				console.error("Login failed:", data.error);
			}
		} catch (error) {
			console.error("Error during login:", error);
			// Handle error
		}
		// setRelogin(false);
	};

	const handleReLogin = async (storedRefreshToken) => {
		try {
			const backendURL = import.meta.env.VITE_BACKEND_URL;

			const requestOptions = {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${storedRefreshToken}`,
				},
			};

			const response = await fetch(`${backendURL}/relogin`, requestOptions);
			const data = await response.json();

			if (response.ok) {
				const { access_token, user_id, user_is_admin } = data;

				// Update the context state with the received data
				await setAccessToken(access_token);
				await setUserID(user_id);
				await setUserIsAdmin(user_is_admin);

				// Perform any necessary actions after successful login
				if (accessToken) {
					setTimeout(() => {
						props.setShowLogin(false);
						props.setLoading(false);
					}, 500);
				}
				// Clear the form fields
				setEmail("");
				setPassword("");
			} else if (response.status === 401) {
				// Handle expired refresh token
				console.error("Refresh token expired");
				// setRelogin(true);
				window.location.href = "/";
			} else {
				// Handle login failure
				console.error("Login failed:", data.error);
				props.setLoading(false);
			}
		} catch (error) {
			console.error("Error during login:", error);
			// Handle error
			props.setLoading(false);
		}
	};

	const handleGoToSignupPage = () => {
		props.setShowLogin(false);
		props.setShowSignup(true);
	};

	const handleLoginEffect = async () => {
		const storedRefreshToken = localStorage.getItem("refreshToken");

		if (storedRefreshToken) {
			try {
				const decodedToken = jwt_decode(storedRefreshToken);

				if (decodedToken && decodedToken.exp * 1000 < Date.now()) {
					// Refresh token has expired
					localStorage.clear();
				} else {
					// Refresh token is still valid
					setRefreshToken(storedRefreshToken);

					await handleReLogin(storedRefreshToken);
				}
			} catch (error) {
				console.error("Error decoding refresh token:", error);
			}
		} else {
			props.setLoading(false);
		}
	};

	useEffect(() => {
		handleLoginEffect();
	}, []);

	if (!props.loading) {
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
						onSubmit={handleLogin}
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
	} else {
		// Display loading spinner
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
					Loading.. <br />
					<CircularProgress />
				</Box>
			</Container>
		);
	}
};

export default Login;
