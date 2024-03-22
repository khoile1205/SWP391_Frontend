import { useEffect, useState } from "react";
import { Card, Table, Space, Button, Result } from "antd";
import { SmileOutlined, FrownOutlined } from "@ant-design/icons";
import { useLoadingStore } from "@/zustand/loading.store";
import { useValidatePayment } from "@/hooks/payment";
import { AppConstant } from "@/utils/constant";

export default function TransactionDetailsPage() {
	const [formattedAmount, setAmount] = useState<number>(0);
	const { isLoading } = useLoadingStore((state) => state);

	const { transactionData } = useValidatePayment();

	useEffect(() => {
		if (transactionData) {
			const formattedAmount =
				transactionData.data.amount / 100 / parseInt(AppConstant.USDtoVND.toString());

			setAmount(formattedAmount);
		}
	}, [transactionData]);

	const columns = [
		{
			title: "Field",
			dataIndex: "field",
			key: "field",
		},
		{
			title: "Value",
			dataIndex: "value",
			key: "value",
		},
	];

	const data = [
		{
			key: "1",
			field: "Transaction ID",
			value: transactionData ? transactionData.data.paymentId : "N/A",
		},
		{ key: "2", field: "Order ID", value: transactionData ? transactionData.data.orderId : "N/A" },
		{ key: "3", field: "Amount", value: `$ ${formattedAmount}` },
		{
			key: "4",
			field: "Order Description",
			value: transactionData ? transactionData.data.orderDescription : "N/A",
		},
		{
			key: "5",
			field: "Payment Method",
			value: transactionData ? transactionData.data.paymentMethod : "N/A",
		},
	];

	return !isLoading && transactionData ? (
		<div className="mx-auto mt-8 max-w-2xl">
			<Card title="Transaction Details" bordered className="shadow-lg">
				{transactionData?.isSuccess ? (
					<Result icon={<SmileOutlined />} title="Transaction Successful" />
				) : (
					<Result
						icon={<FrownOutlined />}
						title="Transaction Failed"
						subTitle={`Error Code: ${transactionData.data.vnPayResponseCode}`}
					/>
				)}

				<Space direction="vertical" size={16} style={{ width: "100%" }}>
					<Table columns={columns} dataSource={data} pagination={false} />
					<div className="mt-4 text-end">
						<Button className="bg-primary text-white" size="large" href="/">
							Return to Homepage
						</Button>
					</div>
				</Space>
			</Card>
		</div>
	) : (
		<></>
	);
}
