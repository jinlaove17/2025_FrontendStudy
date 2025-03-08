import { CircleUserRoundIcon } from "lucide-react";
import { Comment } from "../../types/post";
import "./CommentItem.css";

interface CommentItemProps {
  comment: Comment;
  replies: Comment[];
}

const CommentItem = ({ comment, replies }: CommentItemProps) => {
  return (
    <div className="CommentItem">
      <div className="comment">
        <div className="info">
          <div className="author-info">
            <CircleUserRoundIcon
              color={"rgb(180, 180, 180)"}
              strokeWidth={"1"}
            />
            <p>{comment.author}</p>
          </div>

          <p className="createdAt">{comment.createdAt}</p>
        </div>

        <p>{comment.content}</p>
      </div>

      {replies.length > 0 && (
        <div className="replies">
          {replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              replies={[]}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentItem;
