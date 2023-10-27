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
} from "@ant-design/icons";
import StockChart from "./StockChart";
import StockCardExpanded from "./StockCardExpanded";

const StockCard = (props) => {
	const { fullName, shortName, companyLogo, companyNews, attributes } = props;
	return (
		<Container maxW={"sm"} pt={"2"} pb={"4"} h={"100%"}>
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
									boxSize="40px"
									objectFit="contain"
									src={companyLogo}
									alt="StockMatch Logo"
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
							<Show breakpoint="(max-height: 888px)">
								<Button
									bg="white"
									color="black"
									aria-label="View Live Price"
									w={"100%"}
									h={"2em"}
								>
									<DownCircleOutlined />
									<span>&nbsp;&nbsp;</span>
									See Relevant News
								</Button>
							</Show>
							<Hide breakpoint="(max-height: 888px)">
								<StockCardExpanded companyNews={companyNews} />
							</Hide>
						</Stack>
						<Flex flexDirection={"row"} justifyContent={"space-between"}>
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
