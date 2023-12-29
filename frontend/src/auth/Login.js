import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { googleSignInUser } from "../store/authSlice";
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalBody,
	Spinner,
	Text,
	Flex,
} from "@chakra-ui/react";

const Login = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(false);

	const googleSuccess = async (res) => {
		setIsLoading(true);

		const data = jwtDecode(res.credential);

		try {
			const sub = data.sub;
			const email = data.email;
			const name = data.name;
			const obj = { sub, email, name };

			await fetch(`${process.env.REACT_APP_BACKEND}/users/login`, {
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
				})
				.finally(() => {
					setIsLoading(false);
				});
		} catch (error) {
			console.log(error);
			setIsLoading(false);
		}
	};

	const googleFailure = (error) => {
		console.log(error);
		console.log("Google Sign Up unsuccessful");
		setIsLoading(false);
	};

	return (
		<>
			<GoogleLogin
				onSuccess={googleSuccess}
				onError={googleFailure}
				theme="filled_black"
				text="continue_with"
			/>

			{/* Modal with Spinner */}
			<Modal isOpen={isLoading} closeOnOverlayClick={false} isCentered>
				<ModalOverlay />
				<ModalContent
					px={"1em"}
					py={"2em"}
					textAlign={"center"}
					w={"20em"}
					maxW={"70vw"}
				>
					<Flex
						flexDirection="column"
						alignContent="center"
						justifyContent="center"
					>
						<ModalBody>
							<Spinner size="xl" color={"#9C7CF4"} />
							<Text>Connecting to server...</Text>
						</ModalBody>
					</Flex>
				</ModalContent>
			</Modal>
		</>
	);
};

export default Login;
