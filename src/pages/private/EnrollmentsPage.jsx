import { useState, useEffect } from "react";
import { axiosInstance } from "../../services/axios";
import CourseCard from "../../components/CourseCard";
import Loader from "../../components/Loader";

export default function DashboardEnrollmentsPage() {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchCourses() {
      try {
        setIsLoading(true);
        const res = await axiosInstance.get("/enrollments", {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });

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
      <h1 className="title">Мое обучение</h1>
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
