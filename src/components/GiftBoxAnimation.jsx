import { useReducer, useState } from "react";
import { confettiSchoolPride } from "../utils";

import box from "../assets/images/box.png";
import boxLid from "../assets/images/box-lid.png";

const init_state = {
  move: "move",
  jump: "",
  rotated: "",
  rotating: "",
};
export default function GiftBoxAnimation({ idx, onUpdate }) {
  const [score, setScore] = useState(0);
  const [state, setState] = useReducer(
    (state, new_state) => ({
      ...state,
      ...new_state,
    }),
    init_state
  );

  const { move, rotating, rotated, jump } = state;

  function animate() {
    let isDone = rotated === "rotated" ? true : false;

    if (!isDone) {
      let sc = 0;
      setState({ rotating: "rotating" });
      setTimeout(() => {
        setState({ jump: "jump" });
        confettiSchoolPride();
        sc = Math.floor(Math.random() * 10) + 1;
        onUpdate(idx, sc);
        setScore(sc);
      }, 300);
      setTimeout(() => {
        setState({ rotated: "rotated" });
      }, 100);
    } else {
      return;
      setState(init_state);
    }
    let moving = move === "move" ? "" : "move";
    setState({ move: moving });
  }

  return (
    <div className="gift-box pt-20">
      <div className="flex justify-center items-center relative">
        <div
          className={`text-gray-800 bg-[rgba(255,255,255,0.7)] rounded-full px-3 py-1 kuku ${jump}`}
        >
          <span>{score}</span>
        </div>
        <div className="text-center relative">
          <img
            className={`lid ${move} ${rotating} ${rotated}`}
            src={boxLid}
            alt="box-lid"
          />
          <button className="box" onClick={() => animate()}>
            <img src={box} alt="box" />
          </button>
        </div>
      </div>
    </div>
  );
}
