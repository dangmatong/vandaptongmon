import { useState, useEffect } from "react";

const useAudio = (url, loop = false, volume = 1) => {
  const [audio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const handlePlay = async () => {
      if (playing) {
        try {
          await audio.play();
        } catch (err) {
          console.error("Error while playing audio:", err);
        }
      } else {
        audio.pause();
      }
    };

    handlePlay();
  }, [playing]);

  useEffect(() => {
    audio.volume = volume;

    const handleEnded = () => {
      if (loop) {
        audio.currentTime = 0;
        audio.play().catch((err) => {
          console.error("Error while replaying audio:", err);
        });
      } else {
        setPlaying(false);
      }
    };

    audio.addEventListener("ended", handleEnded);
    return () => {
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  return [playing, setPlaying];
};

export default useAudio;
