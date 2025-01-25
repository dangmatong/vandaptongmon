import { useEffect, useState } from "react";
import eventApi from "../api/eventApi";
import { Link } from "react-router-dom";

const Game = () => {
  const [events, setEvents] = useState();
  const getEvents = async () => {
    try {
      const res = await eventApi.getEvents();
      setEvents(res.datas);
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
      <div className="text-center text-lg font-bold text-teal-600 py-6 uppercase">
        🍀🍀🍀 Danh sách các event 🍀🍀🍀
      </div>
      <div className="list-event grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {events &&
          events.map((el) => (
            <div
              key={el._id}
              className="rounded-lg shadow-lg p-4 bg-gradient-to-tr from-green-400 to-green-500 via-transparent"
            >
              <div className="text-center mb-4">
                <h3 className="text-xl text-red-600 uppercase">{el.name}</h3>
              </div>
              <div className="mb-2"></div>
              <div className="text-center">
                <Link
                  to={`/game/${el._id}`}
                  className="p-2 text-white rounded-lg shadow-lg bg-red-500  hover:bg-red-600"
                >
                  Tham gia
                </Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Game;
