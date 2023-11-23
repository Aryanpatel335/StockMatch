import { GoogleLogin } from "@react-oauth/google";

const Login = () => {
	const onSuccess = (response) => {
		console.log(response);
	};

	const onError = (error) => {
		console.log("Error: ", error);
	};

	return (
		<div className="signInButton">
			<GoogleLogin onSuccess={onSuccess} onError={onError} />
		</div>
	);
};

export default Login;
