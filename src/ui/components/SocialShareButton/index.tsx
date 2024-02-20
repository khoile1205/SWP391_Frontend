import React from "react";
import { Typography } from "antd";
import { FacebookShareButton, TwitterShareButton, EmailShareButton } from "react-share";
import { FacebookOutlined, TwitterOutlined, MailOutlined } from "@ant-design/icons";

interface SocialShareButtonProps {
	platform: "Facebook" | "Twitter" | "Email";
	url: string;
}

export const SocialShareButton: React.FC<SocialShareButtonProps> = ({ platform, url }) => {
	const getIcon = (platform: string) => {
		switch (platform) {
			case "Facebook":
				return <FacebookOutlined className="me-2" />;
			case "Twitter":
				return <TwitterOutlined className="me-2" />;
			case "Email":
				return <MailOutlined className="me-2" />;
			default:
				return null;
		}
	};

	const getShareButton = (platform: string) => {
		switch (platform) {
			case "Facebook":
				return (
					<FacebookShareButton
						url={url}
						children={
							<Typography>
								{getIcon(platform)}
								{platform}
							</Typography>
						}
					/>
				);
			case "Twitter":
				return (
					<TwitterShareButton
						url={url}
						children={
							<Typography>
								{getIcon(platform)}
								{platform}
							</Typography>
						}
					/>
				);
			case "Email":
				return (
					<EmailShareButton
						url={url}
						children={
							<Typography>
								{getIcon(platform)}
								{platform}
							</Typography>
						}
					/>
				);
			default:
				return null;
		}
	};

	return <>{getShareButton(platform)}</>;
};
