import React from "react";
import { Flex, Typography, Select } from "antd";

interface PaginationPageSizeProps {
	pageSize: number;
	setPageSize: React.Dispatch<React.SetStateAction<number>>;
	options: number[];
}

export const PaginationPageSize = ({ pageSize, setPageSize, options }: PaginationPageSizeProps) => {
	return (
		<Flex className="" align="center" justify="space-between">
			<Flex align="center" className="space-x-3">
				<Typography>Rows per page: </Typography>
				<Select
					defaultValue={pageSize}
					options={options.map((value) => ({ label: value, value }))}
					onChange={(value) => setPageSize(value)}
				></Select>
			</Flex>
		</Flex>
	);
};
