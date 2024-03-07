import { useGetDashboardStatistics } from "@/hooks/admin";
import { ColCard, LineChartComponent } from "@/ui/components";
import { Button, Flex, Space, Typography } from "antd";
import Banner from "@/assets/images/banner.png";
export default function AdminDashboardPage() {
	const { dashboardStatistic, loading } = useGetDashboardStatistics();
	return (
		<Space className="w-full" size={"middle"} direction="vertical">
			<>
				<Typography.Title level={1} className="text-center">
					Dashboard
				</Typography.Title>
				<Flex
					align="center"
					justify="space-evenly"
					style={{
						backgroundColor: "#FEEBF0",
						borderRadius: "8px",
					}}
				>
					<div>
						<Typography.Title level={3}>
							Welcome to <strong>Nest Cooking</strong>
						</Typography.Title>
						<Button
							href={`https://analytics.google.com/analytics/web/?authuser=${
								import.meta.env.VITE_GOOGLE_ANALYSIS_MAIL
							}#/report-home/${import.meta.env.VITE_GOOGLE_ANALYSIS_ID}`}
							target="_blank"
							className="text-white"
							style={{ backgroundColor: "#F73568" }}
						>
							Explore
						</Button>
					</div>
					<img
						height="150px"
						src={Banner}
						style={{
							objectFit: "contain",
						}}
					/>
				</Flex>
			</>
			<>
				<Typography.Title level={3}>Statistics</Typography.Title>
				<div className="mb-3 flex flex-col  space-x-0 space-y-3 lg:flex-row lg:space-x-3 lg:space-y-0">
					<ColCard
						footer={null}
						loading={loading}
						metaCount={dashboardStatistic.numberStatistic.totalOfBooking.toString()}
						metaName="Booking"
						body={null}
						tooltipTitle="Total of booking"
					></ColCard>
					<ColCard
						footer={null}
						loading={loading}
						metaCount={dashboardStatistic.numberStatistic.totalOfRevenue.toString()}
						metaName="Revenue"
						body={null}
						tooltipTitle="Total of revenue"
					></ColCard>
					<ColCard
						footer={null}
						loading={loading}
						metaCount={dashboardStatistic.numberStatistic.totalOfViolation.toString()}
						metaName="Violation"
						body={null}
						tooltipTitle="Total of violation"
					></ColCard>
				</div>
			</>

			<LineChartComponent
				data={dashboardStatistic.chartStatistic.userStatisticList}
				title="User Statistics"
				horizontalName="The number of new user"
				verticalName="The total number of user"
			></LineChartComponent>
			<LineChartComponent
				data={dashboardStatistic.chartStatistic.chefStatisticList}
				title="Chef Statistics"
				horizontalName="The number of new chef"
				verticalName="The total number of chef"
			></LineChartComponent>
		</Space>
	);
}
