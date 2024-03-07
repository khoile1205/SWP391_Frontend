// ReactionButton.tsx
import { Reactions } from "@/enums/reaction.enum";
import { Button } from "antd";
import { LikeOutlined, HeartOutlined, SmileOutlined } from "@ant-design/icons";

interface ReactionButtonProps {
	reactionType: Reactions;
	count: number;
	isReacted: boolean;
	onClick: () => void;
}

export const ReactionButton: React.FC<ReactionButtonProps> = ({
	reactionType,
	count,
	isReacted,
	onClick,
}) => {
	const getIconByType = (type: Reactions) => {
		switch (type) {
			case Reactions.like:
				return <LikeOutlined />;
			case Reactions.favorite:
				return <HeartOutlined />;
			case Reactions.haha:
				return <SmileOutlined />;
			default:
				return null;
		}
	};

	console.log(isReacted, reactionType);

	return (
		<Button
			type="default"
			icon={getIconByType(reactionType)}
			onClick={onClick}
			className={`rounded-full border px-3 py-1 sm:px-4 md:px-5 ${isReacted ? "bg-primary text-white" : ""}`}
		>
			{count.toString()}
		</Button>
	);
};
