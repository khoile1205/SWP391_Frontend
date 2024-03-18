import React from "react";
import { Card, Table, Button, Image, Row, Col, Input, Space, Flex, Select } from "antd";
import { Recipe } from "@/models/recipe.model";
// import { useNavigate } from "react-router-dom";
import { CloseOutlined, SearchOutlined } from "@ant-design/icons";
import AppColor from "@/utils/appColor";
import { useGetBookingChef } from "@/hooks/booking";

interface Props {
	changeStep: (step: number) => void;
	setChef: (data: any) => void;
}

type SearchType = "chef" | "recipe";

const ChefBooking: React.FC<Props> = ({ changeStep, setChef }) => {
	const [visibleChefs, setVisibleChefs] = React.useState(3);
	const [searchTerm, setSearchTerm] = React.useState("");
	const [searchType, setSearchType] = React.useState<SearchType>("chef");

	// const navigate = useNavigate();

	const { chefs } = useGetBookingChef();

	const filteredChefs = React.useMemo(() => {
		return chefs.filter((chef) => {
			const searchTextLower = searchTerm.toLowerCase();
			if (searchType === "chef") {
				return chef.userName.toLowerCase().includes(searchTextLower);
			} else {
				return chef.recipes.some((recipe) => recipe.title.toLowerCase().includes(searchTextLower));
			}
		});
	}, [chefs, searchTerm, searchType]);

	const loadMoreChefs = () => {
		setVisibleChefs((prevVisibleChefs) => prevVisibleChefs + 3);
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
										<SearchOutlined></SearchOutlined>
									</Flex>
								}
								className="w-full rounded-lg border border-gray-300 px-4 py-1 text-[16px] outline-none"
								onChange={(event) => setSearchTerm(event.target.value)}
							/>
						</div>
					</Col>
				</Flex>
			</div>

			{(searchTerm ? filteredChefs : chefs).map((chef) => (
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
					<Row justify="space-between" style={{ alignItems: "center", maxWidth: "300px" }}>
						{chef.avatarURL && (
							<Image
								src={chef.avatarURL}
								style={{ width: "70px", height: "70px", borderRadius: "50%", marginRight: "10px" }}
							/>
						)}
						<div style={{ display: "flex", flexDirection: "column" }}>
							<h2 style={{ fontSize: "18px", fontWeight: "bold" }}>{chef.userName}</h2>
							<span style={{ fontSize: "12px", color: "#ccc" }}>
								{chef.followerCount} followers
							</span>
						</div>
						<Button
							type="primary"
							style={{ backgroundColor: AppColor.deepOrangeColor, color: "white" }}
							onClick={() => {
								changeStep(2);
								setChef(chef.id);
							}}
						>
							View Details
						</Button>
					</Row>
					<Table dataSource={chef.recipes} pagination={false}>
						<Table.Column
							title="Recipe Name"
							dataIndex="title"
							key="title"
							render={(record: Recipe) => (
								<Space direction="vertical">
									<span style={{ fontWeight: "bold" }}>{"title"}</span>
									<span style={{ fontSize: "12px", color: "#999" }}>{"text 50 chars"}</span>
									<Space
										direction="horizontal"
										style={{ fontSize: "12px", marginTop: "5px", color: "#999" }}
									>
										<span>Serves: {record.portion || "-"}</span>
										<span style={{ marginLeft: "10px" }}>Price: ${record.bookingPrice || "-"}</span>
									</Space>
								</Space>
							)}
						/>
						<Table.Column
							title="Image"
							dataIndex="thumbnailUrl"
							key="thumbnailUrl"
							render={(record: Recipe) => (
								<Image
									src={record.thumbnailUrl || "https://via.placeholder.com/150x100"}
									alt={record.title}
									style={{ width: "100%", height: "80px", objectFit: "cover" }}
								/>
							)}
						/>
					</Table>
				</Card>
			))}
			{visibleChefs < filteredChefs.length && (
				<div style={{ textAlign: "center", marginTop: "20px" }}>
					<Button
						type="primary"
						onClick={loadMoreChefs}
						style={{ backgroundColor: AppColor.deepOrangeColor, color: "white" }}
					>
						Load More Chefs
					</Button>
				</div>
			)}
		</div>
	);
};

export default ChefBooking;
