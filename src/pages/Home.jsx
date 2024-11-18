import { useState, useEffect } from "react";
import { fetchExcelData } from "../controllers/ExcelController";

import ripple from "../assets/images/Ripple.gif";
import freshImg from "../assets/images/hac-vo-thuong.png";
import pasteImg from "../assets/images/bach-vo-thuong.png";
import refreshAudio from "../assets/audio/woosh-230554.mp3";

import { useStore } from "../utils/store";
import useAudio from "../hooks/useAudio";
import { toast } from "react-toastify";

const Home = () => {
  const [data, setData] = useState([]);
  const [text, setText] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [excelData, setExcelData] = useState([]);
  const { sound } = useStore();
  const [soundWoosh, setSoundWoosh] = useAudio(refreshAudio);

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
    if (text != undefined && text.length >= 3) {
      setLoading(true);
    }

    const handler = setTimeout(() => {
      let dataFilter = [];
      if (text != undefined && text.length >= 3) {
        dataFilter = excelData.filter((el) =>
          el.question.toLowerCase().includes(text.toLowerCase())
        );
      }
      setLoading(false);
      setData(dataFilter);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [text]);

  useEffect(() => {
    if (!sound) {
      setSoundWoosh(false);
    }
  }, [sound]);

  // Hàm xử lý khi nhấn nút Paste
  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setText(text);
      if (sound) setSoundWoosh(true);

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

  const handleRefresh = (evt) => {
    setText("");
    setData([]);
    if (sound) setSoundWoosh(true);

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
            <input
              value={text || ""}
              className="w-full p-3 rounded-md"
              placeholder="Chính xác hơn với 3 từ liền kề..."
              type="text"
              onChange={(e) => changeSearch(e.target.value)}
            />
            <div className="my-2 text-center text-lg">
              <p className="title-action font-bold">Kỹ năng thiên đạo</p>
              <p className="text-sm text-gray-700"> (Nhấn để sử dụng)</p>

              <div className="flex justify-center items-center my-2 gap-3">
                <button
                  className="p-1 rounded-md shadow-md"
                  title="Hủy hoại"
                  onClick={handleRefresh}
                >
                  <img className="h-12" src={freshImg} alt="Hủy hoại" />
                </button>
                <span> {"<=>"} </span>
                <button
                  className="p-1 rounded-md shadow-md"
                  title="Ký ức"
                  onClick={handlePaste}
                >
                  <img className="h-12" src={pasteImg} alt="Nhận ký ức" />
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
                        [?] - {item.question}
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
                        ? "Cố gắng nào đạo hữu sắp tìm ra rồi 🤥🤥🤥."
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
