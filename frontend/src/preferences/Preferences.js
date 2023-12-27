import {
	Box,
	Button,
	Card,
	CardBody,
	Checkbox,
	CheckboxGroup,
	Container,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	Radio,
	RadioGroup,
	Stack,
	Text,
} from "@chakra-ui/react";
import NavBar from "../common/nav/NavBar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { userIdSelector, userLoginStatusSelector } from "../store/authSlice";

const Preferences = () => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		risk: "",
		companyAge: "",
		companySize: "",
		analystRating: "",
		sectors: [],
	});

	const loginStatus = useSelector(userLoginStatusSelector);
	const userId = useSelector(userIdSelector);
	const [userProfile, setUserProfile] = useState(null);

	useEffect(() => {
		if (!loginStatus) {
			navigate("/");
		} else {
			setUserProfile(localStorage.getItem("profile"));
			if (userProfile?.preferences) {
				navigate("/main");
			}
		}
	}, [userProfile]);

	const handleRadioChange = (question, value) => {
		setFormData({
			...formData,
			[question]: value,
		});
	};

	const handleCheckboxChange = (value) => {
		setFormData({
			...formData,
			sectors: value,
		});
	};

	const savePreferences = (formData) => {
		const userPreferences = {
			beta: formData.risk === "" ? null : parseFloat(formData.risk),
			analystScore:
				formData.analystRating === ""
					? null
					: parseFloat(formData.analystRating),
			timeInMarket:
				formData.companyAge === "" ? null : parseFloat(formData.companyAge),
			marketCapMillions:
				formData.companySize === "" ? null : parseFloat(formData.companySize),
			// TODO: This is a temporary fix until the backend schema is updated
			industry: formData.sectors[0],
		};

		const body = { subID: userId, ...userPreferences };

		fetch(`/preferences/saveUserPreferences`, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body),
		})
			.then((res) => {
				if (!res.ok) {
					throw new Error(`${res.status} ${res.statusText}`);
				}
				return res.json();
			})
			.then((body) => {
				setUserProfile((oldProfile) => {
					return { ...oldProfile, preferences: userPreferences };
				});
			})
			.catch((error) => console.log(error));
	};

	const handleSubmit = () => {
		savePreferences(formData);
	};

	return (
		<Box h={"100vh"}>
			<NavBar isPreferencesPage={true} />
			<Flex flexDirection={"column"} w={"100vw"} bg={"gray.100"} minH={"100%"}>
				<Container maxW={"sm"} pt={"2"} pb={"2"} minH={"100%"}>
					<Card minH={"100%"}>
						<CardBody>
							<Heading as={"h1"} size={"lg"}>
								Preferences
							</Heading>
							<Text as={"p"} mb={"1em"}>
								Answer a few quick questions so we can start showing you your
								matches!
							</Text>
							<Flex flexDirection={"column"}>
								<FormControl>
									<FormLabel>
										What level of investment risk are you comfortable with?
									</FormLabel>
									<RadioGroup
										onChange={(value) => handleRadioChange("risk", value)}
										value={formData.risk}
									>
										<Stack direction="column">
											<Radio value={"0.0"} colorScheme={"green"}>
												Low Risk
											</Radio>
											<Radio value={"1.0"} colorScheme={"green"}>
												Medium Risk
											</Radio>
											<Radio value={"1.5"} colorScheme={"green"}>
												High Risk
											</Radio>
											<Radio value={""} colorScheme={"green"}>
												No Preference
											</Radio>
										</Stack>
									</RadioGroup>
								</FormControl>

								<FormControl mt={4}>
									<FormLabel>
										Do you prefer investing in well-established companies with a
										proven track record on the market, or are you interested in
										newer and emerging companies that may offer high growth
										potential?
									</FormLabel>
									<RadioGroup
										onChange={(value) => handleRadioChange("companyAge", value)}
										value={formData.companyAge}
									>
										<Stack direction="column">
											<Radio value={"0"} colorScheme={"green"}>
												Newer/Emerging Companies
											</Radio>
											<Radio value={"10"} colorScheme={"green"}>
												Well-Established Companies
											</Radio>
											<Radio value={""} colorScheme={"green"}>
												No Preference
											</Radio>
										</Stack>
									</RadioGroup>
								</FormControl>

								<FormControl mt={4}>
									<FormLabel>
										Do you prefer to invest in smaller companies or larger
										companies?
									</FormLabel>
									<RadioGroup
										onChange={(value) =>
											handleRadioChange("companySize", value)
										}
										value={formData.companySize}
									>
										<Stack direction="column">
											<Radio value={"0"} colorScheme={"green"}>
												Smaller Companies (Low Market Cap)
											</Radio>
											<Radio value={"2000"} colorScheme={"green"}>
												Medium-Size Companies (Mid Market Cap)
											</Radio>
											<Radio value={"10000"} colorScheme={"green"}>
												Larger Companies (High Market Cap)
											</Radio>
											<Radio value={""} colorScheme={"green"}>
												No Preference
											</Radio>
										</Stack>
									</RadioGroup>
								</FormControl>

								<FormControl mt={4}>
									<FormLabel>
										How much weight do you place on analyst ratings when making
										investment decisions?
									</FormLabel>
									<RadioGroup
										onChange={(value) =>
											handleRadioChange("analystRating", value)
										}
										value={formData.analystRating}
									>
										<Stack direction="column">
											<Radio value={"1"} colorScheme={"green"}>
												Minimal
												{/* Minimal: I don't rely much on analyst ratings. */}
											</Radio>
											<Radio value={"2"} colorScheme={"green"}>
												Moderate
												{/* Moderate: I consider analyst ratings, but they are not
												the sole factor. */}
											</Radio>
											<Radio value={"3"} colorScheme={"green"}>
												Significant
												{/* Significant: Analyst ratings strongly influence my
												decisions. */}
											</Radio>
											<Radio value={""} colorScheme={"green"}>
												No Preference
												{/* No Preference: I'm indifferent to analyst ratings. */}
											</Radio>
										</Stack>
									</RadioGroup>
								</FormControl>

								<FormControl mt={4}>
									<FormLabel>
										Which sectors/industries excite you the most?
									</FormLabel>
									<CheckboxGroup
										value={formData.sectors}
										onChange={handleCheckboxChange}
									>
										<Stack direction="column">
											<Checkbox value="Technology" colorScheme={"green"}>
												Technology
											</Checkbox>
											<Checkbox value="Health Care" colorScheme={"green"}>
												Health Care
											</Checkbox>
											<Checkbox value="Real Estate" colorScheme={"green"}>
												Real Estate
											</Checkbox>
											<Checkbox value="Energy" colorScheme={"green"}>
												Energy
											</Checkbox>
										</Stack>
									</CheckboxGroup>
								</FormControl>

								<Button
									mt={6}
									color="white"
									background={"#9C7CF4"}
									onClick={handleSubmit}
								>
									Submit
								</Button>
							</Flex>
						</CardBody>
					</Card>
				</Container>
			</Flex>
		</Box>
	);
};

export default Preferences;
