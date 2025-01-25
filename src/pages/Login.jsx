import { useEffect, useState } from "react";
import { confettiSnow } from "../utils";
import { Link } from "react-router-dom";
import authApi from "../api/authApi";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { setIsLoggedIn } = useAuth();

  const location = useLocation();
  const navigate = useNavigate();

  const [messageErr, setMessageErr] = useState("");
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  useEffect(() => {
    setTimeout(() => {
      confettiSnow();
    }, 1000);

    return () => {
      localStorage.setItem("canvas-global", false);
    };
  }, []);

  const handleLogin = async () => {
    var msg = "";
    if (!data.username || !data.password) {
      msg = "Vui lòng điền đầy đủ thông tin.";
    }

    if (msg) {
      setMessageErr(msg);
      return;
    }

    try {
      const { accessToken: token } = await authApi.login({
        username: data.username,
        password: data.password,
      });

      localStorage.setItem("token", token);
      setIsLoggedIn(true);
      const redirectTo = location.state?.from || "/";
      navigate(redirectTo);
    } catch (error) {
      msg = error?.response.data?.msg;
      setMessageErr(msg);
    }
  };
  return (
    <div className="bg-small-layout md:bg-large-layout min-h-screen">
      <div className="container max-w-[700px] py-28">
        <div className="login-card px-5 py-8 rounded-md">
          <div className="login-title text-center">
            <h1 className="text-2xl text-green-600 uppercase">Đăng nhập</h1>
          </div>
          <div className="login-body mb-6">
            <div className="my-2">
              <label className="text-gray-700" htmlFor="username">
                Username:
              </label>
              <input
                value={data.username}
                onChange={(e) => {
                  setData({
                    ...data,
                    username: e.target.value,
                  });
                }}
                id="username"
                name="username"
                className="w-full px-2 py-1 rounded-md"
                placeholder="Enter username"
                type="text"
              />
            </div>
            <div className="my-2">
              <label className="text-gray-700" htmlFor="password">
                Password:
              </label>
              <input
                value={data.password}
                onChange={(e) => {
                  setData({
                    ...data,
                    password: e.target.value,
                  });
                }}
                id="password"
                name="password"
                className="w-full px-2 py-1 rounded-md"
                placeholder="Enter password"
                type="text"
              />
            </div>
            <div className="message-err text-sm">
              <span className="text-red-500">{messageErr}</span>
            </div>
          </div>
          <div className="login-footer">
            <div className="text-center">
              <button
                onClick={handleLogin}
                className="bg-blue-600 hover:bg-blue-500 px-2 py-1 rounded-md text-white"
              >
                Login
              </button>
            </div>
            <div className="text-center mt-3">
              <Link className="underline" to="/">
                Quay lại trang chủ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
