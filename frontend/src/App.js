import { ChakraProvider, Flex, extendTheme } from "@chakra-ui/react";
import Layout from "./common/nav/Layout";
import { BrowserRouter } from "react-router-dom";

const theme = extendTheme({});

function App() {
	return (
		<BrowserRouter>
			<ChakraProvider theme={theme}>
				<Flex className="App" h={"99.9vh"} flexDirection={"column"}>
					<Layout />
				</Flex>
			</ChakraProvider>
		</BrowserRouter>
	);
}

export default App;
