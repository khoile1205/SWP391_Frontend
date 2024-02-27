import { Button } from "antd";

interface LoadmoreProps {
	onClick: () => void;
	title?: string;
	className?: string;
}
export default function Loadmore({ onClick, title = "Load more", className = "" }: LoadmoreProps) {
	return (
		<div className={`mt-10 text-center ${className}`}>
			<Button onClick={onClick} className="hover:!bg-primary mb-10  w-1/3 hover:!text-white">
				{title}
			</Button>
		</div>
	);
}
