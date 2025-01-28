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
  const [isLogin, setIsLogin] = useState(false);
  const [messageErr, setMessageErr] = useState("");
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      confettiSnow();
    }, 1000);

    return () => {
      localStorage.setItem("canvas-global", false);
    };
  }, []);

  const handleLogin = async () => {
    if (!isLogin) {
      var msg = "";
      if (!data.username || !data.password) {
        msg = "Vui lòng điền đầy đủ thông tin.";
      }

      if (msg) {
        setMessageErr(msg);
        return;
      }

      setIsLogin(true);

      try {
        const { data: user, accessToken: token } = await authApi.login({
          username: data.username,
          password: data.password,
        });

        localStorage.setItem("token", token);
        localStorage.setItem("fullname", user.fullname);
        localStorage.setItem("username", user.username);
        setIsLoggedIn(true);
        const redirectTo = location.state?.from || "/";
        navigate(redirectTo);
      } catch (error) {
        msg = error?.response.data?.msg;
        setMessageErr(msg);
      }

      setIsLogin(false);
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
                Email:
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
                Mật khẩu:
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
                type={showPassword ? "text" : "password"}
              />
            </div>
            <div className="my-2 flex items-center">
              <input
                value={showPassword}
                onChange={(e) => {
                  setShowPassword(e.target.checked);
                }}
                className="mr-2 h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                id="showPw"
                name="showPw"
                type="checkbox"
              />
              <label className="text-gray-700" htmlFor="showPw">
                Hiện password
              </label>
            </div>
            <div className="message-err text-sm">
              <span className="text-red-500">{messageErr}</span>
            </div>
          </div>
          <div className="login-footer">
            <div className="text-center">
              <button
                onClick={handleLogin}
                className="bg-blue-600 hover:bg-blue-500 px-2 py-1 rounded-md text-white mb-2"
              >
                {isLogin ? "Đang đăng nhập..." : "Đăng nhập"}
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
