import { useState, useEffect, useRef } from "react";
import { fetchExcelData } from "../controllers/ExcelController";
import {
  removeDiacritics,
  highlightMatchesWithPositions,
  addSpaceBeforeQuestionMark,
} from "../utils";

import ripple from "../assets/images/Ripple.gif";
import freshImg from "../assets/images/hac-vo-thuong.png";
import pasteImg from "../assets/images/bach-vo-thuong.png";
import refreshAudio from "../assets/audio/woosh-230554.mp3";

import { useStore } from "../utils/store";
import useAudioPlayer from "../hooks/useAudioPlayer";
import { toast } from "react-toastify";

const Home = () => {
  const [data, setData] = useState([]);
  const [text, setText] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [excelData, setExcelData] = useState([]);
  const { sound } = useStore();
  const inputRef = useRef(null);
  const { restart, pause } = useAudioPlayer(refreshAudio, false);

  const changeSearch = (val) => {
    setText(val);
  };

  //  get data in file excel
  useEffect(() => {
    const loadExcel = async () => {
      try {
        const rs = await fetchExcelData();
        const formatData = rs.map((el, idx) => ({
          id: "question_" + idx,
          movieName: el["Tên phim"] || "",
          question: el["Câu hỏi"] || "",
          answer: el["Đáp án"] || "",
        }));

        setExcelData(formatData);
      } catch (error) {
        console.error("Failed to load users:", error);
      } finally {
        setLoading(false);
      }
    };

    loadExcel();
  }, []);

  // handle input change value
  useEffect(() => {
    const newText = addSpaceBeforeQuestionMark(text ? text.trim() : "");
    if (newText != undefined && newText.length >= 3) {
      setLoading(true);
    }

    const handler = setTimeout(() => {
      let dataFilter = [];
      if (newText != undefined && newText.length >= 3) {
        dataFilter = excelData.filter((el) =>
          removeDiacritics(el.question.toLowerCase()).includes(
            removeDiacritics(newText.toLowerCase())
          )
        );
      }
      setLoading(false);
      setData(dataFilter);
    }, 200);

    return () => {
      clearTimeout(handler);
    };
  }, [text]);

  useEffect(() => {
    if (!sound) {
      pause(false);
    }
  }, [sound]);

  // Hàm xử lý khi nhấn nút Paste
  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (sound) restart();

      setTimeout(() => {
        changeSearch(text);
      }, 100);

      toast.dismiss();
      toast("🚀 Đã dán nội dung", {
        position: "top-right",
        pauseOnFocusLoss: false,
        closeOnClick: true,
        autoClose: 1500,
      });
    } catch (err) {
      console.error("Failed to read clipboard contents: ", err);
    }
  };

  const handleRefresh = () => {
    if (sound) restart();
    inputRef.current.focus();

    setTimeout(() => {
      changeSearch("");
      setData([]);
    }, 100);

    toast.dismiss();
    toast("🚀 Đã xóa tìm kiếm", {
      position: "top-right",
      pauseOnFocusLoss: false,
      closeOnClick: true,
      autoClose: 1500,
    });
  };

  return (
    <div>
      <div className="container py-5 h-full">
        <div className="flex flex-col items-center gap-5">
          <div className="w-full md:w-2/3">
            <div>
              <div className="relative">
                <input
                  autoFocus
                  ref={inputRef}
                  id="search"
                  value={text || ""}
                  className="peer w-full drop-shadow-md p-3 rounded-md ring-2 text-orange-500 ring-orange-400 focus:text-red-500 focus:ring-red-400 focus:outline-none"
                  placeholder="Nhập tìm kiếm..."
                  type="text"
                  onChange={(e) => changeSearch(e.target.value)}
                />
                <label
                  htmlFor="search"
                  className="absolute border-x-2 border-orange-400 rounded-md text-sm text-orange-500 duration-200 transform -translate-y-4 scale-80 top-1 z-10 origin-[0] bg-white px-2 peer-placeholder-shown:border-x-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-80 peer-focus:-translate-y-4 peer-focus:border-x-2 peer-focus:drop-shadow-md peer-focus:text-red-500 peer-focus:border-red-400 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                >
                  Nhấp vào để điền từ tìm kiếm
                </label>
              </div>
              <span className="text-sm text-gray-700">
                <span className="text-red-600">(*)</span> Chính xác hơn với 3 từ
                liền kề.
              </span>
            </div>
            <div className="my-2 text-center text-lg">
              <p className="title-action font-bold">Kỹ năng thiên đạo</p>
              <p className="text-sm text-gray-700"> (Nhấn để sử dụng)</p>

              <div className="flex justify-center items-center my-2 gap-3">
                <button
                  className="p-1 rounded-md shadow-md"
                  title="Xóa bỏ"
                  onClick={handleRefresh}
                >
                  <img className="h-12" src={freshImg} alt="Xóa bỏ" />
                </button>
                <span> {"<=>"} </span>
                <button
                  className="p-1 rounded-md shadow-md"
                  title="Dán chữ"
                  onClick={handlePaste}
                >
                  <img className="h-12" src={pasteImg} alt="Dán chữ" />
                </button>
              </div>
            </div>
          </div>

          {!loading ? (
            <div className="w-full md:w-2/3 px-4">
              {data.length ? (
                data.map((item) => (
                  <ul key={item.id} className="w-full">
                    <li className="p-4 bg-gray-200 rounded-md w-full mb-3">
                      <h3 className="text-lg font-bold text-gray-500">
                        [Film] - {item.movieName}
                      </h3>
                      <h4 className="font-bold text-orange-500">
                        [?] -{" "}
                        {highlightMatchesWithPositions(item.question, text)}
                      </h4>
                      <p>
                        {"=>"}{" "}
                        <strong className="text-green-600">
                          {item.answer}
                        </strong>
                      </p>
                    </li>
                  </ul>
                ))
              ) : (
                <div className="p-4 bg-gray-200 text-gray-500 rounded-md w-full">
                  <span className="text-sm">
                    {text != undefined
                      ? text.length >= 3
                        ? `Đừng nản nếu không tìm thấy, hãy nhập một số từ nổi bật liền kề trong câu hỏi để tìm😊(nếu không tìm thấy hãy đóng góp ý kiến nhé😘😘😘).`
                        : "Hình như đạo hữu chưa nhập đủ 3 ký tự trở lên 😠😠😠."
                      : "Hãy nhập gì đó để bắt đầu tìm kiếm 🤗🤗🤗."}
                  </span>
                </div>
              )}
            </div>
          ) : (
            <div className="w-full flex justify-center">
              <img className="h-20" src={ripple} alt="Loading" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
