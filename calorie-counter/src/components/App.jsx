import React, { useEffect, useState } from "react";
import Food from "./Food/Food";

import ResponsiveAppBar from "./ResponsiveAppBar";

const App = () => {
	return (
		<>
			<ResponsiveAppBar />
			<br />
			<Food />
		</>
	);
};

export default App;
