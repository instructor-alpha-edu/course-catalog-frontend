import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/userSlice";
import { FiLogOut } from "react-icons/fi";
import { MAIN_PAGE_ROUTE } from "../utils/consts";
import { sidebarLinks } from "../utils/routes";
import logo from "../assets/img/logo.svg";

export default function Sidebar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userRole = useSelector(state => state.user.user.role);

  function logOut() {
    dispatch(logout());
    navigate(MAIN_PAGE_ROUTE);
  }

  return (
    <div className="sidebar">
      <div className="sidebar-top">
        <div className="sidebar-logo">
          <img src={logo} alt="Logo" />
        </div>
        <div className="sidebar-links">
          {sidebarLinks
            .filter(item => item.roles.includes(userRole))
            .map(link => (
              <Link to={link.link} className="sidebar-link">
                <link.icon />
                {link.text}
              </Link>
            ))}
        </div>
      </div>
      <div className="sidebar-bottom">
        <button className="sidebar-link" onClick={logOut}>
          <FiLogOut />
          Выйти
        </button>
      </div>
    </div>
  );
}
