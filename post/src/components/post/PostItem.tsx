import { useNavigate } from "react-router-dom";
import { Post } from "../../types/post";
import { isToday } from "../../utils/date";

const PostItem = ({ id, title, author, createdAt, view, comments }: Post) => {
  const nav = useNavigate();

  return (
    <div
      className="record"
      onClick={() => nav(`/posts/${id}`)}
    >
      <p className="record-num">{id}</p>
      <p className="record-title">
        {title} {comments.length > 0 && <p>[{comments.length}]</p>}
        {isToday(createdAt) && <div className="new-icon">N</div>}
      </p>
      <p className="record-author">{author}</p>
      <p className="record-createdAt">{createdAt}</p>
      <p className="record-view">{view}</p>
    </div>
  );
};

export default PostItem;
