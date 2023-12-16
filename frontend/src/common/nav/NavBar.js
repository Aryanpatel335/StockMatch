import {
	Box,
	Flex,
	HStack,
	IconButton,
	useDisclosure,
	useColorModeValue,
	Stack,
	Image,
	Heading,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import imgLogo from "../../resources/StockMatch Logo.png";
import { Link } from "react-router-dom";

const Links = [
	{ text: "Watchlist", link: "/watchlist" },
	{ text: "Log Out", link: "" },
];

const NavLink = (props) => {
	const { children } = props;

	return (
		<Box
			as="a"
			px={2}
			py={1}
			rounded={"md"}
			_hover={{
				textDecoration: "none",
				bg: useColorModeValue("gray.200", "gray.700"),
			}}
		>
			{children}
		</Box>
	);
};

const NavBar = (props) => {
	const { isPreferencesPage = false } = props;
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<>
			<Box h={14} px={4} boxShadow="md">
				<Flex h={14} alignItems={"center"} justifyContent={"space-between"}>
					{!isPreferencesPage ? (
						<HStack
							spacing={8}
							alignItems={"center"}
							justifyContent={"space-between"}
							w={"100vw"}
						>
							<Link to="/main">
								<Flex className="logo" alignItems={"center"}>
									<Image
										boxSize="40px"
										objectFit="contain"
										src={imgLogo}
										alt="StockMatch Logo"
									/>
									<Heading as="h1" fontSize={"lg"}>
										StockMatch
									</Heading>
								</Flex>
							</Link>
							<HStack
								as={"nav"}
								spacing={4}
								display={{ base: "none", md: "flex" }}
								justifyContent={"flex-end"}
								overflowX={"hidden"}
								overflowY={"hidden"}
							>
								{Links.map((l) => (
									<Link to={l.link}>
										<NavLink key={l.text}>{l.text}</NavLink>
									</Link>
								))}
							</HStack>
						</HStack>
					) : (
						<HStack
							spacing={8}
							alignItems={"center"}
							justifyContent={"space-between"}
							w={"100vw"}
						>
							<Flex className="logo" alignItems={"center"}>
								<Image
									boxSize="40px"
									objectFit="contain"
									src={imgLogo}
									alt="StockMatch Logo"
								/>
								<Heading as="h1" fontSize={"lg"}>
									StockMatch
								</Heading>
							</Flex>
						</HStack>
					)}

					{!isPreferencesPage && (
						<IconButton
							size={"md"}
							icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
							aria-label={"Open Menu"}
							display={{ md: "none" }}
							onClick={isOpen ? onClose : onOpen}
							bg={"white"}
						/>
					)}
				</Flex>

				{isOpen && !isPreferencesPage ? (
					<Box pb={4} display={{ md: "none" }}>
						<Stack as={"nav"} spacing={4}>
							{Links.map((l) => (
								<Link to={l.link}>
									<NavLink key={l.text}>{l.text}</NavLink>
								</Link>
							))}
						</Stack>
					</Box>
				) : null}
			</Box>
		</>
	);
};

export default NavBar;
