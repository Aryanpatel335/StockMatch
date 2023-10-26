import { Flex, useColorModeValue } from "@chakra-ui/react";
import StockCard from "./StockCard";

const Main = () => {
	return (
		<Flex
			bg={useColorModeValue("gray.100", "gray.900")}
			flexDirection={"column"}
			flexGrow={"1"}
		>
			<StockCard fullName="Apple Inc" shortName="NASDAQ:AAPL" />
		</Flex>
	);
};

export default Main;
