import React, { useState } from "react";
import { Card, Table, Button, Image, Row, Col, Input, Space } from "antd";
import PastaImage from "@/assets/Icon/pasta.jpg";
import { Recipe } from "@/models/recipe.model";
import { useNavigate } from "react-router-dom";

const getFollowerCount = (): number => {
	return Math.floor(Math.random() * 10000);
};

const chefs = [
	{
		id: "1",
		userName: "Chef A",
		avatarURL: PastaImage,
		recipes: [
			{
				id: "1",
				title: "Spaghetti Carbonara",
				description: "Delicious pasta dish with bacon, eggs, and cheese.",
				thumbnailUrl: PastaImage,
			},
			{
				id: "2",
				title: "Grilled Salmon",
				description: "Tender grilled salmon with a flavorful marinade.",
				thumbnailUrl: PastaImage,
			},
			{
				id: "3",
				title: "Tiramisu",
				description:
					"Classic Italian dessert made with layers of coffee-soaked ladyfingers and mascarpone cheese.",
				thumbnailUrl: PastaImage,
			},
		],
		followerCount: getFollowerCount(),
	},
	{
		id: "2",
		userName: "Chef B",
		avatarURL: PastaImage,
		recipes: [
			{
				id: "4",
				title: "Chicken Alfredo",
				description: "Creamy pasta dish with grilled chicken and parmesan cheese.",
				thumbnailUrl: PastaImage,
			},
			{
				id: "5",
				title: "Beef Wellington",
				description:
					"Classic Italian dessert made with layers of coffee-soaked ladyfingers and mascarpone cheese.",
				thumbnailUrl: PastaImage,
			},
		],
		followerCount: getFollowerCount(),
	},
	{
		id: "3",
		userName: "Chef C",
		avatarURL: PastaImage,
		recipes: [
			{
				id: "6",
				title: "Margherita Pizza",
				description: "Traditional Italian pizza topped with tomatoes, mozzarella, and basil.",
				thumbnailUrl: PastaImage,
			},
			{
				id: "7",
				title: "Risotto",
				description:
					"Creamy Italian rice dish cooked with broth until it reaches a smooth consistency.",
				thumbnailUrl: PastaImage,
			},
		],
		followerCount: getFollowerCount(),
	},
	{
		id: "4",
		userName: "Chef D",
		avatarURL: "https://example.com/avatarD.jpg",
		recipes: [
			{
				id: "8",
				title: "Lasagna",
				description: "Classic Italian pasta dish made with layers of pasta, meat, and cheese.",
				thumbnailUrl: PastaImage,
			},
			{
				id: "9",
				title: "Caprese Salad",
				description:
					"Simple Italian salad made with fresh tomatoes, mozzarella, basil, and olive oil.",
				thumbnailUrl: PastaImage,
			},
		],
		followerCount: getFollowerCount(),
	},
	{
		id: "5",
		userName: "Chef E",
		avatarURL: PastaImage,
		recipes: [
			{
				id: "10",
				title: "Panna Cotta",
				description: "Delicate Italian dessert made with sweetened cream and gelatin.",
				thumbnailUrl: PastaImage,
			},
			{
				id: "11",
				title: "Bruschetta",
				description:
					"Italian appetizer consisting of grilled bread topped with tomatoes, basil, and garlic.",
				thumbnailUrl: PastaImage,
			},
		],
		followerCount: getFollowerCount(),
	},
];

const ChefBooking: React.FC = () => {
	const [visibleChefs, setVisibleChefs] = useState(3);
	const [searchTerm, setSearchTerm] = useState("");
	const [searchType, setSearchType] = useState<"chef" | "recipe">("chef");
	const navigate = useNavigate();
	const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.target.value);
	};

	const filteredChefs = chefs.filter((chef) => {
		const searchTextLower = searchTerm.toLowerCase();
		if (searchType === "chef") {
			return chef.userName.toLowerCase().includes(searchTextLower);
		} else {
			return chef.recipes.some((recipe) => recipe.title.toLowerCase().includes(searchTextLower));
		}
	});

	const loadMoreChefs = () => {
		setVisibleChefs((prevVisibleChefs) => prevVisibleChefs + 3);
	};

	const updatePlaceholder = () => {
		const newPlaceholder = searchType === "chef" ? "Search by Chef Name" : "Search by Recipe Name";
		return newPlaceholder;
	};
	const handleViewDetails = (chefId: string) => {
		const chef = chefs.find((chef) => chef.id === chefId);
		navigate("/booking-cart", { state: { chef } });
	};
	return (
		<div style={{ backgroundColor: "#f5f5f5", padding: "20px" }}>
			<Row justify="space-between" style={{ marginBottom: "20px" }}>
				<Col span={16}>
					<div style={{ display: "flex", alignItems: "center" }}>
						<Input.Search
							placeholder={updatePlaceholder()}
							value={searchTerm}
							onChange={handleSearch}
							style={{
								width: "100%",
								height: "50px",
								padding: "10px 15px",
								borderRadius: "5px",
								border: "1px solid #ddd",
								fontSize: "16px",
								outline: "none",
							}}
						/>
						<Button
							size="small"
							type="text"
							style={{ marginLeft: "5px", color: "#ddd" }}
							onClick={() => setSearchTerm("")}
						>
							<span>x</span>
						</Button>
					</div>
				</Col>
				<Col span={8}>
					<Button
						style={{
							backgroundColor: "orange",
							color: "white",
							width: "120px",
							marginBottom: "20px",
						}}
						type="primary"
						onClick={() => setSearchType(searchType === "chef" ? "recipe" : "chef")}
					>
						{searchType === "chef" ? "Search Recipes" : "Search Chefs"}
					</Button>
				</Col>
			</Row>
			{filteredChefs.slice(0, visibleChefs).map((chef) => (
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
							style={{ backgroundColor: "orange", color: "white" }}
							onClick={() => handleViewDetails(chef.id)}
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
        <span style={{ fontWeight: "bold" }}>{record.title}</span>
        <span style={{ fontSize: "12px", color: "#999" }}>
          {record.description.slice(0, 50) + "..."}
        </span>
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
						style={{ backgroundColor: "orange", color: "white" }}
					>
						Load More Chefs
					</Button>
				</div>
			)}
		</div>
	);
};

export default ChefBooking;
