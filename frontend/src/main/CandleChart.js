import CanvasJSReact from "@canvasjs/react-charts";
import { Box, Flex } from "@chakra-ui/react";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { mockCandles } from "../common/mockData";
import "./CandleChart.css";

const CandleChart = ({ candleInfo }) => {
	const [candles, setCandles] = useState(mockCandles);

	useEffect(() => {
		if (candleInfo.length > 0) {
			setCandles(candleInfo);
		} else {
			setCandles(mockCandles);
		}
	}, [candleInfo]);

	const CanvasJSChart = CanvasJSReact.CanvasJSChart;
	const chartRef = useRef();

	const dataPoints = candles.map((dataPoint) => {
		return {
			x: moment(dataPoint.uniqueCandleTimestamp).valueOf(),
			y: [dataPoint.open, dataPoint.high, dataPoint.low, dataPoint.close],
		};
	});

	const ticker = candles[0].ticker;

	const options = {
		exportEnabled: false,
		theme: "light2",
		axisX: {
			valueFormatString: "D MMM",
			labelFormatter: function () {
				return " ";
			},
		},
		axisY: {
			prefix: "$",
		},
		data: [
			{
				type: "candlestick",
				name: `${ticker} Price`,
				showInLegend: false,
				yValueFormatString: "$##0.00",
				xValueType: "dateTime",
				dataPoints: dataPoints,
			},
		],
	};

	return (
		<Flex w={"100%"} h={"246px"} className="candlechart-flex">
			{candleInfo.length === 0 && (
				<Box
					position="absolute"
					top="140px"
					left="0"
					right="0"
					bottom="0"
					backgroundColor="rgba(255, 255, 255, 0.7)"
					display="flex"
					alignItems="center"
					justifyContent="center"
					zIndex={1}
				>
					<span>No data available</span>
				</Box>
			)}
			<CanvasJSChart
				className="candlechart-canvasjschart"
				height={246}
				options={options}
				onRef={(ref) => (chartRef.current = ref)}
			/>
		</Flex>
	);
};

export default CandleChart;
