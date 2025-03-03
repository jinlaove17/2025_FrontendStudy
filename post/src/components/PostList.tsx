import "./PostList.css";
import useFetchData from "../hooks/useFetchData";
import { getPosts } from "../api/post";
import PostItem from "./PostItem";
import { Post } from "../types/post";

const PostList = () => {
  const { data, isLoading } = useFetchData(getPosts);

  if (isLoading) {
    return null;
  }

  return (
    <div className="PostList">
      <div className="field">
        <p className="field-num">번호</p>
        <p className="field-title">제목</p>
        <p className="field-author">작성자</p>
        <p className="field-createdAt">작성일</p>
        <p className="field-view">조회수</p>
      </div>

      {data?.data.map((item: Post) => (
        <PostItem
          key={item.id}
          {...item}
        />
      ))}
    </div>
  );
};

export default PostList;
