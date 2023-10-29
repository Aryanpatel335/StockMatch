import { ChakraProvider, Flex, extendTheme } from "@chakra-ui/react";
import Main from "./main/Main";
import Landing from "./landing/Landing";

const theme = extendTheme({});

function App() {
	return (
		<ChakraProvider theme={theme}>
			<Flex
				className="App"
				h={"100vh"}
				flexDirection={"column"}
				style={{ overflowX: "hidden" }}
			>
				<Main />
				{/* <Landing /> */}
			</Flex>
		</ChakraProvider>
	);
}

export default App;
