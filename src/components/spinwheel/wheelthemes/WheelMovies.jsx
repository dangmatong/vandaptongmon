import { useEffect, useState } from "react";
import { Wheel } from "spin-wheel";
import { AlignText } from "../constants";
import { loadFonts } from "../util";
import { getRandomInt } from "../../../utils";
import { easeOutQuart } from "easing-utils";

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
  const itemsValid = items
    ? items
    : [
        {
          label: "Not found",
        },
      ];

  const onRest = (e) => {
    onFinished(e);
    setIsRunning(false);
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
    items: itemsValid,
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

      const container = document.querySelector(".wheel-container");
      const wheelInit = new Wheel(container);
      wheelInit.init({
        ...propsWheel,
        isInteractive: false,
        rotation: wheelInit.rotation,
      });
      setWheel(wheelInit);
    }
    run();
  }, []);

  const spinLuckey = () => {
    if (!isRunning) {
      const duration = 6000;
      const itemIndex = getRandomInt(0, itemsValid.length - 1);
      if (wheel) {
        wheel.spinToItem(
          itemIndex,
          duration,
          false,
          itemsValid.length,
          1,
          (n) => {
            return easeOutQuart(n);
          }
        );
      }
      setIsRunning(true);
    }
  };

  return (
    <div
      onClick={spinLuckey}
      className="wheel-container w-full min-h-[90vw] md:min-h-[600px] overflow-hidden"
    ></div>
  );
};

export default WheelMovies;
