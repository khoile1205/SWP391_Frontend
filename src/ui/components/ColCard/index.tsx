import { InfoCircleOutlined } from "@ant-design/icons";
import { Col, Card, Tooltip, ColProps } from "antd";
import { FC } from "react";
import "./index.less";

const wrapperCol: ColProps = {
	xs: 24,
	sm: 24,
	md: 12,
	lg: 12,
	xl: 12,
	xxl: 6,
};

interface ColCardProps {
	metaName: string;
	metaCount: string;
	body: React.ReactNode;
	footer: React.ReactNode;
	loading: boolean;
}

export const ColCard: FC<ColCardProps> = ({ metaName, metaCount, body, footer, loading }) => {
	return (
		<Col {...wrapperCol}>
			<Card loading={loading} className="overview" bordered={false}>
				<div className="overview-header">
					<div className="overview-header-meta">{metaName}</div>
					<div className="overview-header-count">{metaCount}</div>
					<Tooltip title="Introduce">
						<InfoCircleOutlined className="overview-header-action" />
					</Tooltip>
				</div>
				<div className="overview-body">{body}</div>
				<div className="overview-footer">{footer}</div>
			</Card>
		</Col>
	);
};
