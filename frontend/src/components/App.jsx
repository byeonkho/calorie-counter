import React, { useEffect, useState, createContext } from "react";
import Food from "./Food/Food";
import Login from "./Login";

import ResponsiveAppBar from "./ResponsiveAppBar";
import Signup from "./Signup";
// import UserInfoContext from "./UseContext";
import { UserInfoProvider } from "./UserInfoContext";
import { useUserInfo } from "./UserInfoContext";
import Admin from "./Admin";

const App = () => {
	const [showLogin, setShowLogin] = useState(true);
	const [showSignup, setShowSignup] = useState(false);
	const [showAdmin, setShowAdmin] = useState(false);
	const [showFood, setShowFood] = useState(true);
	const [loading, setLoading] = useState(true);

	return (
		<>
			<UserInfoProvider>
				{!loading && !showLogin && (
					<ResponsiveAppBar
						setShowFood={setShowFood}
						setShowAdmin={setShowAdmin}
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
				{!showLogin && !showSignup && !showFood && !loading && <Admin />}
			</UserInfoProvider>
		</>
	);
};

export default App;
