import { Column } from "@/types/@override/Table";
import { Transaction } from "@/models/transaction.model";
import { TransactionType } from "@/enums/transaction.enum";
import { useState } from "react";
import { PaginationPageSize, PaginationTable } from "@/ui/components";
import { useGetAllTransactionHistory } from "@/hooks/admin";
import { Tooltip } from "antd";

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

export default function AdminTransactionPage() {
	const { data: transactionHistory } = useGetAllTransactionHistory();
	const [pageSize, setPageSize] = useState<number>(5);

	const columns: Column<Transaction>[] = [
		{
			title: "ID",
			dataIndex: "id",
			align: "center",
		},
		{
			title: "Amount",
			dataIndex: "amount",
			align: "center",
			render: (_text: string, record: Transaction) => (
				<Tooltip title={record.amount}>{record.amount}</Tooltip>
			),
			sorter: (a, b) => a.amount - b.amount,
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
		},
		{
			title: "Created At",
			dataIndex: "createdAt",
			align: "center",
			render: (createdAt: Date) => <span>{new Date(createdAt).toLocaleDateString("en-US")}</span>,
			sorter: (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
		},
	];

	return (
		<div className="flex flex-col items-center justify-center px-4 py-8 lg:px-8">
			<h2 className="mb-4 text-2xl font-bold text-gray-900">Admin Transaction Management</h2>
			<PaginationPageSize options={[5, 10, 15]} pageSize={pageSize} setPageSize={setPageSize} />
			<PaginationTable columns={columns} dataSource={transactionHistory} pageSize={pageSize} />
		</div>
	);
}
