import Modal from "react-modal";
import { useState } from "react";
// import GiftBoxAnimation from "../components/GiftBoxAnimation";
import { confettiFireworks } from "../utils";
import WheelMovies from "../components/spinwheel/wheelthemes/WheelMovies";

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
  "10.000 VND",
  "20.000 VND",
  "Chúc may mắn lần sau!",
  "20.000 VND",
  "30.000 VND",
  "Chúc may mắn lần sau!",
  "10.000 VND",
  "200.000 VND",
  "Chúc may mắn lần sau!",
  "20.000 VND",
  "500.000 VND",
  "10.000 VND",
  "Chúc may mắn lần sau!",
  "30.000 VND",
  "100.000 VND",
  "Chúc may mắn lần sau!",
];

const About = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [resultGift, setResultGift] = useState([0, 0, 0, 0, 0, 0, 0, 0]);
  const [result, setResult] = useState("");
  const rows = [];
  for (let i = 0; i < 8; i++) {
    rows.push(i);
  }
  const items = segments.map((el) => ({ label: el }));

  // modal
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  // luckey wheel
  const onFinished = (e) => {
    setResult(segments[e.currentIndex]);
    openModal();
    confettiFireworks();
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
      <div className="giftwheel">
        <div className="text-center text-lg font-bold text-teal-600 pt-6 uppercase">
          🍀🍀🍀 Vòng quay may mắn 🍀🍀🍀
        </div>
        <WheelMovies
          items={items}
          winningSegment="200.000 VND"
          onFinished={(e) => onFinished(e)}
        ></WheelMovies>
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
    </div>
  );
};

export default About;
