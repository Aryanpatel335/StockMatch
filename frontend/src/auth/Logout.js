import { googleLogout } from "@react-oauth/google";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { googleSignOutUser } from "../store/authSlice";
import { useDispatch } from "react-redux";

const Logout = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const logout = () => {
		googleLogout();
		dispatch(googleSignOutUser([], navigate));
		navigate("/");
	};

	useEffect(() => {
		logout();
	}, []);
};

export default Logout;
