import { Typography } from "antd";
import React from "react";

type CounterType = "increment" | "decrement";
interface Props {
	onChange: () => void;
	type: CounterType;
}

export const Counter: React.FC<Props> = ({ onChange, type }) => {
	return (
		<button
			onClick={onChange}
			style={{
				backgroundColor: "#ddd",
				width: "30px",
				borderRadius: "4px",
			}}
		>
			<Typography>{type === "increment" ? "+" : "-"}</Typography>
		</button>
	);
};
