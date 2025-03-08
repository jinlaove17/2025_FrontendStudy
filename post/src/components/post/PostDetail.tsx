import { useParams } from "react-router-dom";
import useFetchData from "../../hooks/useFetchData";
import { getPost } from "../../api/post";
import "./PostDetail.css";
import { CircleUserRoundIcon, EyeIcon } from "lucide-react";
import { Comment } from "../../types/post";
import CommentItem from "./CommentItem";

const PostDetail = () => {
  const { id } = useParams();
  const { data, isLoading } = useFetchData(() => getPost(Number(id)));

  if (isLoading) {
    return null;
  }

  const topLevelComments = data.comments.filter(
    (item: Comment) => !item.parentId
  );

  return (
    <div className="PostDetail">
      <div className="title">
        <h3>{data.title}</h3>
        <p className="createdAt">{data.createdAt}</p>
      </div>

      <div className="post-info">
        <div className="author-info">
          <CircleUserRoundIcon
            size={32}
            color={"rgb(180, 180, 180)"}
            strokeWidth={"1"}
          />
          <p>{data.author}</p>
        </div>

        <div className="view-info">
          <EyeIcon
            size={16}
            strokeWidth={"2"}
          />
          <p className="view">{data.view}</p>
        </div>
      </div>

      <div className="content">{data.content}</div>

      <div className="comment-info">
        <h4>댓글 ({data.comments.length})</h4>
        {topLevelComments.map((tlComment: Comment) => {
          const replies = data.comments.filter(
            (comment: Comment) => comment.parentId === tlComment.id
          );

          return (
            <CommentItem
              key={tlComment.id}
              comment={tlComment}
              replies={replies}
            />
          );
        })}
      </div>
    </div>
  );
};

export default PostDetail;
