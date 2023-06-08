import React, { useContext, useState, useEffect } from "react";

const UserInfoContext = React.createContext();

export const useUserInfo = () => {
	return useContext(UserInfoContext);
};

export const UserInfoProvider = ({ children }) => {
	const [userID, setUserID] = useState("test");
	const [userIsAdmin, setUserIsAdmin] = useState(false);
	const [accessToken, setAccessToken] = useState([]);
	const [refreshToken, setRefreshToken] = useState(false);

	useEffect(() => {
		if (refreshToken) {
			localStorage.setItem("refreshToken", refreshToken);
			console.log("refresh token stored in local", refreshToken);
		}
	}, [refreshToken]);

	return (
		<UserInfoContext.Provider
			value={{
				userID,
				setUserID,
				userIsAdmin,
				setUserIsAdmin,
				accessToken,
				setAccessToken,
				refreshToken,
				setRefreshToken,
			}}
		>
			{children}
		</UserInfoContext.Provider>
	);
};
