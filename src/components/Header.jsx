import { Link } from "react-router";
import { COURSES_PAGE_ROUTE, LOGIN_PAGE_ROUTE, MAIN_PAGE_ROUTE } from "../utils/consts";
import logo from "../assets/img/logo.svg";

export default function Header() {
  return (
    <header className="header">
      <nav className="nav">
        <div className="nav-part">
          <img src={logo} alt="Logo" className="nav-logo" />
        </div>
        <div className="nav-part">
          <Link to={MAIN_PAGE_ROUTE} className="nav-link">
            Главная
          </Link>
          <Link to={COURSES_PAGE_ROUTE} className="nav-link">
            Курсы
          </Link>
        </div>
        <div className="nav-part">
          <Link to={LOGIN_PAGE_ROUTE} className="btn btn-outline">
            Войти
          </Link>
        </div>
      </nav>
    </header>
  );
}
