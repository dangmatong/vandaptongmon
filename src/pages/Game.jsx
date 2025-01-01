import WheelComponent from "../components/Wheel";
import "react-wheel-of-prizes/dist/index.css";
import Modal from "react-modal";
import { useState } from "react";

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
  "Chúc may mắn lần sau!",
  "20.000 VND",
  "10.000 VND",
  "Chúc may mắn lần sau!",
  "20.000 VND",
  "10.000 VND",
  "Chúc may mắn lần sau!",
  "30.000 VND",
];
const segColors = [
  "#EE4040",
  "#F0CF50",
  "#815CD1",
  "#3DA5E0",
  "#34A24F",
  "#F9AA1F",
  "#EC3F3F",
  "#FF9000",
];

const About = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [result, setResult] = useState("");
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  const onFinished = (winner) => {
    setResult(winner);
    openModal();
  };

  return (
    <div className="flex justify-center p-4">
      <div className="relative">
        <WheelComponent
          segments={segments}
          segColors={segColors}
          onFinished={(winner) => onFinished(winner)}
          primaryColor="#6088d9"
          contrastColor="white"
          buttonText="Quay"
          isOnlyOnce={true}
        />
      </div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="min-w-[80vw] md:min-w-[450px]">
          <div className="flex justify-between">
            <h2 className="text-xl font-bold">Kết quả thưởng</h2>
            <button onClick={closeModal}>X</button>
          </div>
          <div className="body">
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
