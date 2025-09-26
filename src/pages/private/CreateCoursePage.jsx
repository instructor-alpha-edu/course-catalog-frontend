import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../services/axios";
import Loader from "../../components/Loader";
import { Roles, DASHBOARD_COURSES_PAGE_ROUTE } from "../../utils/consts";

export default function DashboardCreateCoursePage() {
  const navigate = useNavigate();
  const userRole = useSelector(state => state.user.user.role);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [level, setLevel] = useState("beginner");
  const [teacherId, setTeacherId] = useState("");
  const [teachers, setTeachers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const fileInputRef = useRef(null);

  useEffect(() => {
    async function fetchTeachers() {
      if (userRole === Roles.ADMIN) {
        try {
          setIsLoading(true);
          const res = await axiosInstance.get("/users", {
            headers: { Authorization: localStorage.getItem("token") },
          });
          const onlyTeachers = res.data.filter(user => user.role === Roles.TEACHER);
          setTeachers(onlyTeachers);
        } catch (err) {
          console.log(err);
        } finally {
          setIsLoading(false);
        }
      }
    }

    fetchTeachers();
  }, [userRole]);

  function handleFileChange(e) {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.size > 10 * 1024 * 1024) {
        alert("Файл слишком большой! Максимум 10 MB");
        fileInputRef.current.value = null;
        return;
      }
      setFile(selectedFile);
      setImagePreview(URL.createObjectURL(selectedFile));
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!file) {
      alert("Пожалуйста, выберите изображение");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("level", level);
    formData.append("image", file);

    if (userRole === Roles.ADMIN) {
      formData.append("teacherId", teacherId);
    }

    try {
      setIsLoading(true);
      await axiosInstance.post("/courses", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: localStorage.getItem("token"),
        },
      });
      alert("Курс успешно создан");
      navigate(DASHBOARD_COURSES_PAGE_ROUTE);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  function openFileDialog() {
    fileInputRef.current.click();
  }

  return (
    <div>
      <h1 className="title">Создать курс</h1>

      {isLoading && <Loader isFullPage={true} />}

      <div className="create-container">
        <form onSubmit={handleSubmit} className="form">
          <div className="form-block">
            <span className="form-label">Название</span>
            <input
              type="text"
              className="form-input"
              placeholder="Введите название курса"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-block">
            <span className="form-label">Описание</span>
            <textarea
              className="form-input"
              placeholder="Введите описание курса"
              value={description}
              onChange={e => setDescription(e.target.value)}
              required
            />
          </div>

          <div className="form-block">
            <span className="form-label">Уровень</span>
            <select
              className="form-input"
              value={level}
              onChange={e => setLevel(e.target.value)}
              required
            >
              <option value="beginner">Начальный</option>
              <option value="intermediate">Средний</option>
              <option value="advanced">Продвинутый</option>
            </select>
          </div>

          {userRole === Roles.ADMIN && (
            <div className="form-block">
              <span className="form-label">Преподаватель</span>
              <select
                className="form-input"
                value={teacherId}
                onChange={e => setTeacherId(e.target.value)}
                required
              >
                <option value="">Выберите преподавателя</option>
                {teachers.map(t => (
                  <option key={t._id} value={t._id}>
                    {t.firstName} {t.lastName}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="form-block">
            <span className="form-label">Изображение</span>
            <button type="button" className="btn" onClick={openFileDialog}>
              Загрузить изображение
            </button>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              accept="image/*"
              onChange={handleFileChange}
            />
            {imagePreview && (
              <div className="image-preview">
                <img src={imagePreview} alt="Preview" className="image-preview-img" />
              </div>
            )}
          </div>

          <div className="form-actions">
            <button type="submit" className="btn">
              Создать
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
