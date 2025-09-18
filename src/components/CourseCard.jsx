import { FaUserGraduate } from "react-icons/fa6";

export default function CourseCard({ title, imageUrl, teacherName }) {
  return (
    <div className="card">
      <img src={imageUrl} alt="Course card" className="card-img" />
      <div className="card-details">
        <h4 className="card-title">{title}</h4>
        <div className="card-teacher">
          <FaUserGraduate />
          <p>{teacherName}</p>
        </div>
      </div>
    </div>
  );
}
