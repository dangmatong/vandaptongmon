import Header from "../Header";
import "./Layout.css";
import { confettiSnow } from "../../utils";
import { useEffect } from "react";

const Layout = ({ children }) => {
  useEffect(() => {
    confettiSnow();
  }, []);

  return (
    <div className="relative bg-small-layout md:bg-large-layout h-screen w-screen overflow-y-auto">
      <div className="overlay absolute w-full">
        <div className="bg-container container py-5 z-[1]">
          <div className=" bg-main min-h-[90vh] pt-2 py-5 md:p-5 rounded-md shadow-md">
            <div className="relative">
              <div className="absolute z-0 grid grid-cols-3 w-full left-0 top-0 h-44">
                <div className="col-span-1 flex justify-start">
                  <div className="phao-hoa h-full w-52"></div>
                </div>
                <div className="col-span-1 flex justify-center">
                  <div className="chu-dong h-full w-52"></div>
                </div>
                <div className="col-span-1 flex justify-end">
                  <div className="long-den h-full w-52"></div>
                </div>
              </div>
            </div>
            <div className="relative w-full z-10 mt-16">
              <Header></Header>
              <main>{children}</main>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
