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
				.then((res) => res.json())
				.then((body) => {
					if (body === true) {
						dispatch(googleSignInUser(data, navigate));
					} else {
						navigate("/");
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
		<div className="signInButton">
			<GoogleLogin onSuccess={googleSuccess} onError={googleFailure} />
		</div>
	);
};

export default Login;
