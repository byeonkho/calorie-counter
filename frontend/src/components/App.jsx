import React, { useEffect, useState } from "react";
import Food from "./Food/Food";
import Login from "./Login";

import ResponsiveAppBar from "./ResponsiveAppBar";
import Signup from "./Signup";

const App = () => {
	return (
		<>
			<ResponsiveAppBar />
			<br />
			<Food />
			<Login />
			{/* <Signup /> */}
		</>
	);
};

export default App;
