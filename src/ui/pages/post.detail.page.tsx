import { useParams } from "react-router-dom";

const PostDetailPage = () => {
	const { id } = useParams();

	return <div>{id}</div>;
};

export default PostDetailPage;
