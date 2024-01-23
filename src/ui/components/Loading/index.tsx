export const Loading = () => {
	return (
		<div
			style={{
				position: "fixed",
				top: 0,
				left: 0,
				width: "100%",
				height: "100%",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				background: "rgba(255, 255, 255, 0.6)", // Adjust the background color and opacity as needed
				zIndex: 1000, // Adjust the z-index to ensure it's on top of other elements
			}}
		>
			<div>
				{/* <span style={{ fontSize: "1.5rem", marginRight: "0.5rem" }}>Loading</span>
				<Spin /> */}
				<div
					className=" h-20 w-20 animate-ping rounded-full"
					style={{
						backgroundColor: "rgb(161 161 170)",
					}}
				></div>
			</div>
		</div>
	);
};
