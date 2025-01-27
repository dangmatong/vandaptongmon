import { useEffect, useState } from "react";
import eventApi from "../api/eventApi";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { clearUserData } from "../utils/auth";

const Game = () => {
  const { setIsLoggedIn } = useAuth();
  const navigate = useNavigate();
  const handleRedirect = (id) => {
    navigate(`/game/${id}`);
  };
  const handleLogout = () => {
    clearUserData();
    setIsLoggedIn(false);
  };

  const [events, setEvents] = useState();
  const getEvents = async () => {
    try {
      const res = await eventApi.getEvents();
      setEvents(res.data);
    } catch (error) {
      let msg = error?.response.data?.msg;
      console.log(msg);
    }
  };
  useEffect(() => {
    getEvents();
  }, []);
  return (
    <div className="p-4">
      <div className="flex items-center justify-center p-4">
        <button onClick={handleLogout} className="underline text-red-500">
          Đăng xuất
        </button>
      </div>

      <div className="text-center text-lg font-bold text-teal-600 pb-6 uppercase">
        🍀🍀🍀 Danh sách các event 🍀🍀🍀
      </div>
      <div>
        {events ? (
          events.length ? (
            <div className="list-event grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {events.map((el) => (
                <motion.div
                  key={el._id}
                  whileHover={{ scale: 1.1 }}
                  className="max-w-sm w-full bg-gradient-to-r from-pink-500 to-yellow-500 shadow-lg rounded-2xl p-6"
                >
                  <div className="text-white">
                    <div className="text-center mb-4">
                      <h2 className="text-xl font-bold uppercase">{el.name}</h2>
                    </div>
                    <div className="mb-4">
                      <div className="italic">
                        Thời gian bắt đầu:{" "}
                        {dayjs(el.startTime).format("DD-MM-YYYY HH:mm:ss")}
                      </div>
                      <div className="italic">
                        Thời gian kết thúc:{" "}
                        {dayjs(el.endTime).format("DD-MM-YYYY HH:mm:ss")}
                      </div>
                    </div>
                    <div className="text-center">
                      <button
                        onClick={() => handleRedirect(el._id)}
                        className="p-2 rounded-lg shadow-lg bg-red-500 hover:bg-red-600"
                      >
                        Tham gia
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center mb-4">
              <span className="text-red-600 rounded-md px-3 py-2 bg-orange-200 inline-block">
                Chưa có event nào!
              </span>
            </div>
          )
        ) : (
          <div className="text-center mb-4">
            <span className="text-gray-600 rounded-md px-3 py-2 bg-gray-200 inline-block">
              Đang tải...
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Game;
