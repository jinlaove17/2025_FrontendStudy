import "./PostList.css";
import useFetchData from "../../hooks/useFetchData";
import { getPosts } from "../../api/post";
import PostItem from "./PostItem";
import { Post } from "../../types/post";
import Pagenation from "../common/Pagenation";
import { PAGENATION_PAGE_SIZE } from "../../constants/pagenation";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";

const PostList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortType, setSortType] = useState<string>("latest");
  const [searchKeyword, setSearchKeyword] = useState<string>(
    searchParams.get("searchKeyword") || ""
  );

  // URL의 쿼리 파라미터에서 검색 타입과 현재 페이지를 가져온다.
  // 검색어는 onChange 이벤트가 호출될 때마다 URL이 바뀌면 안되기 때문에 별도의 STATE로 관리한다.
  const searchType = searchParams.get("searchType") || "title";
  const page = parseInt(searchParams.get("page") || "1");

  const { data, isLoading, totalCount } = useFetchData(
    () =>
      getPosts({
        [searchType + "_like"]: searchKeyword,
        _limit: PAGENATION_PAGE_SIZE,
        _page: page,
      }),
    [page, searchParams.get("searchKeyword")]
  );

  if (isLoading) {
    return null;
  }

  const sortedData = [...data].sort((a, b) => {
    switch (sortType) {
      case "latest":
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case "title":
        return a.title.localeCompare(b.title);
      case "view":
        return b.view - a.view;
    }
  });

  return (
    <div className="PostList">
      <select
        className="sortType"
        value={sortType}
        onChange={(e) => setSortType(e.target.value)}
      >
        <option value="latest">최신순</option>
        <option value="title">제목순</option>
        <option value="view">조회수순</option>
      </select>

      <div className="table">
        <div className="field">
          <p className="field-num">번호</p>
          <p className="field-title">제목</p>
          <p className="field-author">작성자</p>
          <p className="field-createdAt">작성일</p>
          <p className="field-view">조회수</p>
        </div>

        {sortedData.map((item: Post) => (
          <PostItem
            key={item.id}
            {...item}
          />
        ))}
      </div>

      <div className="searchContainer">
        <select
          className="sortType"
          value={searchType}
          onChange={(e) =>
            setSearchParams((prev) => {
              prev.set("searchType", e.target.value);
              return prev;
            })
          }
        >
          <option value="title">제목</option>
          <option value="author">작성자</option>
        </select>

        <input
          type="text"
          value={searchKeyword}
          placeholder="검색어를 입력해 주세요."
          onChange={(e) => setSearchKeyword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setSearchParams({ searchType, searchKeyword, page: "1" });
            }
          }}
        />

        <button
          type="button"
          onClick={() =>
            setSearchParams({ searchType, searchKeyword, page: "1" })
          }
        >
          검색
        </button>
      </div>

      <Pagenation
        page={page}
        setPage={(newPage: number) =>
          setSearchParams((prev) => {
            prev.set("page", `${newPage}`);
            return prev;
          })
        }
        totalCount={totalCount!}
      />
    </div>
  );
};

export default PostList;
