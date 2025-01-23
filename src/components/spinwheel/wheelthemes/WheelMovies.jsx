import { useEffect, useState } from "react";
import { Wheel } from "spin-wheel";
import { AlignText } from "../constants";
import { loadFonts, loadImages } from "../util";
import { getRandomInt } from "../../../utils";
import { easeOutQuart } from "easing-utils";
import { motion } from "framer-motion";

// import images
import overlayImage from "./img/example-2-overlay.svg";

function initImage(obj, pName) {
  if (!obj[pName]) return null;
  const i = new Image();
  i.src = obj[pName];
  obj[pName] = i;
  return i;
}

const WheelMovies = ({ items, onFinished }) => {
  const [isLaunched, setIsLaunched] = useState(false);
  const [isSuccess, setIsSuccess] = useState(true);

  const handleLaunch = () => {
    if (!isLaunched && isSuccess) {
      setIsLaunched(true);
      setTimeout(() => {
        spinLuckey();
        setIsSuccess(false);
      }, 2000);
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
    rotationSpeedMax: 700,
    rotationResistance: -70,
    lineWidth: 0,
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

  const spinLuckey = () => {
    if (!isRunning) {
      const duration = 6000;
      const itemIndex = getRandomInt(0, items.length - 1);
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
      <div className="relative z-[5] wheel-container w-full min-h-[90vw] md:min-h-[600px] overflow-hidden"></div>
      <div className="py-4">
        <div className="relative h-28">
          {/* đường chưa đi qua */}
          <div className="absolute inset-x-0 mx-auto z-[2] rounded-t-lg -top-8 h-36 w-[6px] bg-slate-400"></div>
          {isLaunched ? (
            <>
              <motion.div
                className="absolute inset-x-0 mx-auto z-[3] rounded-t-lg -top-8 h-36 w-[6px] bg-orange-400"
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
                className="absolute inset-x-0 mx-auto z-[2] rounded-t-lg -top-7 h-36 w-[4px] bg-orange-600 blur-md"
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
                animate={{ y: "-9rem" }}
                transition={{ duration: 2, ease: "easeOut" }}
                className="absolute inset-x-0 mx-auto top-0 z-[4] bottom-0"
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
        <div className="flex justify-center">
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
              "relative z-[5] px-6 py-3 mb-3 text-white rounded-lg shadow-lg" +
              (!isLaunched && isSuccess
                ? " bg-red-500  hover:bg-red-600"
                : " bg-gray-500  hover:bg-gray-600")
            }
          >
            Quay Thưởng
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default WheelMovies;
