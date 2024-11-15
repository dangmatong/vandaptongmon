import Header from "../Header";
import "./Layout.css";

const Layout = ({ children }) => {
  return (
    <div id="layout">
      <div className="container min-h-screen">
        <Header></Header>
        <main>{children}</main>
      </div>
    </div>
  );
};

export default Layout;
