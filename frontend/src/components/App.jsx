import React, { useState } from "react";
import Food from "./Food/Food";
import Login from "./Login/Login";
import Signup from "./Login/Signup";
import ResponsiveAppBar from "./ResponsiveAppBar";
import Admin from "./Admin";
import { UserInfoProvider } from "./UserInfoContext";
import Weight from "./Weight/Weight";

const App = () => {
	const [showLogin, setShowLogin] = useState(true);
	const [showSignup, setShowSignup] = useState(false);
	const [showAdmin, setShowAdmin] = useState(false);
	const [showFood, setShowFood] = useState(true);
	const [showWeight, setShowWeight] = useState(false);
	const [loading, setLoading] = useState(true);

	return (
		<>
			<UserInfoProvider>
				{!loading && !showLogin && !showSignup && (
					<ResponsiveAppBar
						setShowFood={setShowFood}
						setShowAdmin={setShowAdmin}
						setShowWeight={setShowWeight}
						loading={loading}
					/>
				)}
				{showLogin && (
					<Login
						setShowSignup={setShowSignup}
						setShowLogin={setShowLogin}
						setLoading={setLoading}
						loading={loading}
					/>
				)}
				{showSignup && !loading && (
					<Signup
						setShowSignup={setShowSignup}
						setShowLogin={setShowLogin}
					/>
				)}
				{!showLogin && !showSignup && !loading && showFood && <Food />}
				{showWeight && <Weight />}
				{!showLogin && !showSignup && !loading && !showFood && showAdmin && (
					<Admin />
				)}
			</UserInfoProvider>
		</>
	);
};

export default App;
