import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { useUserInfo } from "./UserInfoContext";
import { AccessAlarm } from "@mui/icons-material";

function ResponsiveAppBar(props) {
	const {
		userIsAdmin,
		setUserIsAdmin,
		setAccessToken,
		setRefreshToken,
		setUserID,
		refreshToken,
		accessToken,
	} = useUserInfo();

	const pages = [];

	if (userIsAdmin) {
		pages.push("Food", "Admin");
	} else {
		pages.push("Food");
	}

	// const settings = ["Profile", "Account", "Dashboard", "Logout"];

	const handleLogout = () => {
		// Clear localStorage
		localStorage.clear();

		// Clear user states
		setAccessToken("");
		setRefreshToken("");
		setUserID("");
		setUserIsAdmin(false);

		// Perform any additional logout actions if needed

		// Redirect to login page or homepage
		// Replace the URL with the desired destination
		console.log("logged out");
		console.log(`refresh token: ${refreshToken}, access token: ${accessToken}`);

		window.location.href = "/";
	};

	const handleCloseNavMenu = (el) => {
		// setAnchorElNav(null);
		if (el == "Food") {
			props.setShowFood(true);
			props.setShowAdmin(false);
			console.log("clicked home");
		}
		if (el == "Admin") {
			console.log("clicked admin");
			props.setShowFood(false);
			props.setShowAdmin(true);
		}
	};

	
	return (
		<AppBar position="static">
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
					<Typography
						variant="h6"
						noWrap
						component="a"
						href="/"
						sx={{
							mr: 2,
							display: { xs: "none", md: "flex" },
							fontFamily: "monospace",
							fontWeight: 700,
							letterSpacing: ".3rem",
							color: "inherit",
							textDecoration: "none",
						}}
					>
						LOGO
					</Typography>
					<Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
						{pages.map((page) => (
							<Button
								key={page}
								value={page}
								onClick={() => handleCloseNavMenu(page)} // Pass 'page' as an argument to the handleCloseNavMenu function
								sx={{ my: 2, color: "white", display: "block" }}
							>
								{page}
							</Button>
						))}
					</Box>
					<Button
						onClick={handleLogout}
						sx={{ my: 2, color: "white", display: "block" }}
					>
						Logout
					</Button>
					{/* <Box sx={{ flexGrow: 0 }}>
						<Tooltip title="Open settings">
							<IconButton
								onClick={handleOpenUserMenu}
								sx={{ p: 0 }}
							>
								<Avatar
									alt="Remy Sharp"
									// src="/static/images/avatar/2.jpg"
								/>
							</IconButton>
						</Tooltip>
						<Menu
							sx={{ mt: "45px" }}
							id="menu-appbar"
							anchorEl={anchorElUser}
							anchorOrigin={{
								vertical: "top",
								horizontal: "right",
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "right",
							}}
							open={Boolean(anchorElUser)}
							onClose={handleCloseUserMenu}
						>
							{settings.map((setting) => (
								<MenuItem
									key={setting}
									onClick={handleCloseUserMenu}
								>
									<Typography textAlign="center">{setting}</Typography>
								</MenuItem>
							))}
						</Menu>
					</Box> */}
				</Toolbar>
			</Container>
		</AppBar>
	);
}
export default ResponsiveAppBar;
