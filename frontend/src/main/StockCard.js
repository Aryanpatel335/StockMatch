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
} from "@chakra-ui/react";
import {
	CloseOutlined,
	DownCircleOutlined,
	HeartFilled,
} from "@ant-design/icons";
import StockChart from "./StockChart";

const StockCard = (props) => {
	const { fullName, shortName, attributes } = props;
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
							<Heading as="h1">{fullName}</Heading>
							<Heading as="h2" size="sm">
								{shortName}
							</Heading>
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
								justifyContent={"flex-end"}
							>
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
									aria-label="View Live Price"
									w={"48%"}
								>
									Button
								</Button>
							</Flex>
							<Button
								bg="white"
								color="black"
								aria-label="View Live Price"
								w={"100%"}
								h={"2em"}
							>
								<DownCircleOutlined />
								<span>&nbsp;&nbsp;</span>
								See More
							</Button>
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
