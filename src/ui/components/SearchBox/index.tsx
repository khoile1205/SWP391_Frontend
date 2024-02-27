import React, { useState } from "react";
import { Select, Input, Button, Flex, Modal, Typography } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import AppColor from "@/utils/appColor";

interface SearchBoxProps {
	open: boolean;
	setOpen: (open: boolean) => void;
}
const SearchBox: React.FC<SearchBoxProps> = ({ open, setOpen }) => {
	const [searchType, setSearchType] = useState<string>("all");
	const [searchTerm, setSearchTerm] = useState<string>("");

	return (
		<Modal
			title={
				<Typography.Title level={3} className="text-center">
					Search
				</Typography.Title>
			}
			open={open}
			onCancel={() => setOpen(false)}
			width={800}
			footer={null}
		>
			<Flex align="center" className="w-full space-x-3 text-center">
				<Select
					className=" w-1/2 text-center sm:w-1/3"
					defaultValue="All"
					style={{ height: "40px" }}
					onChange={(value: string) => {
						setSearchType(value);
					}}
					options={[
						{ value: "all", label: "All" },
						{ value: "recipes", label: "Recipes" },
						{ value: "user", label: "User" },
					]}
				/>
				<Input
					prefix={<SearchOutlined></SearchOutlined>}
					onChange={(event) => {
						setSearchTerm(event.target.value);
					}}
					suffix={
						<Button
							style={{
								backgroundColor: AppColor.deepOrangeColor,
							}}
							className=" !text-white"
						>
							<a href={`/search/${searchType}?q=${searchTerm}`}>Find</a>
						</Button>
					}
					placeholder="Your recipes"
				></Input>
			</Flex>
		</Modal>
	);
};

export default SearchBox;
