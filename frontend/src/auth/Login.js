import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { googleSignInUser } from "../store/authSlice";

const Login = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const googleSuccess = async (res) => {
		const data = jwtDecode(res.credential);

		try {
			const sub = data.sub;
			const email = data.email;
			const name = data.name;
			const obj = { sub, email, name };
			await fetch(`/users/login`, {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify(obj),
			})
				.then((res) => {
					if (!res.ok) {
						throw new Error(`${res.status} ${res.statusText}`);
					}
					return res.json();
				})
				.then((body) => {
					if (body.length !== 0) {
						dispatch(googleSignInUser(body, navigate));
					} else {
						console.log("Not signed in successfully");
					}
				});
		} catch (error) {
			console.log(error);
		}
	};
	const googleFailure = (error) => {
		console.log(error);
		console.log("Google Sign Up unsuccessful");
	};

	return (
		<GoogleLogin
			onSuccess={googleSuccess}
			onError={googleFailure}
			theme="filled_black"
			text="continue_with"
		/>
	);
};

export default Login;
