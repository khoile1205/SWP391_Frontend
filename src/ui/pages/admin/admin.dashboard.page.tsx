import { ColCard, LineChartComponent } from "@/ui/components";
import { Typography } from "antd";

const data = [
	{
		name: "Page A",
		uv: 4000,
		pv: 2400,
	},
	{
		name: "Page B",
		uv: 3000,
		pv: 1398,
	},
	{
		name: "Page C",
		uv: 2000,
		pv: 9800,
	},
	{
		name: "Page D",
		uv: 2780,
		pv: 3908,
	},
	{
		name: "Page E",
		uv: 1890,
		pv: 4800,
	},
	{
		name: "Page F",
		uv: 2390,
		pv: 3800,
	},
	{
		name: "Page G",
		uv: 3490,
		pv: 4300,
	},
];

export default function AdminDashboardPage() {
	return (
		<>
			<Typography.Title level={3}>Statistics</Typography.Title>
			<div className="mb-3 flex flex-col  space-x-0 space-y-3 2xl:flex-row 2xl:space-x-3 2xl:space-y-0">
				<ColCard
					footer={null}
					loading={false}
					metaCount="321"
					metaName="Visitors"
					body={null}
				></ColCard>
				<ColCard
					footer={null}
					loading={false}
					metaCount="321"
					metaName="Visitors"
					body={null}
				></ColCard>
				<ColCard
					footer={null}
					loading={false}
					metaCount="321"
					metaName="Visitors"
					body={null}
				></ColCard>
				<ColCard
					footer={null}
					loading={false}
					metaCount="321"
					metaName="Visitors"
					body={null}
				></ColCard>
			</div>
			<LineChartComponent data={data} title="Props"></LineChartComponent>
			<LineChartComponent data={data} title="Props"></LineChartComponent>
		</>
	);
}
