import {
	Container,
	Flex,
	HStack,
	Heading,
	VStack,
	Image,
	Link,
} from "@chakra-ui/react";
import { GoogleLogin } from "@react-oauth/google";
import imgLogo from "../resources/StockMatch Logo.png";
import LandingBackground from "./LandingBackground";

const Landing = () => {
	return (
		<Container>
			<VStack spacing={0}>
				<LandingBackground />
				<HStack
					spacing={8}
					alignItems={"center"}
					justifyContent={"space-between"}
					w={"100vw"}
					py={"1em"}
					px={"1.5em"}
				>
					<Flex className="logo" alignItems={"center"}>
						<Image
							boxSize="50px"
							objectFit="contain"
							src={imgLogo}
							alt="StockMatch Logo"
						/>
						<Heading as="h1" fontSize={"2xl"}>
							StockMatch
						</Heading>
					</Flex>
				</HStack>
				<Flex
					flexDirection={"column"}
					textAlign={"center"}
					h={"75vh"}
					alignItems={"center"}
					w={"100vw"}
					justifyContent={"center"}
				>
					<Heading as="h1" w={"80%"} my="8">
						Swipe Your Way to Smart Investing.
					</Heading>
					<GoogleLogin
						onSuccess={(credentialResponse) => {
							console.log(credentialResponse);
						}}
						onError={() => {
							console.log("Login Failed");
						}}
					/>
				</Flex>
				<Flex
					flexDirection={"column"}
					textAlign={"center"}
					alignItems={"center"}
					w={"100vw"}
					bg={"gray.100"}
				>
					<Heading as="h2" my="8" size={"lg"}>
						How it Works
					</Heading>
				</Flex>
				<HStack
					spacing={8}
					alignItems={"center"}
					justifyContent={"space-between"}
					w={"100vw"}
					py={"2"}
					bg={"gray.800"}
					px={"2em"}
				>
					<Flex className="logo" alignItems={"center"}>
						<Image
							boxSize="30px"
							objectFit="contain"
							src={imgLogo}
							alt="StockMatch Logo"
						/>
						<Heading as="h1" fontSize={"md"} color={"white"}>
							StockMatch
						</Heading>
					</Flex>

					<Link color={"white"}>Contact Us</Link>
				</HStack>
			</VStack>
		</Container>
	);
};

export default Landing;
