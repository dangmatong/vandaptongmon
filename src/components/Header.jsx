import { useNavigate } from "react-router-dom";
import { useStore } from "../utils/store";

const Header = () => {
  const navigate = useNavigate();
  const { sound, setSound } = useStore();
  const changeSound = () => {
    setSound(!sound);
  };

  return (
    <div className="w-full text-center px-3 py-5">
      <div className="text-sm">
        <div className="flex justify-center gap-3">
          <span className="underline" onClick={() => navigate("/")}>
            Vấn đáp
          </span>
          <span className="underline" onClick={() => navigate("/game")}>
            Game Pikachu
          </span>
        </div>
      </div>
      <h1 className="title font-bold text-3xl leading-normal md:text-6xl md:leading-normal">
        Vấn Đáp Tông Môn
      </h1>
      <button onClick={changeSound}>{sound ? "🔊" : "🔇"}</button>
      <p className="text-sm text-gray-700">
        Nơi tập hợp những kiến thức trong giới tu tiên
      </p>
    </div>
  );
};

export default Header;
