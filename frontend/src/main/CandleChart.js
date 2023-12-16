import CanvasJSReact from "@canvasjs/react-charts";
import { Flex } from "@chakra-ui/react";
import moment from "moment";
import { useRef } from "react";

const CandleChart = () => {
	const mockCandles = [
		{
			id: "797b13e5-40ac-40c8-aa32-87beb9e353a2",
			stock: null,
			ticker: "GOOG",
			uniqueCandleTimestamp: "2023-10-23T04:00:00Z",
			open: 136.23,
			high: 139.02,
			low: 135.11,
			close: 137.9,
			volume: 20780700,
		},
		{
			id: "7b888ff1-8646-4c8b-b423-a28f362777df",
			stock: null,
			ticker: "GOOG",
			uniqueCandleTimestamp: "2023-10-24T04:00:00Z",
			open: 139.16,
			high: 140.71,
			low: 138.75,
			close: 140.12,
			volume: 26535200,
		},
		{
			id: "768ecde7-cc60-45d1-a6af-34e93fd65059",
			stock: null,
			ticker: "GOOG",
			uniqueCandleTimestamp: "2023-10-25T04:00:00Z",
			open: 129.77,
			high: 130.1,
			low: 126.09,
			close: 126.67,
			volume: 58796100,
		},
		{
			id: "97048166-0548-4dfa-8794-28e90731547e",
			stock: null,
			ticker: "GOOG",
			uniqueCandleTimestamp: "2023-10-26T04:00:00Z",
			open: 124.47,
			high: 125.46,
			low: 122.32,
			close: 123.44,
			volume: 33907400,
		},
		{
			id: "4d95efe2-0df3-45a4-bca8-c981f9a9ebe9",
			stock: null,
			ticker: "GOOG",
			uniqueCandleTimestamp: "2023-10-27T04:00:00Z",
			open: 124.03,
			high: 124.44,
			low: 121.46,
			close: 123.4,
			volume: 37367700,
		},
		{
			id: "edf5427b-1c4d-4ae6-98ca-0f300a6f8545",
			stock: null,
			ticker: "GOOG",
			uniqueCandleTimestamp: "2023-10-30T04:00:00Z",
			open: 124.46,
			high: 126.55,
			low: 123.88,
			close: 125.75,
			volume: 24165600,
		},
		{
			id: "cfe6f772-e821-412f-871a-c66c992c1895",
			stock: null,
			ticker: "GOOG",
			uniqueCandleTimestamp: "2023-10-31T04:00:00Z",
			open: 126.27,
			high: 126.56,
			low: 123.93,
			close: 125.3,
			volume: 21123400,
		},
		{
			id: "d87aee6f-7931-4892-92ca-608a2a76cc40",
			stock: null,
			ticker: "GOOG",
			uniqueCandleTimestamp: "2023-11-01T04:00:00Z",
			open: 125.34,
			high: 127.74,
			low: 124.93,
			close: 127.57,
			volume: 26536600,
		},
		{
			id: "b4333b7f-79a6-4868-9dea-3c8f3c2d80f1",
			stock: null,
			ticker: "GOOG",
			uniqueCandleTimestamp: "2023-11-02T04:00:00Z",
			open: 129.56,
			high: 130.09,
			low: 128.11,
			close: 128.58,
			volume: 24091700,
		},
		{
			id: "19a8c4b7-ecc1-4a3d-8be8-8f91ede6d370",
			stock: null,
			ticker: "GOOG",
			uniqueCandleTimestamp: "2023-11-03T04:00:00Z",
			open: 129.09,
			high: 130.73,
			low: 129.01,
			close: 130.37,
			volume: 19517900,
		},
		{
			id: "7f5f1521-807f-49d0-a188-1b52f67e10f9",
			stock: null,
			ticker: "GOOG",
			uniqueCandleTimestamp: "2023-11-06T05:00:00Z",
			open: 130.22,
			high: 131.56,
			low: 129.93,
			close: 131.45,
			volume: 15360400,
		},
		{
			id: "cb6840a7-c7ce-472a-a0e1-9772950d8496",
			stock: null,
			ticker: "GOOG",
			uniqueCandleTimestamp: "2023-11-07T05:00:00Z",
			open: 131.98,
			high: 133.28,
			low: 131.14,
			close: 132.4,
			volume: 19223800,
		},
		{
			id: "c5b53d7e-06c8-46c7-b6a1-8c6a8e5e49d0",
			stock: null,
			ticker: "GOOG",
			uniqueCandleTimestamp: "2023-11-08T05:00:00Z",
			open: 132.36,
			high: 133.54,
			low: 132.16,
			close: 133.26,
			volume: 15093600,
		},
		{
			id: "99a37e4e-0bd4-4fde-a7b9-7f58b489651c",
			stock: null,
			ticker: "GOOG",
			uniqueCandleTimestamp: "2023-11-09T05:00:00Z",
			open: 133.36,
			high: 133.96,
			low: 131.51,
			close: 131.69,
			volume: 17976500,
		},
		{
			id: "d7a9c600-641e-4c75-8b08-1ed87964323d",
			stock: null,
			ticker: "GOOG",
			uniqueCandleTimestamp: "2023-11-10T05:00:00Z",
			open: 131.53,
			high: 134.27,
			low: 130.87,
			close: 134.06,
			volume: 20872900,
		},
		{
			id: "4b9bfa4e-ebaa-4687-a729-2ec7735f93c7",
			stock: null,
			ticker: "GOOG",
			uniqueCandleTimestamp: "2023-11-13T05:00:00Z",
			open: 133.36,
			high: 134.11,
			low: 132.77,
			close: 133.64,
			volume: 16409900,
		},
		{
			id: "37409d71-5b49-43ef-889d-ffb366db645a",
			stock: null,
			ticker: "GOOG",
			uniqueCandleTimestamp: "2023-11-14T05:00:00Z",
			open: 135.65,
			high: 137.24,
			low: 135.1,
			close: 135.43,
			volume: 22317300,
		},
		{
			id: "caf840d8-2cba-4ccb-9a46-74f4c07af51b",
			stock: null,
			ticker: "GOOG",
			uniqueCandleTimestamp: "2023-11-15T05:00:00Z",
			open: 136.64,
			high: 136.84,
			low: 135.33,
			close: 136.38,
			volume: 15840900,
		},
		{
			id: "5affc947-0633-4632-b4e8-112bc8664f2e",
			stock: null,
			ticker: "GOOG",
			uniqueCandleTimestamp: "2023-11-16T05:00:00Z",
			open: 136.96,
			high: 138.88,
			low: 136.08,
			close: 138.7,
			volume: 17615100,
		},
		{
			id: "09ff0626-787f-4822-87df-be6fe64c6d98",
			stock: null,
			ticker: "GOOG",
			uniqueCandleTimestamp: "2023-11-17T05:00:00Z",
			open: 137.82,
			high: 138,
			low: 135.48,
			close: 136.94,
			volume: 25565300,
		},
		{
			id: "47847c43-45bb-4e29-9ac8-861188c65cb4",
			stock: null,
			ticker: "GOOG",
			uniqueCandleTimestamp: "2023-11-20T05:00:00Z",
			open: 135.5,
			high: 138.43,
			low: 135.49,
			close: 137.92,
			volume: 19569400,
		},
	];

	const CanvasJSChart = CanvasJSReact.CanvasJSChart;
	const chartRef = useRef();

	const dataPoints = mockCandles.map((dataPoint) => {
		return {
			x: moment(dataPoint.uniqueCandleTimestamp).valueOf(),
			y: [dataPoint.open, dataPoint.high, dataPoint.low, dataPoint.close],
		};
	});

	const ticker = mockCandles[0].ticker;

	const options = {
		exportEnabled: false,
		axisX: {
			valueFormatString: "D MMM",
		},
		axisY: {
			title: "Price",
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
		<Flex width={"100%"}>
			<CanvasJSChart
				options={options}
				onRef={(ref) => (chartRef.current = ref)}
			/>
		</Flex>
	);
};

export default CandleChart;
