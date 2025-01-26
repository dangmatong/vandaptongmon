import { useState } from "react";
import { useEffect } from "react";
import eventApi from "../api/eventApi";
import dayjs from "dayjs";

const sliceCharName = (n) => {
  return n ? n[0] : "";
};

const formattedAmount = (amount) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "decimal", // Dùng style 'decimal' để chỉ định kiểu số
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

const ResultEventList = ({ eventId, reload }) => {
  const [data, setData] = useState();
  const [filters, setFilters] = useState({
    owner: 1,
    page: 1,
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    limit: 10,
    totalDocuments: 0,
    totalPages: 0,
  });

  const changeFilters = (data) => {
    setFilters({
      ...filters,
      ...data,
    });
  };

  const getResultEvent = async () => {
    const res = await eventApi.getResultEvent(filters);
    setData(res.data);
    setPagination(res.pagination);
  };

  const prePage = () => {
    if (pagination.currentPage > 1) {
      changeFilters({ page: pagination.currentPage - 1 });
    }
  };
  const nextPage = () => {
    if (pagination.currentPage < pagination.totalPages) {
      changeFilters({ page: pagination.currentPage + 1 });
    }
  };

  useEffect(() => {
    if (filters.page != 1) {
      changeFilters({ page: 1 });
    } else {
      getResultEvent();
    }
  }, [reload]);

  useEffect(() => {
    setData();
    setTimeout(() => {
      if (eventId) {
        getResultEvent();
      }
    }, 300);
  }, [eventId, JSON.stringify(filters)]);
  return (
    <div className="p-4">
      <h2 className="text-center text-lg font-bold text-teal-600 pt-6 uppercase mb-4">
        🍀 Danh sách kết quả quay thưởng 🍀
      </h2>
      <div className="flex justify-center">
        <div className="shadow-xl  w-full max-w-96 border px-4 py-2 rounded-md">
          <h3 className="text-center text-red-600 border-b pb-2 mb-3">
            🔔 Chúc mừng các đạo hữu️ 🎉️🎊
          </h3>
          <div className="mb-3">
            <div className="flex justify-center gap-4 mb-3 text-white">
              <button
                onClick={() => changeFilters({ owner: 1, page: 1 })}
                className="px-2 py-1 bg-blue-500 rounded-lg hover:bg-blue-600"
              >
                Cá nhân
              </button>
              <button
                onClick={() => changeFilters({ owner: 0, page: 1 })}
                className="px-2 py-1 bg-orange-500 rounded-lg hover:bg-orange-600"
              >
                Tất cả
              </button>
            </div>
            <div className="flex flex-col gap-2 max-h-96 overflow-y-auto px-1">
              {data ? (
                data.length ? (
                  data.map((el) => (
                    <div
                      key={el._id}
                      className="px-2 py-1 border rounded-lg flex gap-2 items-center"
                    >
                      <div className="flex justify-center items-center rounded-full bg-green-300 text-gray-600 font-bold h-8 w-8">
                        {sliceCharName(el?.user?.fullname)}
                      </div>
                      <div>
                        <h4 className="font-bold text-orange-500">
                          {el?.user?.fullname}
                        </h4>
                        <p className="text-green-500">
                          Nhận được: {formattedAmount(el.score)} VND
                        </p>
                        <p className="text-gray-600 text-sm">
                          Thời gian:{" "}
                          {dayjs(el.createdAt).format("DD-MM-YYYY HH:mm:ss")}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-600">
                    Chưa có dữ liệu.
                  </div>
                )
              ) : (
                <div className="text-center text-gray-600">Đang tải...</div>
              )}
            </div>
          </div>
          <div className="flex justify-center items-center gap-4">
            <button
              onClick={prePage}
              className="px-3 py-1 bg-white rounded-md hover:scale-95 hover:bg-slate-200"
            >
              {"<"}
            </button>
            <div>
              {pagination?.totalPages > 0 ? (
                <span>
                  {pagination?.currentPage} / {pagination?.totalPages}
                </span>
              ) : (
                "__ / __"
              )}
            </div>
            <button
              onClick={nextPage}
              className="px-3 py-1 bg-white rounded-md hover:scale-95 hover:bg-slate-200"
            >
              {">"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultEventList;
