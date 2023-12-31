import {
	Card,
	CardBody,
	Text,
	Container,
	Stack,
	Heading,
	Badge,
	Flex,
	Button,
	IconButton,
	Image,
	Link,
	Fade,
	Skeleton,
} from "@chakra-ui/react";
import {
	CloseOutlined,
	DownCircleOutlined,
	HeartFilled,
	UpCircleOutlined,
} from "@ant-design/icons";
import StockCardExpanded from "./StockCardExpanded";
import { useEffect, useState } from "react";
import CandleChart from "./CandleChart";
import moment from "moment";

const mapAttributeColors = {
	"Low Risk": "red",
	"Medium Risk": "red",
	"High Risk": "red",
	"Large Company": "blue",
	"Mid-size Company": "blue",
	"Small Company": "blue",
	Sector: "teal",
	Established: "yellow",
	Emerging: "yellow",
	"Analyst Score": "purple",
};

const StockCard = (props) => {
	const [expanded, setExpanded] = useState(false);
	const [windowSize, setWindowSize] = useState({
		width: undefined,
		height: undefined,
	});
	const [triggerTransition, setTriggerTransition] = useState(true);
	const [attributes, setAttributes] = useState([]);

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
		parseAttributes();
	}, [props]);

	let {
		name,
		ticker,
		exchange,
		logo,
		beta,
		yearsInMarket,
		marketCapitalization,
		webUrl,
		finnhubIndustry,
	} = props.currentStock || {};

	const parseAttributes = () => {
		let tmpAttributes = [];

		if (beta < 1.0) {
			tmpAttributes.push({ type: "Low Risk", detail: "" });
		} else if (beta < 1.5) {
			tmpAttributes.push({ type: "Medium Risk", detail: "" });
		} else {
			tmpAttributes.push({ type: "High Risk", detail: "" });
		}

		if (marketCapitalization < 2000) {
			tmpAttributes.push({ type: "Small Company", detail: "" });
		} else if (marketCapitalization < 10000) {
			tmpAttributes.push({ type: "Mid-size Company", detail: "" });
		} else {
			tmpAttributes.push({ type: "Large Company", detail: "" });
		}

		if (yearsInMarket < 10) {
			tmpAttributes.push({ type: "Emerging", detail: "" });
		} else {
			tmpAttributes.push({ type: "Established", detail: "" });
		}

		if (finnhubIndustry) {
			tmpAttributes.push({ type: "Sector", detail: finnhubIndustry });
		}
		setAttributes(tmpAttributes);
	};

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
										<Skeleton isLoaded={!props.stockLoading}>
											<Heading as="h1" size={"md"}>
												{`${name} (${ticker})`}
											</Heading>
										</Skeleton>
										<Skeleton isLoaded={!props.stockLoading}>
											<Heading as="h2" size="xs" fontWeight={"medium"}>
												{`${exchange}`}
											</Heading>
										</Skeleton>
									</Flex>
									<Skeleton isLoaded={!props.stockLoading}>
										<Image
											boxSize="50px"
											objectFit="contain"
											src={logo}
											alt="Company Logo"
											borderRadius={"10%"}
										/>
									</Skeleton>
								</Flex>
								<Skeleton isLoaded={!props.stockLoading}>
									<Stack direction="row" flexWrap="wrap" h={"44px"} mb={"1"}>
										{attributes.map((attr) => (
											<Badge
												colorScheme={mapAttributeColors[attr.type]}
												key={attr.type}
											>
												{attr.detail
													? `${attr.type}: ${attr.detail}`
													: `${attr.type}`}
											</Badge>
										))}
									</Stack>
								</Skeleton>
								<CandleChart
									candleInfo={props.candleInfo}
									candlesLoading={props.candlesLoading}
								/>
								<Flex
									flexDirection={"row"}
									w={"100%"}
									justifyContent={"space-between"}
								>
									<Skeleton isLoaded={!props.candlesLoading}>
										<Text fontSize={"xs"} color={"gray.500"}>
											Last updated{" "}
											{props.candleInfo.length > 0
												? moment(
														props.candleInfo[props.candleInfo.length - 1]
															.uniqueCandleTimestamp
												  ).format("lll")
												: "N/A"}
										</Text>
									</Skeleton>
									<Skeleton isLoaded={!props.candlesLoading}>
										<Text fontSize={"xs"} color={"gray.500"}>
											1 month view
										</Text>
									</Skeleton>
								</Flex>
								<Flex justifyContent={"space-between"} w={"100%"}>
									<a
										href={`https://finance.yahoo.com/quote/${ticker}/`}
										target="_blank"
										rel="noopener noreferrer"
										w={"48%"}
									>
										<Button
											colorScheme="blue"
											aria-label="View Live Price"
											isDisabled={props.stockLoading}
										>
											View Live Price
										</Button>
									</a>
									<Link href={webUrl} isExternal w={"48%"}>
										<Button
											colorScheme="teal"
											aria-label="Company Website"
											w={"100%"}
											isDisabled={props.stockLoading}
										>
											Company Site
										</Button>
									</Link>
								</Flex>
								{windowSize.height < 888 && (
									<Button
										bg="white"
										color="black"
										aria-label="Show News"
										w={"100%"}
										h={"2em"}
										onClick={() =>
											setExpanded((current_state) => !current_state)
										}
										isDisabled={props.stockLoading}
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
									<StockCardExpanded
										companyNews={props.companyNews}
										newsLoading={props.newsLoading}
									/>
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
								isDisabled={props.stockLoading}
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
								isDisabled={props.stockLoading}
							/>
						</Flex>
					</Flex>
				</CardBody>
			</Card>
		</Container>
	);
};

export default StockCard;
