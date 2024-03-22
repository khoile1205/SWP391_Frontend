import React from "react";
import { Card, Table, Button, Image, Row, Col, Input, Space, Flex, Select } from "antd";
import { Recipe } from "@/models/recipe.model";
import { CloseOutlined } from "@ant-design/icons";
import AppColor from "@/utils/appColor";
import { useGetBookingChef } from "@/hooks/booking";
import { pickRandomElements } from "@/utils/array_exts";
import Loadmore from "@/ui/components/Loadmore";
import { CreateBookingDTO } from "@/types/booking";

interface Props {
	changeStep: (step: number) => void;
	setBookingData: (data: Partial<CreateBookingDTO>) => void;
	setChefInformation: (data: any) => void;
	bookingData: CreateBookingDTO;
}

type SearchType = "chef" | "recipe";

const ChefBooking: React.FC<Props> = ({
	changeStep,
	setBookingData,
	setChefInformation,
	bookingData,
}) => {
	const [visibleChefs, setVisibleChefs] = React.useState(3);
	const [searchTerm, setSearchTerm] = React.useState("");
	const [searchType, setSearchType] = React.useState<SearchType>("chef");

	const { chefs } = useGetBookingChef();

	const [listChefs, setListChefs] = React.useState(chefs ?? []);

	React.useEffect(() => {
		setListChefs(chefs ?? []);
	}, [chefs]);

	const filteredChefs = React.useMemo(() => {
		return listChefs.filter((chef) => {
			const fullName = chef.firstName + " " + chef.lastName;

			const searchTextLower = searchTerm.toLowerCase();

			if (searchType === "chef") {
				return fullName.toLowerCase().includes(searchTextLower);
			} else {
				return chef.listRecipes.some((recipe: Recipe) =>
					recipe.title.toLowerCase().includes(searchTextLower)
				);
			}
		});
	}, [listChefs, searchTerm, searchType]);

	const loadMoreChefs = () => {
		setVisibleChefs((prevVisibleChefs) => prevVisibleChefs + 3);
	};

	const handleSelectChef = (chef: any) => {
		changeStep(2);

		if (bookingData.chefId != chef.id) {
			setBookingData({ chefId: chef.id, bookingDishes: [], total: 0 });
		}
		setChefInformation(chef);
	};
	const updatePlaceholder = React.useMemo(() => {
		const newPlaceholder = searchType === "chef" ? "Search by Chef Name" : "Search by Recipe Name";
		return newPlaceholder;
	}, [searchType]);

	return (
		<div style={{ backgroundColor: "#f5f5f5" }} className="p-3">
			<div className="text-center">
				<Flex justify="center" align={"center"} className="mb-4">
					<Col className="basis-2/3">
						<div style={{ display: "flex", alignItems: "center" }} className="space-x-3">
							<Select
								className=" w-1/2 text-center sm:w-1/6"
								defaultValue={searchType}
								style={{ height: "36px" }}
								onChange={(value: string) => {
									setSearchType(value as "chef" | "recipe");
								}}
								options={[
									{
										label: "Chef",
										value: "chef",
									},
									{
										label: "Recipe",
										value: "recipe",
									},
								]}
							></Select>
							<Input
								placeholder={updatePlaceholder}
								value={searchTerm}
								suffix={
									<Flex align="center" className="space-x-3">
										{searchTerm && <CloseOutlined onClick={() => setSearchTerm("")} />}
									</Flex>
								}
								className="w-full rounded-lg border border-gray-300 px-4 py-1 text-[16px] outline-none"
								onChange={(event) => setSearchTerm(event.target.value)}
							/>
						</div>
					</Col>
				</Flex>
			</div>

			{(searchTerm ? filteredChefs : listChefs).map((chef) => (
				<Card
					key={chef.id}
					style={{
						marginBottom: "20px",
						padding: "20px",
						backgroundColor: "white",
						borderRadius: "5px",
						boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
					}}
				>
					<Row justify="start" style={{ alignItems: "center" }} className="mb-2 space-x-4">
						<Image
							src={
								chef.avatarUrl ??
								"https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/10/free-images.jpg"
							}
							style={{ width: "70px", height: "70px", borderRadius: "50%" }}
						/>
						<div style={{ display: "flex", flexDirection: "column" }}>
							<h2 style={{ fontSize: "18px", fontWeight: "bold" }}>
								{chef.firstName + " " + chef.lastName}
							</h2>
							<span style={{ fontSize: "12px", color: "#ccc" }}>
								{chef.followerCount} followers
							</span>
						</div>
						<Button
							type="primary"
							style={{ backgroundColor: AppColor.deepOrangeColor, color: "white" }}
							onClick={() => handleSelectChef(chef)}
						>
							View Details
						</Button>
					</Row>
					<Table dataSource={pickRandomElements(chef.listRecipes, 3)} pagination={false}>
						<Table.Column
							title="Recipe Name"
							// dataIndex=""
							key="title"
							render={(record: Recipe) => (
								<Space direction="vertical" className="max-w-xl">
									<span style={{ fontWeight: "bold" }}>{record.title}</span>
									<span style={{ fontSize: "12px", color: "#999" }} className="text-truncate">
										{record.description}
									</span>
									<Space
										direction="horizontal"
										style={{ fontSize: "12px", marginTop: "5px", color: "#999" }}
									>
										<span>Serves: {record.portion || "-"}</span>
										<span style={{ marginLeft: "10px" }}>
											Price: {`${record.bookingPrice} $` || "-"}
										</span>
									</Space>
								</Space>
							)}
						/>
						<Table.Column
							title="Image"
							// dataIndex="thumbnailUrl"
							key="thumbnailUrl"
							render={(record: Recipe) => (
								<Image
									src={record.thumbnailUrl || "https://via.placeholder.com/150x100"}
									alt={record.title}
									style={{ width: "200px", height: "80px", objectFit: "cover" }}
									className="object-cover"
								/>
							)}
						/>
					</Table>
				</Card>
			))}
			{visibleChefs < filteredChefs.length && (
				<div style={{ textAlign: "center" }}>
					<Loadmore onClick={loadMoreChefs} title="Load More Chefs"></Loadmore>
				</div>
			)}
		</div>
	);
};

export default ChefBooking;
