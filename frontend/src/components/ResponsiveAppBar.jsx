import LunchDiningIcon from "@mui/icons-material/LunchDining";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React from "react";
import { useUserInfo } from "./UserInfoContext";

function ResponsiveAppBar(props) {
	const {
		userIsAdmin,
		setUserIsAdmin,
		setAccessToken,
		setRefreshToken,
		setUserID,
	} = useUserInfo();

	const pages = [];

	if (userIsAdmin) {
		pages.push("Food", "Weight", "Admin");
	} else {
		pages.push("Food", "Weight");
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

		// Redirect to login page or homepage

		window.location.href = "/";
	};

	const handleCloseNavMenu = (el) => {
		// setAnchorElNav(null);
		if (el == "Food") {
			props.setShowFood(true);
			props.setShowAdmin(false);
			props.setShowWeight(false);
		}
		if (el == "Admin") {
			props.setShowFood(false);
			props.setShowAdmin(true);
			props.setShowWeight(false);
		}
		if (el == "Weight") {
			props.setShowWeight(true);
			props.setShowAdmin(false);
			props.setShowFood(false);
		}
	};

	return (
		<AppBar position="static">
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<LunchDiningIcon
						sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
					/>
					<Typography
						variant="h6"
						noWrap
						component="a"
						href="/"
						sx={{
							mr: 5,
							display: { xs: "none", md: "flex" },
							// fontFamily: "monospace",
							fontWeight: 700,
							letterSpacing: ".1rem",
							color: "inherit",
							textDecoration: "none",
						}}
					>
						calorie counter
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
