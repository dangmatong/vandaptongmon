import { useState, useEffect } from "react";
import { fetchExcelData } from "../controllers/ExcelController";

import ripple from "../assets/images/Ripple.gif";
import freshImg from "../assets/images/hac-vo-thuong.png";
import pasteImg from "../assets/images/bach-vo-thuong.png";
import meodenAudio from "../assets/audio/Nhạc mèo đen.mp3";
import { useStore } from "../utils/store";
import useAudio from "../hooks/useAudio";

const Home = () => {
  const [data, setData] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [excelData, setExcelData] = useState([]);
  const { sound } = useStore();
  const [playing, setPlaying] = useAudio(meodenAudio);

  const changeSearch = (val) => {
    setText(val);
  };

  //  get data in file excel
  useEffect(() => {
    const loadExcel = async () => {
      try {
        const rs = await fetchExcelData();
        const filteredData = rs.filter((item) => item.A !== undefined);
        const formatData = filteredData.map((el) => ({
          id: el.__EMPTY,
          movieName: el.A || "",
          question: el.B || "",
          answer: el.C || "",
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
    if (text.length >= 3) {
      setLoading(true);
      if (sound) setPlaying(true);
    }

    const handler = setTimeout(() => {
      let dataFilter = [];
      if (text.length >= 3) {
        dataFilter = excelData.filter((el) =>
          el.question.toLowerCase().includes(text.toLowerCase())
        );
      }
      setLoading(false);
      setData(dataFilter);
    }, 300);

    return () => {
      clearTimeout(handler);
      setPlaying(false);
    };
  }, [text]);

  useEffect(() => {
    if (!sound) {
      setPlaying(false);
    }
  }, [sound]);

  // Hàm xử lý khi nhấn nút Paste
  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setText(text);
    } catch (err) {
      console.error("Failed to read clipboard contents: ", err);
    }
  };

  const handleRefresh = (evt) => {
    setText("");
    setData([]);
  };

  return (
    <div>
      <div className="container py-5">
        <div className="flex flex-col items-center gap-5">
          <div className="w-full md:w-2/3">
            <input
              value={text}
              className="w-full p-3 rounded-md"
              placeholder="Nhập trên 3 từ tìm kiếm..."
              type="text"
              onChange={(e) => changeSearch(e.target.value)}
            />
            <div className="my-2 text-center text-lg">
              <p className="title-action font-bold">Ký năng thiên đạo</p>
              <div className="flex justify-center items-center my-2 gap-3">
                <button title="Hủy hoại" onClick={handleRefresh}>
                  <img className="h-12" src={freshImg} alt="Hủy hoại" />
                </button>
                <span> {"<=>"} </span>
                <button title="Ký ức" onClick={handlePaste}>
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
                    {text.length >= 3
                      ? "Cố gắng nào đạo hữu sắp tìm ra rồi 🤥🤥🤥."
                      : "Hình như đạo hữu không xuất ra nổi 3 ý niệm 😠😠😠."}
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
