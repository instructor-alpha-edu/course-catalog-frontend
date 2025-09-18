import { useState, useEffect } from "react";
import { axiosInstance } from "../../services/axios";
import Loader from "../../components/Loader";
import { rusRoles } from "../../utils/consts";

export default function DashboardUsersPage() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchUsers() {
      try {
        setIsLoading(true);
        const res = await axiosInstance.get("/users", {
          headers: { Authorization: localStorage.getItem("token") },
        });
        setUsers(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchUsers();
  }, []);

  return (
    <div className="users">
      <h1 className="title">Список пользователей</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <table className="users-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Имя</th>
              <th>Фамилия</th>
              <th>E-mail</th>
              <th>Роль</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{rusRoles[user.role]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
