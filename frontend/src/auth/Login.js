import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const navigate = useNavigate();

	const onSuccess = (response) => {
		console.log(response);
		navigate("/preferences");
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
