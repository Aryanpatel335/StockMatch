import {
	Container,
	Flex,
	HStack,
	Heading,
	VStack,
	Image,
	Link,
	Text,
	IconButton,
} from "@chakra-ui/react";
import imgLogo from "../resources/StockMatch Logo.png";
import imgScreenshot0 from "../resources/screenshots/stockmatchScreenshot0.png";
import imgScreenshot1 from "../resources/screenshots/stockmatchScreenshot1.png";
import imgScreenshot2 from "../resources/screenshots/stockmatchScreenshot2.png";
import imgScreenshot3 from "../resources/screenshots/stockmatchScreenshot3.png";
import LandingBackground from "./LandingBackground";
import Login from "../auth/Login.js";
import { GithubOutlined } from "@ant-design/icons";

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
					<Login />
				</Flex>
				<Flex
					flexDirection={"column"}
					textAlign={"center"}
					alignItems={"center"}
					w={"100vw"}
					bg={"gray.100"}
					px={"8"}
					py={"8"}
				>
					<Heading as="h2" pb="8" size={"lg"}>
						How it Works
					</Heading>
					<Text>
						Discovering your perfect stock match has never been this easy. Set
						your preferences, then tap the heart for stocks you favor and the X
						for those you don't.
					</Text>
					<Text>
						With personalized recommendations aligned to your preferences,
						StockMatch brings you a curated investing experience.
					</Text>
					<Flex
						direction={{ base: "column", md: "row" }}
						gap={{ base: 8, md: 16 }}
						justifyContent={{ base: "center", md: "space-between" }}
						px={{ base: 8, md: 24 }}
						pt={8}
						alignItems={"center"}
					>
						<Image
							width={{ base: "60%", md: "20%" }}
							objectFit="cover"
							src={imgScreenshot0}
							alt="UI Screenshot 0"
							borderRadius="xl"
							border="3px solid"
							borderColor="gray.500"
						/>
						<Image
							width={{ base: "60%", md: "20%" }}
							objectFit="cover"
							src={imgScreenshot1}
							alt="UI Screenshot 1"
							borderRadius="xl"
							border="3px solid"
							borderColor="gray.500"
						/>
						<Image
							width={{ base: "60%", md: "20%" }}
							objectFit="cover"
							src={imgScreenshot2}
							alt="UI Screenshot 2"
							borderRadius="xl"
							border="3px solid"
							borderColor="gray.500"
						/>
						<Image
							width={{ base: "60%", md: "20%" }}
							objectFit="cover"
							src={imgScreenshot3}
							alt="UI Screenshot 3"
							borderRadius="xl"
							border="3px solid"
							borderColor="gray.500"
						/>
					</Flex>
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

					<a
						href="https://github.com/"
						target="_blank"
						rel="noopener noreferrer"
					>
						<IconButton
							color="#9c7cf4"
							backgroundColor={"transparent"}
							aria-label="Github"
							borderRadius={"45%"}
							fontSize={"2em"}
							icon={<GithubOutlined />}
						/>
					</a>
				</HStack>
			</VStack>
		</Container>
	);
};

export default Landing;
