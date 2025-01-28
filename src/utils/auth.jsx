export const getToken = (key = "token") => {
  return localStorage.getItem(key);
};

export const checkLogin = () => {
  const token = localStorage.getItem("token");
  return !!token;
};

export const isTokenValid = (token) => {
  // Kiểm tra token có hợp lệ không
  return token && token !== "expired"; // Thay bằng logic thực tế
};

export const clearUserData = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("fullname");
  localStorage.removeItem("username");
  console.log("Cleared user data.");
};
