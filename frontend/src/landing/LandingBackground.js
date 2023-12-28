import { Box, Image } from "@chakra-ui/react";
import imgCross from "../resources/background/cross_btn.png";
import imgLike from "../resources/background/like_btn.png";
import imgChart from "../resources/background/chart_emoji.png";
import imgMoney from "../resources/background/money_bag_emoji.png";
import "./LandingBackground.css";

const LandingBackground = () => {
	return (
		<Box w={"100vw"} h={"100svh"} className="backgroundBox">
			<Image
				boxSize="95px"
				objectFit="contain"
				src={imgChart}
				alt="Chart Emoji"
				className="floating3"
				style={{ position: "relative", top: "18svh", left: "50vw" }}
			/>
			<Image
				boxSize="55px"
				objectFit="contain"
				src={imgCross}
				alt="Cross Button"
				className="floating"
				style={{ position: "relative", top: "18svh", left: "10vw" }}
			/>
			<Image
				boxSize="70px"
				objectFit="contain"
				src={imgLike}
				alt="Like Button"
				className="floating2"
				style={{ position: "relative", top: "45svh", left: "70vw" }}
			/>
			<Image
				boxSize="85px"
				objectFit="contain"
				src={imgMoney}
				alt="Money Bag Emoji"
				className="floating4"
				style={{ position: "relative", top: "28svh", left: "20vw" }}
			/>
			<Image
				boxSize="70px"
				objectFit="contain"
				src={imgChart}
				alt="Chart Emoji"
				className="floating3 hidden-on-mobile"
				style={{ position: "relative", top: "10svh", left: "6vw" }}
			/>
			<Image
				boxSize="65px"
				objectFit="contain"
				src={imgCross}
				alt="Cross Button"
				className="floating hidden-on-mobile"
				style={{ position: "relative", top: "-20svh", left: "75vw" }}
			/>
			<Image
				boxSize="90px"
				objectFit="contain"
				src={imgLike}
				alt="Like Button"
				className="floating2 hidden-on-mobile"
				style={{ position: "relative", top: "-35svh", left: "30vw" }}
			/>
			<Image
				boxSize="60px"
				objectFit="contain"
				src={imgMoney}
				alt="Money Bag Emoji"
				className="floating4 hidden-on-mobile"
				style={{ position: "relative", top: "-52svh", left: "85vw" }}
			/>
		</Box>
	);
};

export default LandingBackground;
