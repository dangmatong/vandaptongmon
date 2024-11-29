import Header from "../Header";
import "./Layout.css";

const Layout = ({ children }) => {
  return (
    <div id="layout" className="relative h-screen w-screen overflow-y-auto">
      <div className="overlay absolute inset-0">
        <div className="bg-container container py-5">
          <div className="bg-main min-h-[90vh] pt-2 py-5 md:p-5 rounded-md shadow-md">
            <Header></Header>
            <main>{children}</main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
