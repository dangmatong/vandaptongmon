import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const CountdownTimer = ({ title, targetTime, onFinished }) => {
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date(targetTime).getTime();

    const interval = setInterval(() => {
      const currentTime = new Date().getTime();
      const timeDiff = targetDate - currentTime;

      if (timeDiff <= 0) {
        clearInterval(interval);
        setTimeRemaining({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });

        if (onFinished) onFinished();
      } else {
        setTimeRemaining({
          days: Math.floor(timeDiff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((timeDiff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((timeDiff / (1000 * 60)) % 60),
          seconds: Math.floor((timeDiff / 1000) % 60),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetTime]);

  const { days, hours, minutes, seconds } = timeRemaining;

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-l from-green-500 via-green-500/50 to-green-400 rounded-xl shadow-lg w-full max-w-md space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">
        {title ? title : "Event diễn ra sau"}
      </h2>

      <div className="grid grid-cols-4 gap-4">
        {/* Day Box */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center p-4 bg-blue-100 rounded-lg shadow-md"
        >
          <span className="text-3xl font-bold text-blue-600">{days}</span>
          <span className="text-sm font-medium text-gray-700">Ngày</span>
        </motion.div>

        {/* Hours Box */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center p-4 bg-green-100 rounded-lg shadow-md"
        >
          <span className="text-3xl font-bold text-green-600">{hours}</span>
          <span className="text-sm font-medium text-gray-700">giờ</span>
        </motion.div>

        {/* Minutes Box */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center p-4 bg-yellow-100 rounded-lg shadow-md"
        >
          <span className="text-3xl font-bold text-yellow-600">{minutes}</span>
          <span className="text-sm font-medium text-gray-700">phút</span>
        </motion.div>

        {/* Seconds Box */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center p-4 bg-red-100 rounded-lg shadow-md"
        >
          <span className="text-3xl font-bold text-red-600">{seconds}</span>
          <span className="text-sm font-medium text-gray-700">dây</span>
        </motion.div>
      </div>
    </div>
  );
};

export default CountdownTimer;
