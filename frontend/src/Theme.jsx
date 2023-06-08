import { createTheme } from "@mui/material/styles";
import { green, pink } from "@mui/material/colors";

const Theme = createTheme({
	palette: {
		primary: {
			main: pink[400],
			white: "#FFFFF",
		},
		secondary: {
			main: green[500],
		},
	},
	typography: {
		fontFamily: "Inter, Roboto",
		h1: {
			fontSize: "2.5rem",
			fontWeight: 700,
			lineHeight: 1.2,
		},
		h2: {
			fontSize: "2rem",
			fontWeight: 700,
			lineHeight: 1.2,
		},
		h3: {
			fontSize: "1.75rem",
			fontWeight: 700,
			lineHeight: 1.2,
		},
		h4: {
			fontSize: "1.5rem",
			fontWeight: 700,
			lineHeight: 1.2,
		},
		h5: {
			fontSize: "1.25rem",
			fontWeight: 700,
			lineHeight: 1.2,
		},
		h6: {
			fontSize: "1.125rem",
			fontWeight: 700,
			lineHeight: 1.2,
		},
		subtitle1: {
			fontSize: "1rem",
			fontWeight: 700,
			lineHeight: 1.5,
		},
		subtitle2: {
			fontSize: "0.9rem",
			fontWeight: 600,
			lineHeight: 1.5,
		},
		subtitle3: {
			fontSize: "1rem",
			fontWeight: 1500,
			lineHeight: 1,
		},
		body1: {
			fontSize: "1rem",
			fontWeight: 400,
			lineHeight: 1.5,
		},
		body2: {
			fontSize: "0.875rem",
			fontWeight: 400,
			lineHeight: 1.5,
		},
	},
});

export default Theme;
