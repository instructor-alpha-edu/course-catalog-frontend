import { useSelector } from "react-redux";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Loader from "./Loader";

export default function Layout({ children }) {
  const user = useSelector(state => state.user);

  if (user.isLoading) {
    return <Loader isFullPage={true} />;
  }

  if (user.isAuth) {
    return (
      <div className="dashboard">
        <Sidebar />
        <div className="dashboard-content">{children}</div>
      </div>
    );
  }

  return (
    <div className="container">
      <Header />
      {children}
    </div>
  );
}
