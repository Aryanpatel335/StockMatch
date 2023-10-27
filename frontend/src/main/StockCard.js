import {
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Text,
	Container,
	Stack,
	Heading,
	Badge,
	Flex,
	Button,
	IconButton,
	Image,
	Hide,
	Show,
} from "@chakra-ui/react";
import {
	CloseOutlined,
	DownCircleOutlined,
	HeartFilled,
	UpCircleOutlined,
} from "@ant-design/icons";
import StockChart from "./StockChart";
import StockCardExpanded from "./StockCardExpanded";
import { useEffect, useState } from "react";

const StockCard = (props) => {
	const { fullName, shortName, companyLogo, companyNews, attributes } = props;

	const [expanded, setExpanded] = useState(false);
	const [windowSize, setWindowSize] = useState({
		width: undefined,
		height: undefined,
	});

	useEffect(() => {
		function handleResize() {
			setWindowSize({
				width: window.innerWidth,
				height: window.innerHeight,
			});
		}
		window.addEventListener("resize", handleResize);
		handleResize();
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return (
		<Container maxW={"sm"} pt={"2"} pb={"2"} h={"100%"}>
			<Card h={"100%"}>
				<CardBody>
					<Flex
						justifyContent={"space-between"}
						flexDirection={"column"}
						h={"100%"}
					>
						<Stack align="start" direction="column">
							<Flex
								flexDirection={"row"}
								justifyContent={"space-between"}
								w={"100%"}
								alignItems={"center"}
							>
								<Flex flexDirection={"column"}>
									<Heading as="h1">{fullName}</Heading>
									<Heading as="h2" size="sm">
										{shortName}
									</Heading>
								</Flex>
								<Image
									boxSize="50px"
									objectFit="contain"
									src={companyLogo}
									alt="StockMatch Logo"
									borderRadius={"10%"}
								/>
							</Flex>
							<Stack direction="row" flexWrap="wrap">
								<Badge colorScheme="blue">Low Risk</Badge>
								<Badge colorScheme="green">Sector: Technology</Badge>
								<Badge colorScheme="red">Large Company</Badge>
								<Badge colorScheme="purple">Upcoming Earnings</Badge>
							</Stack>
							<StockChart />
							<Flex
								flexDirection={"row"}
								w={"100%"}
								justifyContent={"space-between"}
							>
								<Text fontSize={"xs"} color={"gray.500"}>
									Last updated 12:00AM 09/09/2023
								</Text>
								<Text fontSize={"xs"} color={"gray.500"}>
									1 month view
								</Text>
							</Flex>
							<Flex justifyContent={"space-between"} w={"100%"}>
								<Button
									colorScheme="blue"
									aria-label="View Live Price"
									w={"48%"}
								>
									View Live Price
								</Button>
								<Button
									colorScheme="teal"
									aria-label="Company Website"
									w={"48%"}
								>
									Company Website
								</Button>
							</Flex>
							{windowSize.height < 888 && (
								<Button
									bg="white"
									color="black"
									aria-label="View Live Price"
									w={"100%"}
									h={"2em"}
									onClick={() => setExpanded((current_state) => !current_state)}
								>
									{expanded ? (
										<>
											<UpCircleOutlined />
											<span>&nbsp;&nbsp;</span>
											Hide Relevant News
										</>
									) : (
										<>
											<DownCircleOutlined />
											<span>&nbsp;&nbsp;</span>
											Show Relevant News
										</>
									)}
								</Button>
							)}
							{(windowSize.height >= 888 || expanded) && (
								<StockCardExpanded companyNews={companyNews} />
							)}
						</Stack>
						<Flex
							flexDirection={"row"}
							justifyContent={"space-between"}
							mt={"4"}
						>
							<IconButton
								color="white"
								bg="#9C7CF4"
								aria-label="Reject Stock"
								borderRadius={"45%"}
								fontSize={"2em"}
								h={"2em"}
								w={"2em"}
								icon={<CloseOutlined />}
							/>
							<IconButton
								color="white"
								bg="#77DD76"
								aria-label="Add Stock to Watchlist"
								borderRadius={"45%"}
								fontSize={"2em"}
								h={"2em"}
								w={"2em"}
								icon={<HeartFilled />}
							/>
						</Flex>
					</Flex>
				</CardBody>
			</Card>
		</Container>
	);
};

export default StockCard;
