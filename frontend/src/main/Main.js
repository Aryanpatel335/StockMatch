import { Flex, useColorModeValue } from "@chakra-ui/react";
import StockCard from "./StockCard";
import { useEffect, useRef, useState } from "react";
import NavBar from "../common/nav/NavBar";
import { useSelector } from "react-redux";
import { userIdSelector, userLoginStatusSelector } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

const Main = () => {
	const [stocks, setStocks] = useState([]);
	const [currentStock, setCurrentStock] = useState(
		parseInt(localStorage.getItem("currentStockIndex"))
	);
	const [candleInfo, setCandleInfo] = useState([]);
	const [companyNews, setCompanyNews] = useState([]);

	const loginStatus = useSelector(userLoginStatusSelector);
	const userId = useSelector(userIdSelector);
	const navigate = useNavigate();

	const [stockLoading, setStockLoading] = useState(true);
	const [candlesLoading, setCandlesLoading] = useState(true);
	const [newsLoading, setNewsLoading] = useState(true);

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
		updateStockView();
	}, [currentStock]);

	const fetchRecommendations = () => {
		setStockLoading(true);
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
					if (body !== null) {
						setStocks(body.content);
					}
				})
				.finally(() => {
					setStockLoading(false);
				});
		} catch (error) {
			console.log(error);
		}
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
					localStorage.setItem(
						"currentStockIndex",
						JSON.stringify(currentStock)
					);
				});
		} catch (error) {
			console.log(error);
		}
	};

	const getCandleInfo = (ticker) => {
		setCandlesLoading(true);
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
					setCandleInfo(body);
				})
				.finally(() => {
					setCandlesLoading(false);
				});
		} catch (error) {
			console.log(error);
		}
	};

	const getCompanyNews = (ticker) => {
		setNewsLoading(true);
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
					setCompanyNews(body);
				})
				.finally(() => {
					setNewsLoading(false);
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
				<StockCard
					currentStock={stocks[currentStock]}
					stockRejected={stockRejected}
					stockAdded={stockAdded}
					candleInfo={candleInfo}
					companyNews={companyNews}
					stockLoading={stockLoading}
					candlesLoading={candlesLoading}
					newsLoading={newsLoading}
				/>
			</Flex>
		</Flex>
	);
};

export default Main;
