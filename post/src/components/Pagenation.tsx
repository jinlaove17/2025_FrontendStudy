import { Dispatch, SetStateAction } from "react";
import "./Pagenation.css";
import {
  PAGENATION_NAV_SIZE,
  PAGENATION_PAGE_SIZE,
} from "../constants/pagenation";

interface PagenationProps {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  totalCount: number;
}

const Pagenation = ({ page, setPage, totalCount }: PagenationProps) => {
  const totalPage = Math.floor((totalCount - 1) / PAGENATION_PAGE_SIZE) + 1;
  const curRangeStartPage =
    Math.floor((page - 1) / PAGENATION_NAV_SIZE) * PAGENATION_NAV_SIZE + 1;
  const curRangeEndPage =
    curRangeStartPage + PAGENATION_NAV_SIZE - 1 > totalPage
      ? totalPage
      : curRangeStartPage + PAGENATION_NAV_SIZE - 1;
  const isInEndRange =
    page >=
    Math.floor((totalPage - 1) / PAGENATION_NAV_SIZE) * PAGENATION_NAV_SIZE + 1;

  return (
    <nav className="Pagenation">
      <ul>
        <li onClick={() => setPage(1)}>처음</li>
        <li
          onClick={() =>
            setPage(curRangeStartPage === 1 ? 1 : curRangeStartPage - 1)
          }
        >
          이전
        </li>
        {Array.from(
          { length: curRangeEndPage - curRangeStartPage + 1 },
          (_, index) => (
            <li
              className={`${
                curRangeStartPage + index === page ? "active" : ""
              }`}
              onClick={() => setPage(curRangeStartPage + index)}
            >
              {curRangeStartPage + index}
            </li>
          )
        )}
        <li
          onClick={() =>
            setPage(isInEndRange ? totalPage : curRangeEndPage + 1)
          }
        >
          다음
        </li>
        <li onClick={() => setPage(totalPage)}>끝</li>
      </ul>
    </nav>
  );
};

export default Pagenation;
