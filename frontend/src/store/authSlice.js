import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
	name: "auth",
	initialState: {
		userLoginStatus: false,
		userId: "",
	},
	reducers: {
		loginUser(state, action) {
			state.userLoginStatus = true;
			state.userId = action.payload.subID;
			let currentStockIndex = action.payload.currentStockView;
			if (currentStockIndex === null) {
				currentStockIndex = 0;
			}
			localStorage.setItem("currentStockIndex", currentStockIndex);
			localStorage.setItem("profile", JSON.stringify(action.payload));
		},
		logOutUser(state, action) {
			state.userLoginStatus = false;
			state.userId = "";
			localStorage.clear();
		},
	},
});

export default authSlice.reducer;

export const { loginUser, logOutUser } = authSlice.actions;

export const userLoginStatusSelector = (state) => state.auth.userLoginStatus;
export const userIdSelector = (state) => state.auth.userId;

export const googleSignInUser = (formData, navigate) => async (dispatch) => {
	try {
		dispatch(loginUser(formData));
		if (!formData.preferences) {
			navigate("/preferences");
		} else {
			navigate("/main");
		}
	} catch (error) {
		console.log(error);
	}
};

export const googleSignOutUser = (data, navigate) => async (dispatch) => {
	try {
		dispatch(logOutUser(data));
		navigate("/");
	} catch (error) {
		console.log(error);
	}
};
