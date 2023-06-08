import { createTheme } from "@mui/material/styles";
import { green, purple, pink } from "@mui/material/colors";

const Theme = createTheme({
	palette: {
		primary: {
			main: pink[400],
		},
		secondary: {
			main: green[500],
		},
	},
});

export default Theme;
