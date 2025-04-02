import Header from "../Header";
import "./Layout.css";
import { confettiSnow } from "../../utils";
import { useEffect } from "react";

const Layout = ({ children }) => {
  useEffect(() => {
    setTimeout(() => {
      confettiSnow();
    }, 1000);

    return () => {
      localStorage.setItem("canvas-global", false);
    };
  }, []);

  return (
    <div className="relative bg-small-layout md:bg-large-layout h-screen w-screen overflow-y-auto">
      <div className="overlay absolute w-full">
        <div className="bg-container container py-5 z-[1]">
          <div className=" bg-main min-h-[90vh] pt-2 py-5 md:p-5 rounded-md shadow-md">
            <div className="relative">
              <div className="absolute z-0 grid grid-cols-3 w-full left-0 top-0 h-44">
                <div className="col-span-1 flex justify-start">
                  <div className="long-den-l h-20 w-full"></div>
                </div>
                <div className="col-span-1 flex justify-center">
                  <div className="chu-dong h-20 w-full"></div>
                </div>
                <div className="col-span-1 flex justify-end">
                  <div className="long-den-r h-20 w-full"></div>
                </div>
              </div>
            </div>
            <div className="relative w-full z-10 mt-16">
              <Header></Header>
              <main>{children}</main>
              <div className="text-center text-orange-400 italic my-2 font-bold">
                <h4>© 2024 LinhVuong - Tông môn Thục Sơn Kiếm Tông</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
