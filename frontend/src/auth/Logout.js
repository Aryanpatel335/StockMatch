import { Button } from "@chakra-ui/react";
import { googleLogout } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

const Logout = () => {
	const navigate = useNavigate();

	const logout = () => {
		googleLogout();
		navigate("/");
	};

	return (
		<div>
			<Button onClick={logout}>Logout</Button>
		</div>
	);
};

export default Logout;
