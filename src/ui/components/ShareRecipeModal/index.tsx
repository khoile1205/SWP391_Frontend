import { Modal } from "antd";
import React from "react";
import { SocialShareButton } from "..";

interface ShareRecipeModalProps {
	shareModalVisible: boolean;
	setShareModalVisible: (visible: boolean) => void;
}

export const ShareRecipeModal: React.FC<ShareRecipeModalProps> = ({
	shareModalVisible,
	setShareModalVisible,
}) => {
	return (
		<Modal
			title="Share Recipe"
			open={shareModalVisible}
			onCancel={() => setShareModalVisible(false)}
			footer={null}
		>
			<div className="flex space-x-8">
				<SocialShareButton
					platform="Facebook"
					url={`${import.meta.env.VITE_URL}${window.location.pathname}`}
				></SocialShareButton>
				<SocialShareButton
					platform="Twitter"
					url={`${import.meta.env.VITE_URL}${window.location.pathname}`}
				></SocialShareButton>
			</div>
		</Modal>
	);
};
