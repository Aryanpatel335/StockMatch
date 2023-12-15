import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
	name: "auth",
	initialState: {
		userLoginStatus: "",
	},
	reducers: {
		loginUser(state, action) {
			state.userLoginStatus = true;
			localStorage.setItem("profile", JSON.stringify(action.payload));
		},
		logOutUser(state) {
			state.userLoginStatus = false;
			localStorage.clear();
		},
	},
});

export default authSlice.reducer;

export const { loginUser, logOutUser } = authSlice.actions;

export const userLoginStatusSelector = (state) => state.auth.userLoginStatus;

export const googleSignInUser = (formData, navigate) => async (dispatch) => {
	try {
		dispatch(loginUser(formData));
		navigate("/preferences");
	} catch (error) {
		console.log(error);
	}
};
