import { useState, useEffect } from "react";
import { axiosInstance } from "../../services/axios";
import Loader from "../../components/Loader";
import CourseCard from "../../components/CourseCard";

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchCourses() {
      try {
        setIsLoading(true);
        const res = await axiosInstance.get("/courses");
        console.log(res);
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
    <div className="courses">
      <h1 className="title">Каталог курсов</h1>
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
