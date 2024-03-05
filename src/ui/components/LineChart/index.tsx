import { Typography } from "antd";
import React from "react";
import {
	LineChart,
	Tooltip,
	ResponsiveContainer,
	CartesianGrid,
	XAxis,
	YAxis,
	Line,
	Legend,
} from "recharts";

interface LineChartProps {
	data: any;
	title: string;
}
export const LineChartComponent: React.FC<LineChartProps> = ({ data, title }) => {
	return (
		<div className="w-full">
			<Typography.Title level={3}>{title}</Typography.Title>
			<ResponsiveContainer height={500}>
				<LineChart
					width={500}
					height={300}
					data={data}
					margin={{
						top: 5,
						right: 30,
						left: 20,
						bottom: 5,
					}}
				>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="name" />
					<YAxis />
					<Tooltip />
					<Legend />
					<Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
					<Line type="monotone" dataKey="uv" stroke="#82ca9d" />
				</LineChart>
			</ResponsiveContainer>
		</div>
	);
};
