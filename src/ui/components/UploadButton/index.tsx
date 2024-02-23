import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import React from "react";

export const UploadButton = React.memo(({ loading }: { loading?: boolean }) => (
	<div>
		{loading ? <LoadingOutlined /> : <PlusOutlined />}
		<div style={{ marginTop: 8 }}>Upload</div>
	</div>
));
