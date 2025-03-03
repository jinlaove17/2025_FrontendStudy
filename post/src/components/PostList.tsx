import "./PostList.css";
import useFetchData from "../hooks/useFetchData";
import { getPosts } from "../api/post";
import PostItem from "./PostItem";
import { Post } from "../types/post";
import { useState } from "react";
import Pagenation from "./Pagenation";
import { PAGENATION_PAGE_SIZE } from "../constants/pagenation";

const PostList = () => {
  const [page, setPage] = useState<number>(1);
  const { data, isLoading, totalCount } = useFetchData(
    () => getPosts({ _limit: PAGENATION_PAGE_SIZE, _page: page }),
    [page]
  );

  if (isLoading) {
    return null;
  }

  return (
    <>
      <div className="PostList">
        <div className="field">
          <p className="field-num">번호</p>
          <p className="field-title">제목</p>
          <p className="field-author">작성자</p>
          <p className="field-createdAt">작성일</p>
          <p className="field-view">조회수</p>
        </div>

        {data.map((item: Post) => (
          <PostItem
            key={item.id}
            {...item}
          />
        ))}
      </div>

      <Pagenation
        page={page}
        setPage={setPage}
        totalCount={totalCount!}
      />
    </>
  );
};

export default PostList;
