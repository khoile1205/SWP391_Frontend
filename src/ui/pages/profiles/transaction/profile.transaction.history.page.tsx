import { useGetTransactionHistory } from "@/hooks/profiles";
import { Transaction } from "@/models/transaction.model";
import { TransactionType } from "@/enums/transaction.enum";
import { Column } from "@/types/@override/Table";
import React, { useState } from "react";
import { Tooltip, Typography } from "antd";
import { PaginationPageSize, PaginationTable } from "@/ui/components";

const renderTransactionType = (type: Transaction["type"]) => {
	switch (type) {
		case TransactionType.DEPOSIT:
			return "Deposit";
		case TransactionType.WITHDRAW:
			return "Withdraw";
		case TransactionType.PURCHASEDRECIPE:
			return "Purchase Recipe";
	}
};
export default function ProfileTransactionHistory() {
	const { data } = useGetTransactionHistory();

	const [transactionHistory, setTransactionHistory] = useState<Transaction[]>(
		data as Transaction[]
	);

	React.useEffect(() => {
		setTransactionHistory(data as Transaction[]);
	}, [data]);

	const [pageSize, setPageSize] = useState<number>(5);

	const columns: Column<Transaction>[] = [
		{
			title: "ID",
			dataIndex: "id",
			width: "20%",
			align: "center",
		},

		{
			title: "Price",
			dataIndex: "amount",
			align: "center",
			width: "10%",
			render: (_text: string, record: Transaction) => (
				<Tooltip title={Math.abs(record.amount)}>{Math.abs(record.amount)}</Tooltip>
			),
			sorter: (a: Transaction, b: Transaction) => a.amount - b.amount,
		},
		{
			title: "Type",
			dataIndex: "type",
			width: "20%",
			render: (_text: string, record: Transaction) => (
				<Tooltip title={renderTransactionType(record.type)}>
					{renderTransactionType(record.type)}
				</Tooltip>
			),
			align: "center",
			filters: [
				{
					value: TransactionType.DEPOSIT,
					text: "Deposit",
				},
				{
					value: TransactionType.PURCHASEDRECIPE,
					text: "Purchase Recipe",
				},
				{
					value: TransactionType.WITHDRAW,
					text: "Withdraw",
				},
				{
					value: TransactionType.BOOKING,
					text: "Booking",
				},
			],
			onFilter: (value, record) => record.type == value,
		},
		{
			title: "Status",
			dataIndex: "isSuccess",
			align: "center",
			render: (_text: string, record: Transaction) => {
				return (
					<Typography.Text type={record.isSuccess ? "success" : "danger"}>
						{record.isSuccess ? "Success" : "Error"}
					</Typography.Text>
				);
			},
			filters: [
				{
					value: true,
					text: "Success",
				},
				{
					value: false,
					text: "Error",
				},
			],
			onFilter: (value, record) => record.isSuccess == value,
		},
		{
			title: "Currency",
			dataIndex: "currency",
			align: "center",
			width: "20%",
			render: (_text: string, record: Transaction) => {
				return <Tooltip title={record.currency}>{record.currency}</Tooltip>;
			},
		},
		{
			title: "Payment",
			dataIndex: "payment",
			align: "center",
			width: "20%",
			render: (_text: string, record: Transaction) => {
				return <Tooltip title={record.payment}>{record.payment}</Tooltip>;
			},
			filters: [
				{
					value: "VnPay",
					text: "VnPay",
				},
				{
					value: "Wallet",
					text: "Wallet",
				},
			],
			onFilter: (value, record) => record.payment == value,
		},
		{
			title: "Created At",
			dataIndex: "createdAt",
			align: "center",
			width: "20%",
			render: (createdAt: Date) => <span>{new Date(createdAt).toLocaleString("vi-VN")}</span>,
			sorter: (a: Transaction, b: Transaction) =>
				new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
		},
	];

	return (
		<div className="w-full px-4 py-8 lg:px-8">
			<h2 className="mb-4 text-center text-2xl font-bold text-gray-900">
				View Transaction History
			</h2>
			<div className="mb-4 ms-4">
				<PaginationPageSize options={[5, 10, 15]} pageSize={pageSize} setPageSize={setPageSize} />
			</div>
			<PaginationTable columns={columns} dataSource={transactionHistory} pageSize={pageSize} />
		</div>
	);
}
