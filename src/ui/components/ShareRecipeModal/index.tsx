import { Modal } from "antd";
import React from "react";
import { SocialShareButton } from "..";

interface ShareRecipeModalProps {
	shareModalVisible: boolean;
	setShareModalVisible: (visible: boolean) => void;
	url: string;
}

export const ShareRecipeModal: React.FC<ShareRecipeModalProps> = ({
	shareModalVisible,
	setShareModalVisible,
	url,
}) => {
	return (
		<Modal
			title="Share Recipe"
			open={shareModalVisible}
			onCancel={() => setShareModalVisible(false)}
			footer={null}
		>
			<div className="flex space-x-8">
				<SocialShareButton platform="Facebook" url={url}></SocialShareButton>
				<SocialShareButton platform="Twitter" url={url}></SocialShareButton>
			</div>
		</Modal>
	);
};
