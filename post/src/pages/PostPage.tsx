import PostList from "../components/PostList";
import "./PostPage.css";

const PostPage = () => {
  return (
    <div className="PostPage">
      <div>
        <h2>자유 게시판</h2>
        <p>주제에 상관 없이 다양한 글을 작성해 보세요.</p>
      </div>

      <PostList />
    </div>
  );
};

export default PostPage;
