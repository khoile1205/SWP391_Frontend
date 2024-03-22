import { ActionStatus } from "@/enums";
import AppColor from "@/utils/appColor";

export const renderStatusColor = (status: ActionStatus) => {
	switch (status) {
		case ActionStatus.PENDING:
			return AppColor.deepOrangeColor;
		case ActionStatus.REJECTED:
			return AppColor.darkRedColor;
		case ActionStatus.ACCEPTED:
			return AppColor.darkGreenColor;
		case ActionStatus.CANCELED:
			return AppColor.grayColor;
		case ActionStatus.COMPLETED:
			return AppColor.darkBlueColor;
		default:
			return AppColor.deepOrangeColor;
	}
};
