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
		<Container maxW="sm" mt="2">
			<Card>
				<CardBody>
					<Stack align="start" direction="column">
						<Heading as="h1">{fullName}</Heading>
						<Heading as="h2" size="sm">
							{shortName}
						</Heading>
						<Stack direction="row" flexWrap="wrap">
							<Badge>Low Risk</Badge>
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
