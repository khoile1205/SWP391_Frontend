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
	horizontalName: string;
	verticalName: string;
}
export const LineChartComponent: React.FC<LineChartProps> = ({
	data,
	title,
	horizontalName,
	verticalName,
}) => {
	return (
		<div className="w-full">
			<Typography.Title level={4}>{title}</Typography.Title>
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
					<Line
						type="monotone"
						dataKey="uv"
						stroke="#8884d8"
						activeDot={{ r: 8 }}
						name={horizontalName}
					/>
					<Line type="monotone" dataKey={"pv"} stroke="#82ca9d" name={verticalName} />
				</LineChart>
			</ResponsiveContainer>
		</div>
	);
};
