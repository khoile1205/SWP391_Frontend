import { ActionStatus } from "@/enums";
import AppColor from "@/utils/appColor";

export const renderStatusColor = (status: ActionStatus) => {
	switch (status) {
		case ActionStatus.PENDING:
			return AppColor.deepOrangeColor;
		case ActionStatus.REJECTED:
			return AppColor.redColor;
		case ActionStatus.ACCEPTED:
			return AppColor.greenColor;
	}
};
