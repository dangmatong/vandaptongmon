import { useEffect, useState } from "react";
import { Wheel } from "spin-wheel";
import { AlignText } from "../constants";
import { loadFonts, loadImages } from "../util";
import { easeOutQuart } from "easing-utils";
import { motion } from "framer-motion";
import { getRandomInt } from "../../../utils";

// import images
import overlayImage from "./img/example-2-overlay.svg";

function initImage(obj, pName) {
  if (!obj[pName]) return null;
  const i = new Image();
  i.src = obj[pName];
  obj[pName] = i;
  return i;
}

const WheelMovies = ({ items, onFinished, onBeforeSpin }) => {
  const [isLaunched, setIsLaunched] = useState(false);
  const [isSuccess, setIsSuccess] = useState(true);

  const handleLaunch = async () => {
    if (isSuccess) {
      setIsSuccess(false);
      let itemIndex;
      if (onBeforeSpin) {
        let { rs, idx } = await onBeforeSpin();
        if (!rs) {
          setIsSuccess(true);
          return;
        }
        itemIndex = idx;
      } else {
        itemIndex = getRandomInt(0, items.length - 1);
      }

      if (!isLaunched) {
        setIsLaunched(true);
        setTimeout(() => {
          spinLuckey(itemIndex);
        }, 2000);
      }
    }
  };

  const onRest = (e) => {
    onFinished(e);
    setIsRunning(false);
    setIsSuccess(true);
    setIsLaunched(false);
  };

  const propsWheel = {
    name: "Movies",
    radius: 0.88,
    itemLabelRadius: 0.92,
    itemLabelRadiusMax: 0.4,
    itemLabelRotation: 0,
    itemLabelAlign: AlignText.right,
    itemLabelBaselineOffset: -0.13,
    itemLabelFont: "Pragati Narrow",
    itemBackgroundColors: ["#c7160c", "#fff"],
    itemLabelColors: ["#fff", "#000"],
    itemLabelFontSizeMax: 32,
    rotationSpeedMax: 700,
    rotationResistance: -70,
    lineWidth: 1,
    lineColor: "#fff",
    overlayImage: overlayImage,
    items: items,
    onRest: onRest,
  };

  const images = [];

  // Convert image urls into actual images:
  images.push(initImage(propsWheel, "image"));
  images.push(initImage(propsWheel, "overlayImage"));
  for (const item of propsWheel.items) {
    images.push(initImage(item, "image"));
  }

  const [isRunning, setIsRunning] = useState(false);
  const [wheel, setWheel] = useState();
  useEffect(() => {
    async function run() {
      await loadFonts([propsWheel.itemLabelFont]);
      await loadImages(images);

      const container = document.querySelector(".wheel-container");
      if (!wheel) {
        const wheelInit = new Wheel(container);
        wheelInit.init({
          ...propsWheel,
          isInteractive: false,
          rotation: wheelInit.rotation,
        });
        setWheel(wheelInit);
      } else {
        wheel.init({
          ...propsWheel,
          isInteractive: false,
          rotation: wheel.rotation,
        });
      }
    }
    run();
  }, [items]);

  const spinLuckey = (itemIndex) => {
    if (!isRunning) {
      const duration = 6000;
      if (wheel) {
        wheel.spinToItem(itemIndex, duration, false, items.length, 1, (n) => {
          return easeOutQuart(n);
        });
      }
      setIsRunning(true);
    }
  };

  return (
    <div className="w-full p-4">
      {items ? (
        <>
          <div className="relative z-[5] wheel-container w-full min-h-[90vw] md:min-h-[600px] overflow-hidden"></div>
          <div className="py-3">
            <div className="relative h-24">
              {/* đường chưa đi qua */}
              <div className="absolute inset-x-0 mx-auto z-[2] rounded-t-lg -top-9 h-36 w-[6px] bg-slate-400"></div>
              {isLaunched ? (
                <>
                  <motion.div
                    className="absolute inset-x-0 mx-auto z-[3] rounded-t-lg -top-9 h-36 w-[6px] bg-orange-400"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{
                      duration: 2,
                      ease: "easeOut",
                    }}
                    style={{
                      transformOrigin: "bottom",
                    }}
                  />
                  {/* hiệu ứng nhòe */}
                  <motion.div
                    className="absolute inset-x-0 mx-auto z-[2] rounded-t-lg -top-9 h-36 w-[4px] bg-orange-600 blur-md"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{
                      duration: 2,
                      ease: "easeOut",
                    }}
                    style={{
                      transformOrigin: "bottom", // Điểm bắt đầu cháy từ dưới
                    }}
                  />
                </>
              ) : (
                ""
              )}
              {/* đường đã đi qua */}
              {isLaunched && (
                <>
                  {/* hiệu ứng đi lên */}
                  <motion.div
                    initial={{ y: 0 }}
                    animate={{ y: "-8.5rem" }}
                    transition={{ duration: 2, ease: "easeOut", delay: 0.15 }}
                    className="absolute inset-x-0 mx-auto z-[4] bottom-0"
                  >
                    {/* Hiệu ứng nhấp nháy */}
                    <motion.div
                      initial={{ scale: 1, opacity: 1 }}
                      animate={{ scale: [1, 1.2, 0.7], opacity: [1, 0.8, 1] }}
                      transition={{
                        repeat: Infinity,
                        duration: 0.7,
                        ease: "easeInOut",
                      }}
                      className="absolute inset-x-0 mx-auto bottom-4 w-2 h-2 rounded-sm bg-orange-200"
                    ></motion.div>
                    <motion.div
                      initial={{ scale: 1, opacity: 1 }}
                      animate={{ scale: [1, 1.4, 0.9], opacity: [1, 0.6, 1] }}
                      transition={{
                        repeat: Infinity,
                        duration: 0.7,
                        ease: "easeInOut",
                        delay: 0.2,
                      }}
                      className="absolute inset-x-0 mx-auto bottom-2 w-2 h-2 rounded-sm bg-orange-300"
                    ></motion.div>
                    <motion.div
                      initial={{ scale: 1, opacity: 1 }}
                      animate={{ scale: [1, 1.3, 0.7], opacity: [1, 0.7, 1] }}
                      transition={{
                        repeat: Infinity,
                        duration: 0.7,
                        ease: "easeInOut",
                        delay: 0.2,
                      }}
                      className="absolute inset-x-0 mx-auto bottom-0 w-2 h-2 rounded-sm bg-orange-400"
                    ></motion.div>
                  </motion.div>
                </>
              )}
            </div>
            {/* nút kích hoạt */}
            <div className="flex flex-col items-center">
              <div>
                <motion.button
                  onClick={handleLaunch}
                  whileHover={{
                    scale: 1.1, // Nút lớn hơn một chút
                    y: -5, // Nổi lên
                    boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.3)", // Hiệu ứng đổ bóng
                  }}
                  whileTap={{
                    scale: 0.95, // Nút nhỏ lại một chút khi nhấn
                    y: 0, // Trở lại vị trí ban đầu
                    boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.2)", // Bóng nhẹ hơn
                  }}
                  className={
                    "relative z-[5] p-5 mb-3 text-white rounded-full shadow-lg" +
                    (!isLaunched && isSuccess
                      ? " bg-red-500  hover:bg-red-600 text-white"
                      : " bg-gray-500  hover:bg-gray-600 text-gray-400")
                  }
                >
                  <motion.svg
                    className={"h-5 "}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    animate={isLaunched ? { rotate: 360 } : {}}
                    transition={{
                      repeat: isLaunched ? Infinity : undefined,
                      duration: 2,
                      ease: "linear",
                    }}
                  >
                    <path
                      fill="currentColor"
                      d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1-11 11.4-22.4 15.8-34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z"
                    />
                  </motion.svg>
                </motion.button>
              </div>
              <span className="text-sm text-gray-600">
                Nhấn vào nút bánh răng để quay thưởng.
              </span>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center text-gray-500">Đang tải dữ liệu...</div>
      )}
    </div>
  );
};

export default WheelMovies;
