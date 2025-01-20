import { useEffect, useState } from "react";
import { Wheel } from "spin-wheel";
import { AlignText } from "../constants";
import { loadFonts } from "../util";
import { getRandomInt } from "../../../utils";

// import images
import wheelImage from "./img/example-0-image.svg";
import overlayImage from "./img/example-0-overlay.svg";

function initImage(obj, pName) {
  if (!obj[pName]) return null;
  const i = new Image();
  i.src = obj[pName];
  obj[pName] = i;
  return i;
}

const Wheelworkout = ({ items, onFinished }) => {
  const itemsValid = items
    ? items
    : [
        {
          label: "Not found",
        },
      ];
  const propsWheel = {
    name: "Workout",
    radius: 0.84,
    itemLabelRadius: 0.93,
    itemLabelRadiusMax: 0.35,
    itemLabelRotation: 180,
    itemLabelAlign: AlignText.left,
    itemLabelColors: ["#fff"],
    itemLabelBaselineOffset: -0.07,
    itemLabelFont: "Amatic SC",
    itemLabelFontSizeMax: 55,
    itemBackgroundColors: [
      "#ffc93c",
      "#66bfbf",
      "#a2d5f2",
      "#515070",
      "#43658b",
      "#ed6663",
      "#d54062",
      "#F0CF50",
      "#EE4040",
      "#815CD1",
      "#3DA5E0",
      "#34A24F",
      "#F9AA1F",
      "#EC3F3F",
      "#FF9000",
    ],
    rotationSpeedMax: 500,
    rotationResistance: -100,
    lineWidth: 1,
    lineColor: "#fff",
    image: wheelImage,
    overlayImage: overlayImage,
    items: itemsValid,
    onRest: (e) => {
      onFinished(e);
      setIsRunning(false);
    },
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
      // const duration = itemsValid.length * 1000;
      const duration = 4000;
      const itemIndex = getRandomInt(0, itemsValid.length - 1);
      if (wheel) {
        wheel.spinToItem(itemIndex, duration, false, 2, 1);
      }
      setIsRunning(true);
    }
  };

  return (
    <div
      onClick={spinLuckey}
      className="wheel-container w-full h-full overflow-hidden"
    ></div>
  );
};

export default Wheelworkout;