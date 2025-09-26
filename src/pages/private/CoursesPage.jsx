import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import { axiosInstance } from "../../services/axios";
import CourseCard from "../../components/CourseCard";
import Loader from "../../components/Loader";
import { Roles, DASHBOARD_CREATE_COURSE_PAGE_ROUTE } from "../../utils/consts";

export default function DashboardCoursesPage() {
  const userRole = useSelector(state => state.user.user.role);
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchCourses() {
      try {
        setIsLoading(true);
        const res = await axiosInstance.get("/courses");
        setCourses(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCourses();
  }, []);

  return (
    <div>
      <div className="courses-header">
        <h1 className="title">Каталог курсов</h1>
        {userRole !== Roles.STUDENT && (
          <Link to={DASHBOARD_CREATE_COURSE_PAGE_ROUTE} className="btn">
            Добавить курс
          </Link>
        )}
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="courses-grid">
          {courses.map(course => (
            <CourseCard
              key={course.id}
              title={course.title}
              imageUrl={course.imageUrl}
              teacherName={`${course.teacher.firstName} ${course.teacher.lastName}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
