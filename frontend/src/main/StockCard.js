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
	Link,
	Slide,
	Fade,
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

const mapAttributeColors = {
	"Low Risk": "red",
	"High Risk": "red",
	"Large Company": "blue",
	"Small Company": "blue",
	Sector: "teal",
	Established: "yellow",
	Emerging: "yellow",
	"Analyst Score": "purple",
};

const StockCard = (props) => {
	const {
		fullName,
		ticker,
		exchange,
		companyLogo,
		companyNews,
		attributes,
		weburl,
	} = props.currentCompany;

	const [expanded, setExpanded] = useState(false);
	const [windowSize, setWindowSize] = useState({
		width: undefined,
		height: undefined,
	});
	const [triggerTransition, setTriggerTransition] = useState(true);

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

	useEffect(() => {
		setTriggerTransition(true);
	}, [props]);

	return (
		<Container maxW={"sm"} pt={"2"} pb={"2"} h={"100%"}>
			<Card h={"100%"}>
				<CardBody>
					<Flex
						justifyContent={"space-between"}
						flexDirection={"column"}
						h={"100%"}
					>
						<Fade
							in={triggerTransition}
							transition={{
								exit: { duration: 0 },
								enter: { delay: 0.2, duration: 0.5 },
							}}
						>
							<Stack align="start" direction="column">
								<Flex
									flexDirection={"row"}
									justifyContent={"space-between"}
									w={"100%"}
									alignItems={"center"}
									mb={"1"}
								>
									<Flex flexDirection={"column"}>
										<Heading as="h1" size={"md"}>
											{fullName}
										</Heading>
										<Heading as="h2" size="xs" fontWeight={"medium"}>
											{`${exchange}:${ticker}`}
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
								<Stack direction="row" flexWrap="wrap" h={"44px"} mb={"1"}>
									{attributes.map((attr) => (
										<Badge colorScheme={mapAttributeColors[attr.type]}>
											{attr.detail
												? `${attr.type}: ${attr.detail}`
												: `${attr.type}`}
										</Badge>
									))}
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
									<Link
										href={`https://finance.yahoo.com/quote/${ticker}/`}
										isExternal
										w={"48%"}
									>
										<Button colorScheme="blue" aria-label="View Live Price">
											View Live Price
										</Button>
									</Link>
									<Link href={weburl} isExternal w={"48%"}>
										<Button
											colorScheme="teal"
											aria-label="Company Website"
											w={"100%"}
										>
											Company Site
										</Button>
									</Link>
								</Flex>
								{windowSize.height < 888 && (
									<Button
										bg="white"
										color="black"
										aria-label="View Live Price"
										w={"100%"}
										h={"2em"}
										onClick={() =>
											setExpanded((current_state) => !current_state)
										}
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
						</Fade>
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
								onClick={(e) => {
									setTriggerTransition(false);
									props.stockRejected();
								}}
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
								onClick={(e) => {
									setTriggerTransition(false);
									props.stockAdded();
								}}
							/>
						</Flex>
					</Flex>
				</CardBody>
			</Card>
		</Container>
	);
};

export default StockCard;
