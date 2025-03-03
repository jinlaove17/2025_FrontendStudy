import { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import "./Layout.css";
import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
  header?: ReactNode;
  footer?: ReactNode;
}

const Layout = ({ header = <Header />, footer = <Footer /> }: LayoutProps) => {
  return (
    <div className="Layout">
      {header}

      <main>
        <Outlet />
      </main>

      {footer}
    </div>
  );
};

export default Layout;
