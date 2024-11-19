import { useStore } from "../utils/store";
import { Link } from "react-router-dom";
import { useEffect } from "react";

import meodenAudio from "../assets/audio/Nhạc mèo đen.mp3";
import useAudioPlayer from "../hooks/useAudioPlayer";

const Header = () => {
  const { sound, setSound } = useStore();
  const { play, pause } = useAudioPlayer(meodenAudio, true, 0.2);
  const changeSound = () => {
    setSound(!sound);
  };

  useEffect(() => {
    if (sound) play();
    else pause();

    return () => {
      pause();
    };
  }, [sound]);

  return (
    <div className="w-full text-center px-3 py-5">
      <div className="text-sm">
        <div className="flex justify-center gap-3">
          <Link className="underline" to="/">
            Vấn đáp
          </Link>
          <Link className="underline" to="/contribute-comments">
            Đóng góp ý kiến
          </Link>
          <Link className="underline" to="/game">
            Game Pikachu
          </Link>
        </div>
      </div>
      <h1 className="title font-bold text-3xl leading-normal md:text-6xl md:leading-normal">
        Vấn Đáp Tông Môn
      </h1>
      <p className="text-sm mb-1 text-gray-700">
        Nơi tập hợp những kiến thức trong giới tu tiên
      </p>
      <button
        className="text-2xl p-1 rounded-md shadow-md bg-gray-200 opacity-85"
        onClick={changeSound}
      >
        {sound ? "🔊" : "🔇"}
      </button>
    </div>
  );
};

export default Header;
