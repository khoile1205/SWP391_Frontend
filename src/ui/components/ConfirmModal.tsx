import AppColor from "@/utils/appColor";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Modal } from "antd";

const { confirm } = Modal;

type ModalProps = {
	content: JSX.Element | string;
	onOk: () => void;
};
export const ConfirmModal = ({ content, onOk }: ModalProps) => {
	return confirm({
		title: "Warning",
		icon: <ExclamationCircleOutlined />,
		content: content,
		okText: "Confirm",
		cancelText: "Close",
		onOk: onOk,
		okButtonProps: {
			style: { backgroundColor: AppColor.deepOrangeColor },
		},
	});
};
