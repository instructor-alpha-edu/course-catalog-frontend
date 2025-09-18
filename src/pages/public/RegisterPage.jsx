import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../services/axios";
import { LOGIN_PAGE_ROUTE } from "../../utils/consts";
import Loader from "../../components/Loader";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleRegister(event) {
    event.preventDefault();

    try {
      setIsLoading(true);
      await axiosInstance.post("/auth/register", {
        firstName,
        lastName,
        email,
        password,
      });

      navigate(LOGIN_PAGE_ROUTE);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="auth">
      <form className="form" onSubmit={handleRegister}>
        <h1 className="form-title">Регистрация</h1>

        <div className="form-block">
          <span className="form-label">Имя</span>
          <input
            type="text"
            className="form-input"
            placeholder="Введите ваше имя"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
          />
        </div>

        <div className="form-block">
          <span className="form-label">Фамилия</span>
          <input
            type="text"
            className="form-input"
            placeholder="Введите вашу фамилию"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
          />
        </div>

        <div className="form-block">
          <span className="form-label">E-mail</span>
          <input
            type="email"
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
          Зарегистрироваться
        </button>

        <p className="form-link">
          Уже есть аккаунт? <Link to={LOGIN_PAGE_ROUTE}>Войти</Link>
        </p>
      </form>

      {isLoading && <Loader isFullPage={true} />}
    </div>
  );
}
