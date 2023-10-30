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
import { useState } from "react";

const Preferences = () => {
	const [formData, setFormData] = useState({
		risk: "",
		companyAge: "",
		companySize: "",
		analystRating: "",
		sectors: [],
	});

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

	const handleSubmit = () => {
		console.log("Form Data:", formData);
	};

	return (
		<Box h={"100vh"}>
			<NavBar />
			<Flex flexDirection={"column"} w={"100vw"} bg={"gray.100"} minH={"100%"}>
				<Container maxW={"sm"} pt={"2"} pb={"2"} minH={"100%"}>
					<Card minH={"100%"}>
						<CardBody>
							<Heading as={"h1"} size={"lg"}>
								Preferences
							</Heading>
							<Text as={"p"} mb={"1em"}>
								Please fill out your preferences so we can start showing you
								your matches!
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
											<Radio value="low" colorScheme={"teal"}>
												Low Risk
											</Radio>
											<Radio value="high" colorScheme={"teal"}>
												High Risk
											</Radio>
											<Radio value="no-preference" colorScheme={"teal"}>
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
											<Radio value="established" colorScheme={"teal"}>
												Well-Established Companies
											</Radio>
											<Radio value="emerging" colorScheme={"teal"}>
												Newer/Emerging Companies
											</Radio>
											<Radio value="no-preference" colorScheme={"teal"}>
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
											<Radio value="small" colorScheme={"teal"}>
												Smaller Companies (Low Market Cap)
											</Radio>
											<Radio value="large" colorScheme={"teal"}>
												Larger Companies (High Market Cap)
											</Radio>
											<Radio value="no-preference" colorScheme={"teal"}>
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
											<Radio value="significant" colorScheme={"teal"}>
												Significant
												{/* Significant: Analyst ratings strongly influence my
												decisions. */}
											</Radio>
											<Radio value="moderate" colorScheme={"teal"}>
												Moderate
												{/* Moderate: I consider analyst ratings, but they are not
												the sole factor. */}
											</Radio>
											<Radio value="minimal" colorScheme={"teal"}>
												Minimal
												{/* Minimal: I don't rely much on analyst ratings. */}
											</Radio>
											<Radio value="no-preference" colorScheme={"teal"}>
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
											<Checkbox value="technology">Technology</Checkbox>
											<Checkbox value="health-care">Health Care</Checkbox>
											<Checkbox value="real-estate">Real Estate</Checkbox>
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
