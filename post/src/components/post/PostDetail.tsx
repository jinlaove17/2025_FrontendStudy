import { useParams } from "react-router-dom";

const PostDetail = () => {
  const { id } = useParams();

  return <div>{id}번 째 게시글입니다.</div>;
};

export default PostDetail;
