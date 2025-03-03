import { Link, NavLink } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <header className="Header">
      <nav>
        <Link
          className="logo"
          to="/"
        >
          종우의 연습공간
        </Link>

        <ul>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? "active" : "")}
              to="/posts"
            >
              자유 게시판
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
