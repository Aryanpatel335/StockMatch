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
			state.userId = action.payload.sub;
			localStorage.setItem("profile", JSON.stringify(action.payload));
		},
		logOutUser(state) {
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
		navigate("/preferences");
	} catch (error) {
		console.log(error);
	}
};