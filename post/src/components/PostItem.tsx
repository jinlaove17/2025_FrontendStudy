import { Post } from "../types/post";

const PostItem = ({ id, title, author, createdAt, view }: Post) => {
  return (
    <div className="record">
      <p className="record-num">{id}</p>
      <p className="record-title">{title}</p>
      <p className="record-author">{author}</p>
      <p className="record-createdAt">{createdAt}</p>
      <p className="record-view">{view}</p>
    </div>
  );
};

export default PostItem;
