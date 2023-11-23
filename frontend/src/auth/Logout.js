import { Button } from "@chakra-ui/react";
import { googleLogout } from "@react-oauth/google";

const Logout = () => {
	const logout = () => {
		googleLogout();
	};

	return (
		<div>
			<Button onClick={logout}>Logout</Button>
		</div>
	);
};

export default Logout;
