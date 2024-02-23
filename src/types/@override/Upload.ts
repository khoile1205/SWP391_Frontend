import { UploadProps } from "antd";
import Dragger from "antd/es/upload/Dragger";
import InternalUpload from "antd/es/upload";

type InternalUploadType = typeof InternalUpload;

export type CompoundedComponent<T = any> = InternalUploadType & {
	<U extends T>(
		props: React.PropsWithChildren<UploadProps<U>> & React.RefAttributes<any>
	): React.ReactElement;
	Dragger: typeof Dragger;
	LIST_IGNORE: string;
};

export type UploadComponentProps = Omit<UploadProps, "beforeUpload">;
