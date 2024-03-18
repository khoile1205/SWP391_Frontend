import { GetProps, DatePicker } from "antd";

type DatePickerProps = Exclude<GetProps<typeof DatePicker>, "onOk"> & {
	onOk: (value: DatePickerProps["value"]) => void;
};

export const DatePickerComponent: React.FC<DatePickerProps> = ({ onOk, ...props }) => (
	<DatePicker
		className="w-full"
		// minDate={pr}
		// defaultValue={dayjs(new Date())}
		showTime={{ format: "HH:mm" }}
		format="YYYY-MM-DD HH:mm"
		onOk={onOk}
		{...props}
		// onOk={(value: DatePickerProps["value"]) => setDateTimeEnd(value?.toDate())}
	></DatePicker>
);
