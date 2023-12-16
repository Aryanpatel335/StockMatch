import { Flex, useColorModeValue } from "@chakra-ui/react";
import StockCard from "./StockCard";
import { useEffect, useState } from "react";
import NavBar from "../common/nav/NavBar";
import { useSelector } from "react-redux";
import { userIdSelector, userLoginStatusSelector } from "../store/authSlice";

const Main = () => {
	const mockCompanies = [
		{
			fullName: "Apple Inc",
			ticker: "AAPL",
			exchange: "NASDAQ",
			companyLogo:
				"https://static.finnhub.io/logo/87cb30d8-80df-11ea-8951-00000000092a.png",
			attributes: [
				{ type: "Low Risk", detail: "" },
				{ type: "Established", detail: "" },
				{ type: "Large Company", detail: "" },
				{ type: "Sector", detail: "Technology" },
				{ type: "Analyst Score", detail: "Buy" },
			],
			weburl: "https://www.apple.com/",
			companyNews: [
				{
					category: "company news",
					datetime: 1569550360,
					headline:
						"More sops needed to boost electronic manufacturing: Top govt official",
					id: 25286,
					image:
						"https://img.etimg.com/thumb/msid-71321314,width-1070,height-580,imgsize-481831,overlay-economictimes/photo.jpg",
					related: "AAPL",
					source: "The Economic Times India",
					summary:
						"NEW DELHI | CHENNAI: India may have to offer electronic manufacturers additional sops such as cheap credit and incentives for export along with infrastructure support in order to boost production and help the sector compete with China, Vietnam and Thailand, according to a top government official.These incentives, over and above the proposed reduction of corporate tax to 15% for new manufacturing units, are vital for India to successfully attract companies looking to relocate manufacturing facilities.“While the tax announcements made last week send a very good signal, in order to help attract investments, we will need additional initiatives,” the official told ET, pointing out that Indian electronic manufacturers incur 8-10% higher costs compared with other Asian countries.Sops that are similar to the incentives for export under the existing Merchandise Exports from India Scheme (MEIS) are what the industry requires, the person said.MEIS gives tax credit in the range of 2-5%. An interest subvention scheme for cheaper loans and a credit guarantee scheme for plant and machinery are some other possible measures that will help the industry, the official added.“This should be 2.0 (second) version of the electronic manufacturing cluster (EMC) scheme, which is aimed at creating an ecosystem with an anchor company plus its suppliers to operate in the same area,” he said.Last week, finance minister Nirmala Sitharaman announced a series of measures to boost economic growth including a scheme allowing any new manufacturing company incorporated on or after October 1, to pay income tax at 15% provided the company does not avail of any other exemption or incentives.",
					url: "https://economictimes.indiatimes.com/industry/cons-products/electronics/more-sops-needed-to-boost-electronic-manufacturing-top-govt-official/articleshow/71321308.cms",
				},
				{
					category: "company news",
					datetime: 1569528720,
					headline:
						"How to disable comments on your YouTube videos in 2 different ways",
					id: 25287,
					image:
						"https://amp.businessinsider.com/images/5d8d16182e22af6ab66c09e9-1536-768.jpg",
					related: "AAPL",
					source: "Business Insider",
					summary:
						"You can disable comments on your own YouTube video if you don't want people to comment on it. It's easy to disable comments on YouTube by adjusting the settings for one of your videos in the beta or classic version of YouTube Studio. Visit Business Insider's homepage for more stories . The comments section has a somewhat complicated reputation for creators, especially for those making videos on YouTube . While it can be useful to get the unfiltered opinions of your YouTube viewers and possibly forge a closer connection with them, it can also open you up to quite a bit of negativity. So it makes sense that there may be times when you want to turn off the feature entirely. Just keep in mind that the action itself can spark conversation. If you decide that you don't want to let people leave comments on your YouTube video, here's how to turn off the feature, using either the classic or beta version of the creator studio: How to disable comments on YouTube in YouTube Studio (beta) 1. Go to youtube.com and log into your account, if necessary. 2.",
					url: "https://www.businessinsider.com/how-to-disable-comments-on-youtube",
				},
				{
					category: "company news",
					datetime: 1569526180,
					headline:
						"Apple iPhone 11 Pro Teardowns Look Encouraging for STMicro and Sony",
					id: 25341,
					image:
						"http://s.thestreet.com/files/tsc/v2008/photos/contrib/uploads/ba140938-d409-11e9-822b-fda891ce1fc1.png",
					related: "AAPL",
					source: "TheStreet",
					summary:
						"STMicroelectronics and Sony each appear to be supplying four chips for Apple's latest flagship iPhones. Many other historical iPhone suppliers also make appearances in the latest teardowns….STM",
					url: "https://realmoney.thestreet.com/investing/technology/iphone-11-pro-teardowns-look-encouraging-for-stmicro-sony-15105767",
				},
			],
		},
		{
			fullName: "Texas Instruments Inc",
			ticker: "TXN",
			exchange: "NASDAQ",
			companyLogo:
				"https://media.zenfs.com/en/us.finance.gurufocus/46b33df5eee32f0e3f1280f21950eade",
			attributes: [
				{ type: "Low Risk", detail: "" },
				{ type: "Established", detail: "" },
				{ type: "Large Company", detail: "" },
				{ type: "Sector", detail: "Technology" },
				{ type: "Analyst Score", detail: "Buy" },
			],
			weburl: "https://www.ti.com/",
			companyNews: [
				{
					category: "company news",
					datetime: 1569550360,
					headline:
						"Texas Instruments Tops Third-Quarter Earnings Target, But Sales, Outlook Light",
					id: 25286,
					image:
						"https://upload.wikimedia.org/wikipedia/commons/2/2e/TI_signboard_Dallas.png",
					related: "TXN",
					source: "The Economic Times India",
					summary:
						"NEW DELHI | CHENNAI: India may have to offer electronic manufacturers additional sops such as cheap credit and incentives for export along with infrastructure support in order to boost production and help the sector compete with China, Vietnam and Thailand, according to a top government official.These incentives, over and above the proposed reduction of corporate tax to 15% for new manufacturing units, are vital for India to successfully attract companies looking to relocate manufacturing facilities.“While the tax announcements made last week send a very good signal, in order to help attract investments, we will need additional initiatives,” the official told ET, pointing out that Indian electronic manufacturers incur 8-10% higher costs compared with other Asian countries.Sops that are similar to the incentives for export under the existing Merchandise Exports from India Scheme (MEIS) are what the industry requires, the person said.MEIS gives tax credit in the range of 2-5%. An interest subvention scheme for cheaper loans and a credit guarantee scheme for plant and machinery are some other possible measures that will help the industry, the official added.“This should be 2.0 (second) version of the electronic manufacturing cluster (EMC) scheme, which is aimed at creating an ecosystem with an anchor company plus its suppliers to operate in the same area,” he said.Last week, finance minister Nirmala Sitharaman announced a series of measures to boost economic growth including a scheme allowing any new manufacturing company incorporated on or after October 1, to pay income tax at 15% provided the company does not avail of any other exemption or incentives.",
					url: "https://www.investors.com/news/technology/txn-stock-texas-instruments-posts-mixed-q3/",
				},
				{
					category: "company news",
					datetime: 1569528720,
					headline:
						"How to disable comments on your YouTube videos in 2 different ways",
					id: 25287,
					image:
						"https://amp.businessinsider.com/images/5d8d16182e22af6ab66c09e9-1536-768.jpg",
					related: "AAPL",
					source: "Business Insider",
					summary:
						"You can disable comments on your own YouTube video if you don't want people to comment on it. It's easy to disable comments on YouTube by adjusting the settings for one of your videos in the beta or classic version of YouTube Studio. Visit Business Insider's homepage for more stories . The comments section has a somewhat complicated reputation for creators, especially for those making videos on YouTube . While it can be useful to get the unfiltered opinions of your YouTube viewers and possibly forge a closer connection with them, it can also open you up to quite a bit of negativity. So it makes sense that there may be times when you want to turn off the feature entirely. Just keep in mind that the action itself can spark conversation. If you decide that you don't want to let people leave comments on your YouTube video, here's how to turn off the feature, using either the classic or beta version of the creator studio: How to disable comments on YouTube in YouTube Studio (beta) 1. Go to youtube.com and log into your account, if necessary. 2.",
					url: "https://www.businessinsider.com/how-to-disable-comments-on-youtube",
				},
				{
					category: "company news",
					datetime: 1569526180,
					headline:
						"Apple iPhone 11 Pro Teardowns Look Encouraging for STMicro and Sony",
					id: 25341,
					image:
						"http://s.thestreet.com/files/tsc/v2008/photos/contrib/uploads/ba140938-d409-11e9-822b-fda891ce1fc1.png",
					related: "AAPL",
					source: "TheStreet",
					summary:
						"STMicroelectronics and Sony each appear to be supplying four chips for Apple's latest flagship iPhones. Many other historical iPhone suppliers also make appearances in the latest teardowns….STM",
					url: "https://realmoney.thestreet.com/investing/technology/iphone-11-pro-teardowns-look-encouraging-for-stmicro-sony-15105767",
				},
			],
		},
		{
			fullName: "Ceridian HCM Holding Inc",
			ticker: "CDAY",
			exchange: "NYSE",
			companyLogo:
				"https://images.crunchbase.com/image/upload/c_lpad,f_auto,q_auto:eco,dpr_1/re8dcjamiepioshqsix5",
			attributes: [
				{ type: "Low Risk", detail: "" },
				{ type: "Emerging", detail: "" },
				{ type: "Small Company", detail: "" },
				{ type: "Sector", detail: "Technology" },
				{ type: "Analyst Score", detail: "Hold" },
			],
			weburl: "https://www.ceridian.com/",
			companyNews: [
				{
					category: "company news",
					datetime: 1569550360,
					headline:
						"More sops needed to boost electronic manufacturing: Top govt official",
					id: 25286,
					image:
						"https://img.etimg.com/thumb/msid-71321314,width-1070,height-580,imgsize-481831,overlay-economictimes/photo.jpg",
					related: "AAPL",
					source: "The Economic Times India",
					summary:
						"NEW DELHI | CHENNAI: India may have to offer electronic manufacturers additional sops such as cheap credit and incentives for export along with infrastructure support in order to boost production and help the sector compete with China, Vietnam and Thailand, according to a top government official.These incentives, over and above the proposed reduction of corporate tax to 15% for new manufacturing units, are vital for India to successfully attract companies looking to relocate manufacturing facilities.“While the tax announcements made last week send a very good signal, in order to help attract investments, we will need additional initiatives,” the official told ET, pointing out that Indian electronic manufacturers incur 8-10% higher costs compared with other Asian countries.Sops that are similar to the incentives for export under the existing Merchandise Exports from India Scheme (MEIS) are what the industry requires, the person said.MEIS gives tax credit in the range of 2-5%. An interest subvention scheme for cheaper loans and a credit guarantee scheme for plant and machinery are some other possible measures that will help the industry, the official added.“This should be 2.0 (second) version of the electronic manufacturing cluster (EMC) scheme, which is aimed at creating an ecosystem with an anchor company plus its suppliers to operate in the same area,” he said.Last week, finance minister Nirmala Sitharaman announced a series of measures to boost economic growth including a scheme allowing any new manufacturing company incorporated on or after October 1, to pay income tax at 15% provided the company does not avail of any other exemption or incentives.",
					url: "https://economictimes.indiatimes.com/industry/cons-products/electronics/more-sops-needed-to-boost-electronic-manufacturing-top-govt-official/articleshow/71321308.cms",
				},
				{
					category: "company news",
					datetime: 1569528720,
					headline:
						"How to disable comments on your YouTube videos in 2 different ways",
					id: 25287,
					image:
						"https://amp.businessinsider.com/images/5d8d16182e22af6ab66c09e9-1536-768.jpg",
					related: "AAPL",
					source: "Business Insider",
					summary:
						"You can disable comments on your own YouTube video if you don't want people to comment on it. It's easy to disable comments on YouTube by adjusting the settings for one of your videos in the beta or classic version of YouTube Studio. Visit Business Insider's homepage for more stories . The comments section has a somewhat complicated reputation for creators, especially for those making videos on YouTube . While it can be useful to get the unfiltered opinions of your YouTube viewers and possibly forge a closer connection with them, it can also open you up to quite a bit of negativity. So it makes sense that there may be times when you want to turn off the feature entirely. Just keep in mind that the action itself can spark conversation. If you decide that you don't want to let people leave comments on your YouTube video, here's how to turn off the feature, using either the classic or beta version of the creator studio: How to disable comments on YouTube in YouTube Studio (beta) 1. Go to youtube.com and log into your account, if necessary. 2.",
					url: "https://www.businessinsider.com/how-to-disable-comments-on-youtube",
				},
				{
					category: "company news",
					datetime: 1569526180,
					headline:
						"Apple iPhone 11 Pro Teardowns Look Encouraging for STMicro and Sony",
					id: 25341,
					image:
						"http://s.thestreet.com/files/tsc/v2008/photos/contrib/uploads/ba140938-d409-11e9-822b-fda891ce1fc1.png",
					related: "AAPL",
					source: "TheStreet",
					summary:
						"STMicroelectronics and Sony each appear to be supplying four chips for Apple's latest flagship iPhones. Many other historical iPhone suppliers also make appearances in the latest teardowns….STM",
					url: "https://realmoney.thestreet.com/investing/technology/iphone-11-pro-teardowns-look-encouraging-for-stmicro-sony-15105767",
				},
			],
		},
	];

	const [stocks, setStocks] = useState([]);
	const [currentStock, setCurrentStock] = useState(0);

	const loginStatus = useSelector(userLoginStatusSelector);
	const userId = useSelector(userIdSelector);

	// useEffect(() => {
	// 	if (!loginStatus) {
	// 		navigate("/");
	// 	}
	// });

	useEffect(() => {
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
					if (body) {
						setStocks(body.content);
					}
				});
		} catch (error) {
			console.log(error);
		}
	}, []);

	useEffect(() => {
		try {
			fetch(`/users/${userId}/users/userStockView`, {
				method: "GET",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
			})
				.then((res) => res.json())
				.then((body) => {
					if (body) {
						setCurrentStock(body.currentStockView);
					}
				});
		} catch (error) {
			console.log(error);
		}

		return () => {
			try {
				fetch(
					`/users/${userId}/users/userStockView?lastStockView=${currentStock}`,
					{
						method: "POST",
						headers: {
							Accept: "application/json",
							"Content-Type": "application/json",
						},
					}
				).then((res) => res.json());
			} catch (error) {
				console.log(error);
			}
		};
	}, []);

	const nextCompany = () => {
		if (currentStock === stocks.length - 1) {
			setCurrentStock(0);
		} else {
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
				{stocks.length > 0 && (
					<StockCard
						currentStock={stocks[currentStock]}
						stockRejected={stockRejected}
						stockAdded={stockAdded}
					/>
				)}
			</Flex>
		</Flex>
	);
};

export default Main;
