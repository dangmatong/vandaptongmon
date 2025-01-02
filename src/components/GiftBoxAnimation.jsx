import { useReducer, useState } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

import box from "../assets/images/box.png";
import boxLid from "../assets/images/box-lid.png";

const init_state = {
  move: "move",
  jump: "",
  rotated: "",
  rotating: "",
};
export default function GiftBoxAnimation({ idx, onUpdate }) {
  const { width, height } = useWindowSize();
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
        sc = Math.floor(Math.random() * 10) + 1;
        onUpdate(idx, sc);
        setScore(sc);
      }, 300);
      setTimeout(() => {
        setState({ rotated: "rotated" });
      }, 1000);
    } else {
      setState(init_state);
    }
    let moving = move === "move" ? "" : "move";
    setState({ move: moving });
  }

  return (
    <div className="gift-box flex justify-center items-center relative pt-20">
      {jump === "jump" ? (
        <Confetti width={width} height={height}></Confetti>
      ) : (
        ""
      )}
      <div
        className={`text-gray-800 bg-white rounded-md px-2 py-1 kuku ${jump}`}
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
  );
}
