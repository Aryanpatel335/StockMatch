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
	Skeleton,
} from "@chakra-ui/react";
import NavBar from "../common/nav/NavBar";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { userIdSelector, userLoginStatusSelector } from "../store/authSlice";

const Watchlist = () => {
	const navigate = useNavigate();

	const [watchlist, setWatchlist] = useState([]);
	const [watchlistLoading, setWatchlistLoading] = useState(true);

	const loginStatus = useSelector(userLoginStatusSelector);
	const userId = useSelector(userIdSelector);

	useEffect(() => {
		if (!loginStatus) {
			navigate("/");
		}
	});

	const isMounted = useRef(true);

	useEffect(() => {
		if (isMounted.current) {
			fetchWatchlist();
			isMounted.current = false;
		}
	}, []);

	const fetchWatchlist = () => {
		setWatchlistLoading(true);
		try {
			fetch(
				`${process.env.REACT_APP_BACKEND}/watchlists/getWatchList?subId=${userId}`,
				{
					method: "GET",
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
					},
				}
			)
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
				})
				.finally(() => setWatchlistLoading(false));
		} catch (error) {
			console.log(error);
		}
	};

	const removeFromWatchlist = (tickerToRemove) => {
		const body = { subID: userId, ticker: tickerToRemove, action: "remove" };

		try {
			const updatedWatchlist = watchlist.filter(
				(stock) => stock.ticker !== tickerToRemove
			);
			setWatchlist(updatedWatchlist);
			fetch(`${process.env.REACT_APP_BACKEND}/watchlists/removeFromWatchList`, {
				method: "DELETE",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify(body),
			}).then((res) => {
				if (!res.ok) {
					throw new Error(`${res.status} ${res.statusText}`);
				}
			});
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
							{!watchlistLoading ? (
								<Flex flexDirection={"column"}>
									{watchlist.map((stock) => (
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
													<a
														href={`https://finance.yahoo.com/quote/${stock.ticker}/`}
														target="_blank"
														rel="noopener noreferrer"
													>
														<Button
															colorScheme="blue"
															aria-label="View Price"
															size={"md"}
														>
															View Price
														</Button>
													</a>
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
									))}
								</Flex>
							) : (
								<Flex flexDirection={"column"} gap="5px">
									<Skeleton height="130px" width="100%" />
									<Skeleton height="130px" width="100%" />
									<Skeleton height="130px" width="100%" />
									<Skeleton height="130px" width="100%" />
									<Skeleton height="130px" width="100%" />
								</Flex>
							)}
							{watchlist.length === 0 && !watchlistLoading && (
								<Text my={8}>You have no stocks in your watchlist yet...</Text>
							)}
						</CardBody>
					</Card>
				</Container>
			</Flex>
		</Flex>
	);
};

export default Watchlist;
