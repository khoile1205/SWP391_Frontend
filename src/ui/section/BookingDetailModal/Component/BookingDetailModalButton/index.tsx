import { ActionStatus } from "@/enums";
import AppColor from "@/utils/appColor";
import { Button } from "antd";

interface ButtonProps {
	handleButtonAction: (status: ActionStatus) => void;
	style: React.CSSProperties;
	text: string;
	actionStatus: keyof typeof ActionStatus; // New prop to specify the action status
	disabled?: boolean;
}

export const BookingDetailModalButton: React.FC<ButtonProps> = ({
	handleButtonAction,
	style,
	text,
	actionStatus,
	disabled = false,
}) => (
	<Button
		type="default"
		style={{ backgroundColor: AppColor.redColor, color: "white", ...style }}
		onClick={() => handleButtonAction(ActionStatus[actionStatus])}
		disabled={disabled}
	>
		{text}
	</Button>
);
