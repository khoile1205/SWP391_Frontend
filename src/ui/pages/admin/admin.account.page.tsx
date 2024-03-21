import { Button, Tooltip, Flex, Typography, Input } from "antd";
import { EyeOutlined, LockOutlined, UnlockOutlined } from "@ant-design/icons";
import { ConfirmModal, PaginationPageSize, PaginationTable } from "@/ui/components";
import { useEffect, useState } from "react";
import { Column } from "@/types/@override/Table";
import { User } from "@/models/user.model";
import { Roles } from "@/enums";
import { LockAccountModal } from "@/ui/section";
import { showToast } from "@/utils/notify";
import { useAdminAccountManagement } from "@/hooks/admin";

const renderGender = (gender: boolean) => {
	return gender ? "Male" : "Female";
};

const renderUserRole = (role: Roles) => {
	switch (role) {
		case Roles.ADMIN:
			return "Admin";
		case Roles.CHEF:
			return "Chef";
		case Roles.USER:
			return "User";
	}
};

const renderUserLockendDate = (date: Date | null) => {
	return date && new Date(date).getTime() < new Date().getTime()
		? new Date(date).toLocaleString("vi-VN")
		: "Not Locked";
};

export default function AdminAccountManagementPage() {
	const { data, lockAccount, unlockAccount } = useAdminAccountManagement();

	const [listAccounts, setListAccounts] = useState<User[]>(data);
	const [pageSize, setPageSize] = useState<number>(5);
	const [open, setOpen] = useState<boolean>(false);
	const [userLock, setUserLock] = useState<User | null>(null);
	useEffect(() => {
		setListAccounts(data);
	}, [data]);

	const handleSearchUser = (title: string) => {
		const searchKey = title.toLowerCase();
		if (title) {
			const newData = data.filter(
				(user: any) =>
					user.userName.toLowerCase().includes(searchKey) ||
					`${user.firstName} ${user.lastName}`.toLowerCase().includes(searchKey)
			);
			setListAccounts(newData);
		} else {
			setListAccounts(data);
		}
	};
	const handleLockAccount = async (user: User, minute: number) => {
		const response = await lockAccount({
			minute,
			userId: user.id,
		});
		if (response.isSuccess) {
			showToast("success", response.message as string);
			const newData = listAccounts.map((account) =>
				account.id == user.id
					? { ...user, lockOutEnd: new Date(new Date().getTime() + 60 * minute * 1000) }
					: account
			);
			setListAccounts(newData);
		} else {
			showToast("error", response.message as string);
		}
	};

	const handleUnlockAccount = async (user: User) => {
		const response = await unlockAccount(user.id);

		if (response.isSuccess) {
			showToast("success", response.message as string);
			const newData = listAccounts.map((account) =>
				account.id == user.id ? { ...user, lockOutEnd: null } : account
			);
			setListAccounts(newData);
		} else {
			showToast("error", response.message as string);
		}
	};

	// Event handler
	const handleLockButtonClick = (record: User) => {
		setUserLock(record);
		setOpen(true);
	};

	const handleUnlockButtonClick = (record: User) => {
		ConfirmModal({
			content: "Are you sure to unlock this user?",
			onOk: () => handleUnlockAccount(record),
		});
	};

	const columns: Column<User>[] = [
		{
			title: "Username",
			dataIndex: "userName",
			width: "auto",
			align: "center",
			render: (_text: string, record: User) => (
				<Tooltip title={record.userName}>{record.userName}</Tooltip>
			),
		},
		{
			title: "First name",
			dataIndex: "firstName",
			width: "10%",
			align: "center",

			render: (_text: string, record: User) => (
				<Tooltip title={record.firstName}>{record.firstName}</Tooltip>
			),
		},
		{
			title: "Last name",
			dataIndex: "lastName",
			width: "10%",
			align: "center",
			render: (_text: string, record: User) => (
				<Tooltip title={record.lastName}>{record.lastName}</Tooltip>
			),
		},
		{
			title: "Role",
			dataIndex: "role",
			width: "10%",
			align: "center",
			render: (_text: string, record: User) => (
				<Tooltip title={record.role}>{renderUserRole(record.role)}</Tooltip>
			),
		},
		{
			title: "Gender",
			dataIndex: "isMale",
			width: "10%",
			align: "center",
			render: (_text: string, record: User) => (
				<Typography>{renderGender(record.isMale)}</Typography>
			),
		},
		{
			title: "Phone number",
			dataIndex: "phoneNumber",
			width: "12%",
			align: "center",
			render: (_text: string, record: User) => <Typography>{record.phoneNumber}</Typography>,
		},
		{
			title: "Address",
			dataIndex: "address",
			width: "10%",
			align: "center",
			render: (_text: string, record: User) => <Typography>{record.address}</Typography>,
		},
		{
			title: "Lockend Date",
			dataIndex: "lockOutEnd",
			width: "10%",
			align: "center",
			render: (_text: string, record: User) => (
				<Typography>{renderUserLockendDate(record.lockOutEnd)}</Typography>
			),
		},
		{
			title: "Created At",
			dataIndex: "createdAt",
			align: "center",
			width: "10%",
			render: (createdAt: Date) => (
				<Typography>{new Date(createdAt).toLocaleDateString("vi-VN")}</Typography>
			),
		},
		{
			title: "",
			align: "center",
			width: "13%",

			render: (_text: any, record: User) => (
				<Flex justify="center" className="space-x-1">
					<Tooltip title="View Detail">
						<Button
							href={`/user/${record.id}`}
							type="text"
							icon={<EyeOutlined className="text-primary" style={{ fontSize: "16px" }} />}
						/>
					</Tooltip>
					<Tooltip
						title={
							record.lockOutEnd && new Date(record.lockOutEnd).getTime() > new Date().getTime()
								? "Unlock account"
								: "Lock account"
						}
					>
						<Button
							type="text"
							icon={
								record.lockOutEnd &&
								new Date(record.lockOutEnd).getTime() > new Date().getTime() ? (
									<UnlockOutlined className="text-primary" style={{ fontSize: "16px" }} />
								) : (
									<LockOutlined className="text-primary" style={{ fontSize: "16px" }} />
								)
							}
							onClick={() =>
								record.lockOutEnd && new Date(record.lockOutEnd).getTime() > new Date().getTime()
									? handleUnlockButtonClick(record)
									: handleLockButtonClick(record)
							}
						/>
					</Tooltip>
				</Flex>
			),
		},
	];

	return (
		<>
			{" "}
			<div className="w-full px-4 py-8 lg:px-8">
				<h2 className="mb-4 text-center text-2xl font-bold text-gray-900">Account Management</h2>

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
					<PaginationPageSize
						options={[5, 10, 15]}
						pageSize={pageSize}
						setPageSize={setPageSize}
					></PaginationPageSize>
				</Flex>
				<PaginationTable columns={columns} dataSource={listAccounts} pageSize={pageSize} />
			</div>
			<LockAccountModal
				user={userLock}
				open={open}
				setOpen={setOpen}
				handleLockAccount={handleLockAccount}
			></LockAccountModal>
		</>
	);
}
