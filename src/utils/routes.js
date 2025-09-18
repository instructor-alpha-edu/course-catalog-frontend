import MainPage from "../pages/public/MainPage";
import CoursesPage from "../pages/public/CoursesPage";
import LoginPage from "../pages/public/LoginPage";
import RegisterPage from "../pages/public/RegisterPage";
import DashboardProfilePage from "../pages/private/ProfilePage";
import DashboardCoursesPage from "../pages/private/CoursesPage";
import DashboardEnrollmentsPage from "../pages/private/EnrollmentsPage";
import DashboardUsersPage from "../pages/private/UsersPage";
import {
  MAIN_PAGE_ROUTE,
  COURSES_PAGE_ROUTE,
  LOGIN_PAGE_ROUTE,
  REGISTER_PAGE_ROUTE,
  DASHBOARD_PROFILE_PAGE_ROUTE,
  DASHBOARD_COURSES_PAGE_ROUTE,
  DASHBOARD_ENROLLMENTS_PAGE_ROUTE,
  DASHBOARD_USERS_PAGE_ROUTE,
  Roles,
} from "./consts";
import { RiUser3Line } from "react-icons/ri";
import { MdSchool } from "react-icons/md";
import { LuUsers, LuList } from "react-icons/lu";

export const routes = [
  {
    path: MAIN_PAGE_ROUTE,
    element: MainPage,
    roles: [Roles.GUEST],
  },
  {
    path: COURSES_PAGE_ROUTE,
    element: CoursesPage,
    roles: [Roles.GUEST],
  },
  {
    path: LOGIN_PAGE_ROUTE,
    element: LoginPage,
    roles: [Roles.GUEST],
  },
  {
    path: REGISTER_PAGE_ROUTE,
    element: RegisterPage,
    roles: [Roles.GUEST],
  },
  {
    path: DASHBOARD_PROFILE_PAGE_ROUTE,
    element: DashboardProfilePage,
    roles: [Roles.STUDENT, Roles.TEACHER, Roles.ADMIN],
  },
  {
    path: DASHBOARD_COURSES_PAGE_ROUTE,
    element: DashboardCoursesPage,
    roles: [Roles.STUDENT, Roles.TEACHER, Roles.ADMIN],
  },
  {
    path: DASHBOARD_ENROLLMENTS_PAGE_ROUTE,
    element: DashboardEnrollmentsPage,
    roles: [Roles.STUDENT],
  },
  {
    path: DASHBOARD_USERS_PAGE_ROUTE,
    element: DashboardUsersPage,
    roles: [Roles.ADMIN],
  },
];

export const sidebarLinks = [
  {
    link: DASHBOARD_PROFILE_PAGE_ROUTE,
    icon: RiUser3Line,
    text: "Мой профиль",
    roles: [Roles.STUDENT, Roles.TEACHER, Roles.ADMIN],
  },
  {
    link: DASHBOARD_COURSES_PAGE_ROUTE,
    icon: LuList,
    text: "Каталог курсов",
    roles: [Roles.STUDENT, Roles.TEACHER, Roles.ADMIN],
  },
  {
    link: DASHBOARD_ENROLLMENTS_PAGE_ROUTE,
    icon: MdSchool,
    text: "Мое обучение",
    roles: [Roles.STUDENT],
  },
  {
    link: DASHBOARD_USERS_PAGE_ROUTE,
    icon: LuUsers,
    text: "Пользователи",
    roles: [Roles.ADMIN],
  },
];
