import { useNavigate } from "react-router-dom";
import { Post } from "../../types/post";
import { isToday } from "../../utils/date";
import { postIncreaseView } from "../../api/post";

const PostItem = (post: Post) => {
  const nav = useNavigate();

  const handlePostSelect = async () => {
    try {
      await postIncreaseView({ ...post, view: post.view + 1 });
      nav(`/posts/${post.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className="record"
      onClick={handlePostSelect}
    >
      <p className="record-num">{post.id}</p>
      <p className="record-title">
        {post.title}{" "}
        {post.comments.length > 0 && <p>[{post.comments.length}]</p>}
        {isToday(post.createdAt) && <div className="new-icon">N</div>}
      </p>
      <p className="record-author">{post.author}</p>
      <p className="record-createdAt">{post.createdAt}</p>
      <p className="record-view">{post.view}</p>
    </div>
  );
};

export default PostItem;
