import { ChakraProvider, Flex, extendTheme } from "@chakra-ui/react";
import Main from "./main/Main";
import NavBar from "./common/nav/NavBar";

const theme = extendTheme({});

function App() {
	return (
		<ChakraProvider theme={theme}>
			<Flex className="App" h={"100vh"} flexDirection={"column"}>
				<NavBar />
				<Main />
			</Flex>
		</ChakraProvider>
	);
}

export default App;
