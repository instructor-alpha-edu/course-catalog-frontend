import { Routes, Route } from "react-router";
import { useSelector } from "react-redux";
import { routes } from "../utils/routes";
import { Roles } from "../utils/consts";

export default function AppRouter() {
  const user = useSelector(state => state.user.user);
  const userRole = user ? user.role : Roles.GUEST;

  return (
    <Routes>
      {routes
        .filter(route => route.roles.includes(userRole))
        .map(route => (
          <Route key={route.path} path={route.path} element={<route.element />} />
        ))}
      <Route
        path="*"
        element={
          userRole === Roles.GUEST ? (
            <Navigate to={MAIN_PAGE_ROUTE} />
          ) : (
            <Navigate to={DASHBOARD_PROFILE_PAGE_ROUTE} />
          )
        }
      />
    </Routes>
  );
}
