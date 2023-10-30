import {
	Box,
	Button,
	Card,
	CardBody,
	Container,
	Divider,
	Flex,
	Heading,
	Image,
	Link,
} from "@chakra-ui/react";
import NavBar from "../common/nav/NavBar";

const Watchlist = () => {
	const mockWatchlist = [
		{
			fullName: "Apple Inc",
			ticker: "AAPL",
			exchange: "NASDAQ",
			companyLogo:
				"https://static.finnhub.io/logo/87cb30d8-80df-11ea-8951-00000000092a.png",
		},
		{
			fullName: "Texas Instruments Inc",
			ticker: "TXN",
			exchange: "NASDAQ",
			companyLogo:
				"https://media.zenfs.com/en/us.finance.gurufocus/46b33df5eee32f0e3f1280f21950eade",
		},
		{
			fullName: "Ceridian HCM Holding Inc",
			ticker: "CDAY",
			exchange: "NYSE",
			companyLogo:
				"https://images.crunchbase.com/image/upload/c_lpad,f_auto,q_auto:eco,dpr_1/re8dcjamiepioshqsix5",
		},
	];

	return (
		<Box h={"100vh"}>
			<NavBar />
			<Flex flexDirection={"column"} w={"100vw"} bg={"gray.100"} minH={"100%"}>
				<Container maxW={"sm"} pt={"2"} pb={"2"} minH={"100%"}>
					<Card minH={"100%"}>
						<CardBody>
							<Flex
								justifyContent={"space-between"}
								alignItems={"center"}
								pb={"0.5em"}
							>
								<Heading as={"h1"} size={"lg"}>
									Watchlist
								</Heading>
								<Button>Back</Button>
							</Flex>

							<Flex flexDirection={"column"}>
								{mockWatchlist.map((stock) => (
									<>
										<Divider
											w={"100%"}
											borderColor={"gray.300"}
											borderWidth={"1px"}
										/>
										<Flex
											w={"100%"}
											py={"1em"}
											px={"0.5em"}
											flexDirection={"column"}
										>
											<Flex pb={"1em"}>
												<Image
													boxSize="40px"
													objectFit="contain"
													src={stock.companyLogo}
													alt="StockMatch Logo"
													borderRadius={"10%"}
													mr={"0.5em"}
												/>
												<Flex
													flexDirection={"column"}
													justifyContent={"flex-start"}
												>
													<Heading as="h2" size={"s"}>
														{stock.fullName}
													</Heading>
													<Heading as="h3" size="xs" fontWeight={"medium"}>
														{`${stock.exchange}:${stock.ticker}`}
													</Heading>
												</Flex>
											</Flex>
											<Flex justifyContent={"space-around"}>
												<Link
													href={`https://finance.yahoo.com/quote/${stock.ticker}/`}
													isExternal
												>
													<Button
														color="white"
														bg={"blue.500"}
														aria-label="View Live Price"
														size={"md"}
													>
														View Price
													</Button>
												</Link>
												<Button
													color={"white"}
													bg={"red.500"}
													aria-label="View Live Price"
													size={"md"}
												>
													Remove
												</Button>
											</Flex>
										</Flex>
									</>
								))}
								<Divider
									w={"100%"}
									borderColor={"gray.300"}
									borderWidth={"1px"}
								/>
							</Flex>
						</CardBody>
					</Card>
				</Container>
			</Flex>
		</Box>
	);
};

export default Watchlist;
