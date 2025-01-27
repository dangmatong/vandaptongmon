import Modal from "react-modal";
import { useEffect, useState } from "react";
// import GiftBoxAnimation from "../components/GiftBoxAnimation";
import { confettiFireworks, calcTimeDuration } from "../utils";
import WheelMovies from "../components/spinwheel/wheelthemes/WheelMovies";
import eventApi from "../api/eventApi";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ResultEventList from "./ResultEventList";
import CountdownTimer from "../components/CountdownTimer";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
Modal.setAppElement("#root");

const segments = [
  //   "10.000 VND",
  //   "20.000 VND",
  //   "Chúc may mắn lần sau!",
  //   "20.000 VND",
  //   "30.000 VND",
  //   "Chúc may mắn lần sau!",
  //   "10.000 VND",
  //   "200.000 VND",
  //   "Chúc may mắn lần sau!",
  //   "20.000 VND",
  //   "500.000 VND",
  //   "10.000 VND",
  //   "Chúc may mắn lần sau!",
  //   "30.000 VND",
  //   "100.000 VND",
  //   "Chúc may mắn lần sau!",
];

const Event = () => {
  const { id } = useParams();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [resultGift, setResultGift] = useState([0, 0, 0, 0, 0, 0, 0, 0]);
  const [result, setResult] = useState("");
  const [reloadResult, setReloadReult] = useState(false);
  const [turnSpin, setTurnSpin] = useState();
  //   const rows = [];
  //   for (let i = 0; i < 8; i++) {
  //     rows.push(i);
  //   }
  const [items, setItems] = useState();
  const [errMessage, setErrMessage] = useState("");
  const [timeDown, setTimeDown] = useState();
  const [userEvent, setUserEvent] = useState({});
  const [titleTime, setTitleTime] = useState();
  const [expireEvent, setExpireEvent] = useState(false);
  const handleFinishTime = () => {
    console.log("object");
  };

  const getEventDetail = async (id) => {
    try {
      const res = await eventApi.getEventDetail(id);
      const event = res.data?.event;
      setUserEvent(res.data?.userEvent);
      setTurnSpin(res.data?.userEvent?.numberReceived);
      if (calcTimeDuration(event.startTime) >= 0) {
        setTimeDown(event.startTime);
      } else {
        if (calcTimeDuration(event.endTime) >= 0) {
          setTimeDown(event.endTime);
          setTitleTime("Event kết thúc sau:");
        } else {
          setExpireEvent(true);
        }
      }
      setItems(event?.items.map((el) => el));
      setErrMessage("");
    } catch (error) {
      console.log(error);
      setErrMessage(error?.response.data?.msg);
    }
  };
  useEffect(() => {
    if (id) {
      getEventDetail(id);
    }
  }, [id]);

  //   get result
  const getResult = async () => {
    try {
      const res = await eventApi.giftWheel({
        eventId: id,
      });
      const idx = items.findIndex((el) => res.data?.resultId == el.id);
      setTurnSpin((el) => --el);
      return { rs: true, idx };
    } catch (error) {
      let text = error?.response.data?.msg;
      toast.dismiss();
      toast(text, {
        position: "top-right",
        pauseOnFocusLoss: false,
        closeOnClick: true,
        autoClose: 1500,
      });
      return { result: false };
    }
  };

  // modal
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  // luckey wheel
  const onFinished = (e) => {
    setResult(items[e.currentIndex].label);
    openModal();
    confettiFireworks();
    setReloadReult((el) => !el);
  };

  // box gift
  const handleUpdateResultBox = (idx, val) => {
    let rs = [...resultGift];
    rs[idx] = val;
    setResultGift(rs);
  };

  return (
    <div>
      {/* <div className="giftbox">
        <div className="text-center text-lg font-bold text-gray-600 pt-6">
          ------- Đập hộp mù -------
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {rows.map((el) => (
            <GiftBoxAnimation
              key={el}
              idx={el}
              onUpdate={handleUpdateResultBox}
            ></GiftBoxAnimation>
          ))}
        </div>
      </div> */}
      <div className="flex items-center justify-center p-4">
        {timeDown ? (
          <CountdownTimer
            title={titleTime}
            targetTime={timeDown}
            onFinished={handleFinishTime}
          />
        ) : (
          ""
        )}
      </div>
      {items && !expireEvent ? (
        <>
          <div className="giftwheel">
            <div className="text-center text-lg font-bold text-teal-600 pt-6 uppercase">
              🍀🍀🍀 Vòng quay may mắn 🍀🍀🍀
            </div>
            <WheelMovies
              items={items}
              onFinished={(e) => onFinished(e)}
              onBeforeSpin={getResult}
            ></WheelMovies>
          </div>
          <div className="text-center font-bold text-emerald-600">
            Bạn còn {turnSpin != undefined ? turnSpin : "_"} lượt quay.
          </div>
          <Modal
            isOpen={modalIsOpen}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <div className="min-w-[80vw] md:min-w-[450px]">
              <div className="flex justify-between">
                <h2 className="text-xl font-bold">Kết quả thưởng</h2>
                <button onClick={closeModal}>X</button>
              </div>
              <div className="body ">
                {result.includes("VND") ? "Bạn nhận được: " : ""}
                {result}
              </div>
              <div className="footer flex justify-end mt-4">
                <button
                  className="px-2 py-1 bg-gray-400 rounded-md"
                  onClick={closeModal}
                >
                  Đóng
                </button>
              </div>
            </div>
          </Modal>
        </>
      ) : (
        <div className="text-center mb-4">
          {errMessage ? (
            <span className="text-red-600 rounded-md px-3 py-2 bg-red-200 inline-block">
              {errMessage}
            </span>
          ) : (
            <>
              {expireEvent ? (
                <span className="text-red-600 rounded-md px-3 py-2 bg-red-200 inline-block">
                  Event đã kết thúc!
                </span>
              ) : (
                <span className="text-gray-600 rounded-md px-3 py-2 bg-gray-200 inline-block">
                  Đang tải...
                </span>
              )}
            </>
          )}
        </div>
      )}
      <ResultEventList eventId={id} reload={reloadResult}></ResultEventList>
    </div>
  );
};

export default Event;
