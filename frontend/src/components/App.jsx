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

	return (
		<>
			<UserInfoProvider>
				<ResponsiveAppBar
					setShowFood={setShowFood}
					setShowAdmin={setShowAdmin}
				/>
				{showLogin && (
					<Login
						setShowSignup={setShowSignup}
						setShowLogin={setShowLogin}
					/>
				)}
				{showSignup && (
					<Signup
						setShowSignup={setShowSignup}
						setShowLogin={setShowLogin}
					/>
				)}
				{!showLogin && !showSignup && showFood && <Food />}
				{!showLogin && !showSignup && !showFood && <Admin />}
			</UserInfoProvider>
		</>
	);
};

export default App;
