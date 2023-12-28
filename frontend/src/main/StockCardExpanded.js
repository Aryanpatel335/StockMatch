import { LinkIcon } from "@chakra-ui/icons";
import {
	Stack,
	Flex,
	Image,
	Heading,
	Divider,
	Text,
	Link,
	Skeleton,
} from "@chakra-ui/react";
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
				{!props.newsLoading ? (
					companyNews.slice(0, 3).map((article) => (
						<Flex flexDirection={"row"} alignItems={"center"} key={article.id}>
							{article.imageUrl !== "" ? (
								<Image
									boxSize={"40px"}
									objectFit={"cover"}
									src={article.imageUrl}
									alt="News article"
									mr={"0.5em"}
									borderRadius={"25%"}
								/>
							) : (
								<LinkIcon w={"40px"} mr={"0.5em"} />
							)}

							<Flex flexDirection={"column"}>
								<Link href={article.newsUrl} isExternal>
									<Heading
										as={"h4"}
										fontSize={"sm"}
										color={"blue.700"}
										textDecoration={"underline"}
									>
										{article.headline}
									</Heading>
								</Link>
								<Text fontSize={"xs"}>
									{moment(article.datetime).format("llll")}
								</Text>
							</Flex>
						</Flex>
					))
				) : (
					<Flex flexDirection={"column"} alignItems={"center"} gap={"0.5rem"}>
						<Skeleton height={"55px"} width={"100%"} />
						<Skeleton height={"55px"} width={"100%"} />
						<Skeleton height={"55px"} width={"100%"} />
					</Flex>
				)}
			</Stack>
		</Stack>
	);
};

export default StockCardExpanded;
