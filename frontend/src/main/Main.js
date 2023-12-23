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

	const loginStatus = useSelector(userLoginStatusSelector);
	const userId = useSelector(userIdSelector);
	const navigate = useNavigate();

	useEffect(() => {
		if (!loginStatus) {
			navigate("/");
		}
	});

	useEffect(() => {
		console.log("stocks");
		console.log(stocks);
	}, [stocks]);

	useEffect(() => {
		console.log("currentStock");
		console.log(currentStock);
	}, [currentStock]);

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
				.then((res) => res.json())
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
			}).then(() => {
				setUserProfile((oldProfile) => {
					return { ...oldProfile, currentStockView: currentStock };
				});
			});
		} catch (error) {
			console.log(error);
		}
	};

	const nextCompany = () => {
		console.log("nextCompany called");
		if (currentStock === stocks.length - 1) {
			console.log("a");
			setCurrentStock(0);
		} else {
			console.log("b");
			setCurrentStock((currentIndex) => currentIndex + 1);
		}
	};

	const stockRejected = () => {
		nextCompany();
	};

	const stockAdded = () => {
		nextCompany();
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
					/>
				) : (
					<div>Loading...</div>
				)}
			</Flex>
		</Flex>
	);
};

export default Main;
