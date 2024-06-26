import userStore from "@/zustand/user.store";
import { useState } from "react";
import { Button, Card, Typography, Modal, Input, Form, Space, Col, Row } from "antd";
import {
	WalletOutlined,
	ArrowUpOutlined,
	ArrowDownOutlined,
	DollarOutlined,
} from "@ant-design/icons";
import ForbiddenPage from "../../forbidden.page";
import { paymentStore } from "@/zustand/payment.store";
import { showToast } from "@/utils/notify";
import { useAuthenticateFeature } from "@/hooks/common";
import { PaymentType } from "@/enums/payment.type.enum";
import { useLoadingStore } from "@/zustand/loading.store";
import { AppConstant } from "@/utils/constant";

export default function ProfileWalletPage() {
	const [withdrawModalVisible, setWithdrawModalVisible] = useState(false);
	const [topUpModalVisible, setTopUpModalVisible] = useState(false);
	const { setLoading } = useLoadingStore((state) => state);
	const { user } = userStore((state) => state);
	const { topUp, withDraw } = paymentStore((state) => state);

	const handleWithdraw = () => {
		setWithdrawModalVisible(true);
	};

	const handleTopUp = () => {
		setTopUpModalVisible(true);
	};

	const handleTopUpSubmit = useAuthenticateFeature(async (values: any) => {
		let response;
		setLoading(true);
		console.log(values.amount * AppConstant.USDtoVND);
		try {
			response = await topUp({
				amount: values.amount * AppConstant.USDtoVND,
				name: user?.firstName + " " + user?.lastName,
				orderDescription: `Top up`,
				orderType: PaymentType.DEPOSIT,
			});
			if (response.isSuccess) {
				window.location.href = response.data;
			}
		} catch (error) {
			console.log(error);
			showToast("error", response?.message as string);
		} finally {
			setLoading(false);
			setWithdrawModalVisible(false);
		}
	});
	const handleWithdrawSubmit = useAuthenticateFeature(async (values: any) => {
		const userBalance = user!.balance ?? 0;

		if (values.amount > userBalance) {
			showToast("error", "You don't have enough balance to withdraw");
			return;
		}
		// Add your logic to handle top-up
		const response = await withDraw({
			amount: values.amount,
			description: ` ${user?.firstName} ${user?.lastName} withdraw ${values.amount} from wallet`,
		});

		if (response.isSuccess) {
			showToast("success", response.message as string);
			setTimeout(() => (window.location.pathname = "profile/wallet"), 500);
			setTopUpModalVisible(false);
		} else {
			showToast("error", response.message as string);
		}
	});

	return user ? (
		<Row justify="center" align="middle" style={{ minHeight: "100vh", backgroundColor: "#f0f2f5" }}>
			<Col xs={24} sm={20} md={16} lg={12}>
				<Card
					title={
						<Typography.Title level={3} style={{ marginBottom: 0 }}>
							<WalletOutlined /> Wallet Balance
						</Typography.Title>
					}
					style={{ borderRadius: 10, boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}
				>
					<Typography.Title level={2} style={{ marginBottom: 20, color: "#2c3e50" }}>
						$ {user.balance}
					</Typography.Title>
					<Space direction="vertical" size={16} style={{ width: "100%" }}>
						<Button
							type="primary"
							icon={<ArrowUpOutlined />}
							onClick={handleTopUp}
							style={{ width: "100%", backgroundColor: "#2ecc71", borderColor: "#2ecc71" }}
						>
							Top Up
						</Button>
						<Button
							type="primary"
							icon={<ArrowDownOutlined />}
							onClick={handleWithdraw}
							style={{ width: "100%", backgroundColor: "#e74c3c", borderColor: "#e74c3c" }}
						>
							Withdraw
						</Button>
					</Space>
				</Card>
			</Col>

			{/* Withdraw Modal */}
			<Modal
				title="Withdraw Funds"
				open={withdrawModalVisible}
				onCancel={() => setWithdrawModalVisible(false)}
				footer={null}
				centered
			>
				<Form onFinish={handleWithdrawSubmit}>
					<Form.Item
						name="amount"
						label="Amount"
						rules={[{ required: true, message: "Please enter the withdrawal amount!" }]}
					>
						<div className="space-y-3">
							<Input
								prefix={<DollarOutlined />}
								type="number"
								min={1}
								step={1}
								max={500}
								placeholder="Enter withdrawal amount"
								style={{ width: "100%" }}
							/>
							<Typography className="mt-2 text-sm">
								* Note: 1$ = {AppConstant.USDtoVND} vnd
							</Typography>
						</div>
					</Form.Item>
					<Button className="bg-primary text-white" htmlType="submit" style={{ width: "100%" }}>
						Withdraw
					</Button>
				</Form>
			</Modal>

			{/* Top Up Modal */}
			<Modal
				title="Top Up Funds"
				open={topUpModalVisible}
				onCancel={() => setTopUpModalVisible(false)}
				footer={null}
				centered
			>
				<Form onFinish={handleTopUpSubmit}>
					<Form.Item
						name="amount"
						label="Amount"
						rules={[{ required: true, message: "Please enter the top-up amount!" }]}
					>
						<div className="space-y-3">
							<Input
								prefix={<DollarOutlined />}
								min={1}
								max={500}
								step={1}
								type="number"
								placeholder="Enter top-up amount"
								style={{ width: "100%" }}
							/>
							<Typography className="mt-2 text-sm">
								* Note: 1$ = {AppConstant.USDtoVND} vnd
							</Typography>
						</div>
					</Form.Item>
					<Button className="bg-primary text-white" htmlType="submit" style={{ width: "100%" }}>
						Top Up
					</Button>
				</Form>
			</Modal>
		</Row>
	) : (
		<ForbiddenPage></ForbiddenPage>
	);
}
