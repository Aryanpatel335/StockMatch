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
} from "@chakra-ui/react";
import StockChart from "./StockChart";

const StockCard = (props) => {
	const { fullName, shortName, attributes } = props;
	return (
		<Container maxW={"sm"} pt={"2"} pb={"4"} h={"100%"}>
			<Card h={"100%"}>
				<CardBody>
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
						<Text></Text>
					</Stack>
				</CardBody>
			</Card>
		</Container>
	);
};

export default StockCard;
