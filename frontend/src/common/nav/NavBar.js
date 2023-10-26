import {
	Box,
	Flex,
	Avatar,
	HStack,
	IconButton,
	Button,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	MenuDivider,
	useDisclosure,
	useColorModeValue,
	Stack,
	Image,
	Heading,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import imgLogo from "../../resources/StockMatch Logo.png";

const Links = ["Watchlist", "Settings", "Log Out"];

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
			href={"#"}
		>
			{children}
		</Box>
	);
};

const NavBar = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<>
			<Box px={4} borderBottom={"1px"} borderBottomColor={"gray.400"}>
				<Flex h={12} alignItems={"center"} justifyContent={"space-between"}>
					<HStack
						spacing={8}
						alignItems={"center"}
						justifyContent={"space-between"}
						w={"100vw"}
					>
						<Flex class="logo" alignItems={"center"}>
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

						<HStack
							as={"nav"}
							spacing={4}
							display={{ base: "none", md: "flex" }}
							justifyContent={"flex-end"}
							overflowX={"hidden"}
						>
							{Links.map((link) => (
								<NavLink key={link}>{link}</NavLink>
							))}
						</HStack>
					</HStack>
					<IconButton
						size={"md"}
						icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
						aria-label={"Open Menu"}
						display={{ md: "none" }}
						onClick={isOpen ? onClose : onOpen}
						bg={"white"}
					/>
				</Flex>

				{isOpen ? (
					<Box pb={4} display={{ md: "none" }}>
						<Stack as={"nav"} spacing={4}>
							{Links.map((link) => (
								<NavLink key={link}>{link}</NavLink>
							))}
						</Stack>
					</Box>
				) : null}
			</Box>
		</>
	);
};

export default NavBar;
