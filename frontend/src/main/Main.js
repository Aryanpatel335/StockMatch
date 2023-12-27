import { Flex, useColorModeValue } from "@chakra-ui/react";
import StockCard from "./StockCard";
import { useEffect, useRef, useState } from "react";
import NavBar from "../common/nav/NavBar";
import { useSelector } from "react-redux";
import { userIdSelector, userLoginStatusSelector } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

const Main = () => {
	const [stocks, setStocks] = useState([]);
	const [currentStock, setCurrentStock] = useState(0);
	const [userProfile, setUserProfile] = useState(
		localStorage.getItem("profile")
	);
	const [candleInfo, setCandleInfo] = useState([]);
	const [companyNews, setCompanyNews] = useState([]);

	const loginStatus = useSelector(userLoginStatusSelector);
	const userId = useSelector(userIdSelector);
	const navigate = useNavigate();

	useEffect(() => {
		if (!loginStatus) {
			navigate("/");
		}
	});

	useEffect(() => {
		if (stocks.length > 0) {
			let currentTicker = stocks[currentStock].ticker;
			getCandleInfo(currentTicker);
			getCompanyNews(currentTicker);
		}
	}, [stocks, currentStock]);

	const isMounted = useRef(true);

	useEffect(() => {
		if (isMounted.current) {
			fetchRecommendations();
			isMounted.current = false;
		}
	}, []);

	useEffect(() => {
		getStockView();
		return () => {
			console.log("unmounted");
			updateStockView();
		};
	}, []);

	const fetchRecommendations = () => {
		try {
			fetch(`/users/${userId}/stocks/recommendations?page=0`, {
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
					console.log(body);
					if (body !== null) {
						setStocks(body.content);
					}
				});
		} catch (error) {
			console.log(error);
		}
	};

	const getStockView = () => {
		const current = userProfile.currentStockView;
		setCurrentStock(!current ? 0 : current);
	};

	const updateStockView = () => {
		try {
			fetch(`/users/${userId}/userStockView?lastStockView=${currentStock}`, {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
			})
				.then((res) => {
					if (!res.ok) {
						throw new Error(`${res.status} ${res.statusText}`);
					}
				})
				.then(() => {
					setUserProfile((oldProfile) => {
						return { ...oldProfile, currentStockView: currentStock };
					});
				});
		} catch (error) {
			console.log(error);
		}
	};

	const getCandleInfo = (ticker) => {
		try {
			fetch(`/stockCandles/getStockCandles/${ticker}`, {
				method: "GET",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
			})
				.then((res) => {
					if (!res.ok) {
						setCandleInfo([]);
						throw new Error(`${res.status} ${res.statusText}`);
					}
					return res.json();
				})
				.then((body) => {
					console.log("candleInfo");
					console.log(body);
					setCandleInfo(body);
				});
		} catch (error) {
			console.log(error);
		}
	};

	const getCompanyNews = (ticker) => {
		try {
			fetch(`/companyNews/getCompanyNews?ticker=${ticker}`, {
				method: "GET",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
			})
				.then((res) => {
					if (!res.ok) {
						setCompanyNews([]);
						throw new Error(`${res.status} ${res.statusText}`);
					}
					return res.json();
				})
				.then((body) => {
					console.log("companyNews");
					console.log(body);
					setCompanyNews(body);
				});
		} catch (error) {
			console.log(error);
		}
	};

	const nextCompany = () => {
		if (currentStock === stocks.length - 1) {
			setCurrentStock(0);
		} else {
			setCurrentStock((currentIndex) => currentIndex + 1);
		}
	};

	const addToWatchlist = () => {
		const body = {
			subID: userId,
			ticker: stocks[currentStock].ticker,
			action: "like",
		};
		try {
			fetch(`/watchlists/addStockToWatchList`, {
				method: "POST",
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
				.then(() => {
					nextCompany();
				});
		} catch (error) {
			console.log(error);
		}
	};

	const stockRejected = () => {
		nextCompany();
	};

	const stockAdded = () => {
		addToWatchlist();
	};

	return (
		<Flex h={"100vh"} flexDirection={"column"}>
			<NavBar />
			<Flex
				bg={useColorModeValue("gray.100", "gray.900")}
				flexDirection={"column"}
				flexGrow={"1"}
			>
				{" "}
				{stocks?.length > 0 ? (
					<StockCard
						currentStock={stocks[currentStock]}
						stockRejected={stockRejected}
						stockAdded={stockAdded}
						candleInfo={candleInfo}
						companyNews={companyNews}
					/>
				) : (
					<div>Loading...</div>
				)}
			</Flex>
		</Flex>
	);
};

export default Main;
