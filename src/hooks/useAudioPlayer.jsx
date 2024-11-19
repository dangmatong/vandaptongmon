import { useState, useEffect } from "react";

const useAudioPlayer = (url, isLoop = false, volume = 1) => {
  const [audio] = useState(new Audio(url));
  audio.volume = volume;

  const [isPlaying, setIsPlaying] = useState(false);

  const play = () => {
    audio.play();
    setIsPlaying(true);
  };

  const pause = () => {
    audio.pause();
    setIsPlaying(false);
  };
  const restart = () => {
    audio.currentTime = 0;
    if (isPlaying) {
      pause();
    }
    play();
  };

  useEffect(() => {
    const handleEnded = () => {
      if (isLoop) {
        audio.currentTime = 0;
        audio.play().catch((err) => {
          console.error("Error while replaying audio:", err);
        });
      } else {
        setIsPlaying(false);
      }
    };

    audio.addEventListener("ended", handleEnded);
    return () => {
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  return { isPlaying, restart, play, pause };
};

export default useAudioPlayer;
