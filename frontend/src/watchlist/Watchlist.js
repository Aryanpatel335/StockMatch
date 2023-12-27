import {
	Button,
	Card,
	CardBody,
	Container,
	Divider,
	Flex,
	Heading,
	Image,
	Text,
} from "@chakra-ui/react";
import NavBar from "../common/nav/NavBar";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userIdSelector, userLoginStatusSelector } from "../store/authSlice";

const Watchlist = () => {
	const navigate = useNavigate();

	const [watchlist, setWatchlist] = useState([]);

	const loginStatus = useSelector(userLoginStatusSelector);
	const userId = useSelector(userIdSelector);

	useEffect(() => {
		if (!loginStatus) {
			navigate("/");
		}
	});

	useEffect(() => {
		try {
			fetch(`/watchlists/getWatchList?subId=${userId}`, {
				method: "GET",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
			})
				.then((res) => {
					if (!res.ok) {
						throw new Error(`${res.status} ${res.statusText}`);
					}
					return res.json();
				})
				.then((body) => {
					if (body) {
						setWatchlist(body);
					}
				});
		} catch (error) {
			console.log(error);
		}
	}, []);

	const removeFromWatchlist = (tickerToRemove) => {
		const body = { subID: userId, ticker: tickerToRemove, action: "remove" };

		try {
			const updatedWatchlist = watchlist.filter(
				(stock) => stock.ticker !== tickerToRemove
			);
			fetch(`/watchlists/removeFromWatchList`, {
				method: "DELETE",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify(body),
			})
				.then((res) => {
					if (!res.ok) {
						throw new Error(`${res.status} ${res.statusText}`);
					}
				})
				.then(() => setWatchlist(updatedWatchlist));
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Flex h={"100vh"} flexDirection={"column"}>
			<NavBar />
			<Flex flexDirection={"column"} w={"100vw"} bg={"gray.100"} flexGrow={"1"}>
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
								<Link to="/main">
									<Button>Back</Button>
								</Link>
							</Flex>
							<Divider
								w={"100%"}
								borderColor={"gray.300"}
								borderWidth={"1px"}
							/>
							<Flex flexDirection={"column"}>
								{watchlist.length > 0 ? (
									watchlist.map((stock) => (
										<>
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
														src={stock.logo}
														alt="StockMatch Logo"
														borderRadius={"10%"}
														mr={"0.5em"}
													/>
													<Flex
														flexDirection={"column"}
														justifyContent={"flex-start"}
													>
														<Heading as="h2" size={"s"}>
															{stock.name}
														</Heading>
														<Heading as="h3" size="xs" fontWeight={"medium"}>
															{stock.ticker}
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
														aria-label="Remove from watchlist"
														size={"md"}
														onClick={() => removeFromWatchlist(stock.ticker)}
													>
														Remove
													</Button>
												</Flex>
											</Flex>
											<Divider
												w={"100%"}
												borderColor={"gray.300"}
												borderWidth={"1px"}
											/>
										</>
									))
								) : (
									<Text my={8}>
										You have no stocks in your watchlist yet...
									</Text>
								)}
							</Flex>
						</CardBody>
					</Card>
				</Container>
			</Flex>
		</Flex>
	);
};

export default Watchlist;
