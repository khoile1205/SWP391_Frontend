import { Column } from "@/types/@override/Table";
import { Transaction } from "@/models/transaction.model";
import { TransactionType } from "@/enums/transaction.enum";
import React, { useState } from "react";
import { PaginationPageSize, PaginationTable } from "@/ui/components";
import { useGetAllTransactionHistory } from "@/hooks/admin";
import { Flex, Input, Tooltip, Typography } from "antd";

const renderTransactionType = (type: Transaction["type"]) => {
	switch (type) {
		case TransactionType.DEPOSIT:
			return "Deposit";
		case TransactionType.WITHDRAW:
			return "Withdraw";
		case TransactionType.PURCHASEDRECIPE:
			return "Purchase Recipe";
		case TransactionType.BOOKING:
			return "Booking";
	}
};

export default function AdminTransactionPage() {
	const { data: transactionHistory } = useGetAllTransactionHistory();
	const [listTransactions, setListTransactions] = useState<Transaction[]>(transactionHistory);
	const [pageSize, setPageSize] = useState<number>(5);

	React.useEffect(() => {
		setListTransactions(transactionHistory);
	}, [transactionHistory]);

	const handleSearchUser = (search: string) => {
		const searchKey = search.toLowerCase();
		if (searchKey) {
			const newData = listTransactions.filter((transaction) =>
				`${transaction.user.firstName} ${transaction.user.lastName}`
					.toLowerCase()
					.includes(searchKey)
			);
			setListTransactions(newData);
		} else {
			setListTransactions(transactionHistory);
		}
	};
	const columns: Column<Transaction>[] = [
		{
			title: "ID",
			dataIndex: "id",
			align: "center",
		},
		{
			title: "User",
			dataIndex: "user",
			width: "20%",
			align: "center",
			render: (_text: string, record: Transaction) => (
				<Tooltip
					title={`${record.user.firstName} ${record.user.lastName}`}
				>{`${record.user.firstName} ${record.user.lastName}`}</Tooltip>
			),
		},
		{
			title: "Amount",
			dataIndex: "amount",
			align: "center",
			render: (_text: string, record: Transaction) => (
				<Tooltip title={Math.abs(record.amount)}>{Math.abs(record.amount)}</Tooltip>
			),
			sorter: (a: Transaction, b: Transaction) => Math.abs(a.amount) - Math.abs(b.amount),
		},
		{
			title: "Type",
			dataIndex: "type",
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
			render: (_text: string, record: Transaction) => {
				return <Tooltip title={record.currency}>{record.currency}</Tooltip>;
			},
		},
		{
			title: "Payment",
			dataIndex: "payment",
			align: "center",
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
			render: (createdAt: Date) => <span>{new Date(createdAt).toLocaleString("vi-VN")}</span>,
			sorter: (a: Transaction, b: Transaction) =>
				new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
		},
	];

	return (
		<div className="w-full px-4 py-8 lg:px-8">
			<h2 className="mb-4 text-center text-2xl font-bold text-gray-900">
				Admin Transaction Management
			</h2>
			<Flex className="mb-4" align="center" justify="space-between">
				<Flex align="center" className="space-x-3">
					<Typography.Text>Search </Typography.Text>
					<span>
						<Input
							type="text"
							size="small"
							placeholder="Search user ..."
							className="focus:border-blue-500 rounded-md border-gray-300 px-3 py-1 focus:outline-none"
							onChange={(e) => handleSearchUser(e.target.value)}
						/>
					</span>
				</Flex>
				<PaginationPageSize options={[5, 10, 15]} pageSize={pageSize} setPageSize={setPageSize} />
			</Flex>
			<PaginationTable columns={columns} dataSource={listTransactions} pageSize={pageSize} />
		</div>
	);
}
