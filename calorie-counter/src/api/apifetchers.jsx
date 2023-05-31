import apiKey from "../../keys";

const fetchSearchIngredients = async (query, token) => {
	const res = await fetch(
		`https://api.spoonacular.com/food/ingredients/search?apiKey=${apiKey}&query=${query}`,
		{
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		}
	);
	const data = await res.json();

	let returnValue = {};

	if (res.ok) {
		if (data.status === "error") {
			returnValue = { ok: false, data: data.message };
		} else {
			returnValue = { ok: true, data };
		}
	} else {
		if (data?.errors && Array.isArray(data.errors)) {
			const messages = data.errors.map((item) => item.msg);
			returnValue = { ok: false, data: messages };
		} else if (data?.status === "error") {
			returnValue = { ok: false, data: data.message };
		} else {
			console.log(data);
			returnValue = { ok: false, data: "An error has occurred" };
		}
	}
	return returnValue; 
};

const fetchIngredientData = async (ingredientID, token) => {
	const res = await fetch(
		`https://api.spoonacular.com/food/ingredients/${ingredientID}/information?apiKey=${apiKey}&amount=150&unit=grams`,
		{
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		}
	);
	const data = await res.json();

	let returnValue = {};

	if (res.ok) {
		if (data.status === "error") {
			returnValue = { ok: false, data: data.message };
		} else {
			returnValue = { ok: true, data };
		}
	} else {
		if (data?.errors && Array.isArray(data.errors)) {
			const messages = data.errors.map((item) => item.msg);
			returnValue = { ok: false, data: messages };
		} else if (data?.status === "error") {
			returnValue = { ok: false, data: data.message };
		} else {
			console.log(data);
			returnValue = { ok: false, data: "An error has occurred" };
		}
	}
	return returnValue;
};

export { fetchSearchIngredients, fetchIngredientData };
