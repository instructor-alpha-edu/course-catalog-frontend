import { Link } from "react-router-dom";
import { COURSES_PAGE_ROUTE } from "../../utils/consts";
import heroImg from "../../assets/img/hero.svg";

export default function MainPage() {
  return (
    <div className="hero">
      <div className="hero-part">
        <div className="badge">Набор открыт</div>
        <h1 className="title hero-title">Онлайн-курсы по востребованным профессиям</h1>
        <p className="text hero-text">
          Учись у практикующих специалистов в удобном формате. Собери портфолио, получай сертификаты
          и двигайся по карьерной траектории вместе с нами.
        </p>
        <div className="hero-details">
          <Link to={COURSES_PAGE_ROUTE} className="btn">
            Записаться
          </Link>

          <div className="hero-list">
            <p className="hero-item">108 курсов</p>
            <span className="hero-point"></span>
            <p className="hero-item">12 направлений</p>
          </div>
        </div>
      </div>
      <div className="hero-part">
        <img src={heroImg} alt="Hero" className="hero-img" />
      </div>
    </div>
  );
}
