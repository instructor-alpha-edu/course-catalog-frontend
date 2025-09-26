import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { axiosInstance } from "../../services/axios";
import { login } from "../../redux/slices/userSlice";
import { REGISTER_PAGE_ROUTE, DASHBOARD_PROFILE_PAGE_ROUTE } from "../../utils/consts";
import Loader from "../../components/Loader";

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleLogin(event) {
    event.preventDefault();
    try {
      setErrorMessage("");

      if (!email || !password) {
        alert("Введите ваш e-mail и пароль!");
        return;
      }

      setIsLoading(true);
      const res = await axiosInstance.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);

      const userResponse = await axiosInstance.get("/users/me", {
        headers: { Authorization: localStorage.getItem("token") },
      });

      dispatch(login(userResponse.data));
      navigate(DASHBOARD_PROFILE_PAGE_ROUTE);
    } catch (error) {
      setErrorMessage(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="auth">
      <form className="form" onSubmit={handleLogin}>
        <h1 className="form-title">Войти</h1>
        <div className="form-block">
          <span className="form-label">E-mail</span>
          <input
            type="text"
            className="form-input"
            placeholder="Введите свой email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className="form-block">
          <span className="form-label">Пароль</span>
          <input
            type="password"
            className="form-input"
            placeholder="Введите свой пароль"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn form-btn">
          Войти
        </button>

        <p className="form-link">
          Еще нет аккаунта? <Link to={REGISTER_PAGE_ROUTE}>Регистрация</Link>
        </p>

        <p className="form-text-error">{errorMessage}</p>
      </form>
      {isLoading && <Loader isFullPage={true} />}
    </div>
  );
}
