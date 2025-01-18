export const getToken = () => {
  return localStorage.getItem("token");
};

export const isTokenValid = (token) => {
  // Kiểm tra token có hợp lệ không
  return token && token !== "expired"; // Thay bằng logic thực tế
};
