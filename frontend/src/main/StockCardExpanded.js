import { Stack, Flex, Image, Heading, Divider, Text } from "@chakra-ui/react";
import moment from "moment";

const StockCardExpanded = (props) => {
	const { companyNews } = props;
	return (
		<Stack direction={"column"} w={"100%"}>
			<Stack direction={"column"} w={"100%"}>
				<Divider w={"100%"} />
				<Heading as="h3" fontSize="md">
					Relevant News
				</Heading>
				{companyNews.map((article) => (
					<Flex flexDirection={"row"} alignItems={"center"} key={article.id}>
						<Image
							boxSize={"40px"}
							objectFit={"cover"}
							src={article.image}
							alt="News article"
							mr={"0.5em"}
							borderRadius={"25%"}
						/>
						<Flex flexDirection={"column"}>
							<a href={article.url} rel="noreferrer" target="_blank">
								<Heading
									as={"h4"}
									fontSize={"sm"}
									color={"blue.700"}
									textDecoration={"underline"}
								>
									{article.headline}
								</Heading>
							</a>
							<Text fontSize={"xs"}>
								{moment(article.datetime * 1000).format("LL")}
							</Text>
						</Flex>
					</Flex>
				))}
			</Stack>
		</Stack>
	);
};

export default StockCardExpanded;
