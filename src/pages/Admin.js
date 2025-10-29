import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { profileApi, skillsApi, projectsApi, awardsApi } from "../services/api";
import "../styles/Admin.css";

function Admin() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");
  const [nickname, setNickname] = useState("");

  useEffect(() => {
    // 토큰 확인
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      alert("로그인이 필요합니다.");
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/login");
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>관리자 페이지</h1>
        <button onClick={handleLogout} className="logout-button">
          로그아웃
        </button>
      </div>

      <div className="admin-tabs">
        <button
          className={activeTab === "profile" ? "tab active" : "tab"}
          onClick={() => setActiveTab("profile")}
        >
          프로필 관리
        </button>
        <button
          className={activeTab === "skills" ? "tab active" : "tab"}
          onClick={() => setActiveTab("skills")}
        >
          스킬 관리
        </button>
        <button
          className={activeTab === "projects" ? "tab active" : "tab"}
          onClick={() => setActiveTab("projects")}
        >
          프로젝트 관리
        </button>
        <button
          className={activeTab === "awards" ? "tab active" : "tab"}
          onClick={() => setActiveTab("awards")}
        >
          수상 관리
        </button>
      </div>

      <div className="admin-content">
        {activeTab === "profile" && <ProfileManagement />}
        {activeTab === "skills" && <SkillsManagement />}
        {activeTab === "projects" && <ProjectsManagement />}
        {activeTab === "awards" && <AwardsManagement />}
      </div>
    </div>
  );
}

function ProfileManagement() {
  const [formData, setFormData] = useState({
    imgUrl: "",
    name: "",
    engName: "",
    role: "",
    email: "",
    phoneNumber: "",
    github: "",
    blog: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await profileApi.createProfile(formData);
      if (response.status === "SUCCESS") {
        alert("프로필이 생성되었습니다.");
      }
    } catch (err) {
      alert(err.message || "프로필 생성 실패");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    setLoading(true);

    try {
      const response = await profileApi.updateProfile(formData);
      if (response.status === "SUCCESS") {
        alert("프로필이 수정되었습니다.");
      }
    } catch (err) {
      alert(err.message || "프로필 수정 실패");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="management-section">
      <h2>프로필 관리</h2>
      <form onSubmit={handleSubmit} className="management-form">
        <div className="form-group">
          <label>이미지 URL</label>
          <input
            type="text"
            name="imgUrl"
            value={formData.imgUrl}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
          />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>이름</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>영문 이름</label>
            <input
              type="text"
              name="engName"
              value={formData.engName}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-group">
          <label>역할</label>
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            placeholder="Backend Developer"
          />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>이메일</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>전화번호</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>GitHub</label>
            <input
              type="text"
              name="github"
              value={formData.github}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Blog</label>
            <input
              type="text"
              name="blog"
              value={formData.blog}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="button-group">
          <button type="submit" disabled={loading}>
            생성
          </button>
          <button type="button" onClick={handleUpdate} disabled={loading}>
            수정
          </button>
        </div>
      </form>
    </div>
  );
}

function SkillsManagement() {
  const [skills, setSkills] = useState([]);
  const [formData, setFormData] = useState({
    skillId: null,
    name: "",
    skillLevel: "BEGINNER",
    proficiencyRate: 0,
    imgUrl: "",
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? parseInt(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (formData.skillId) {
        await skillsApi.updateSkill(formData);
        alert("스킬이 수정되었습니다.");
      } else {
        await skillsApi.createSkill(formData);
        alert("스킬이 생성되었습니다.");
      }
      resetForm();
    } catch (err) {
      alert(err.message);
    }
  };

  const resetForm = () => {
    setFormData({
      skillId: null,
      name: "",
      skillLevel: "BEGINNER",
      proficiencyRate: 0,
      imgUrl: "",
    });
  };

  return (
    <div className="management-section">
      <h2>스킬 관리</h2>
      <form onSubmit={handleSubmit} className="management-form">
        <div className="form-group">
          <label>스킬 이름</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>숙련도</label>
            <select
              name="skillLevel"
              value={formData.skillLevel}
              onChange={handleChange}
            >
              <option value="BEGINNER">초급</option>
              <option value="INTERMEDIATE">중급</option>
              <option value="ADVANCED">고급</option>
              <option value="PROFICIENT">숙련</option>
              <option value="EXPERT">전문가</option>
            </select>
          </div>
          <div className="form-group">
            <label>숙련도 비율 (%)</label>
            <input
              type="number"
              name="proficiencyRate"
              value={formData.proficiencyRate}
              onChange={handleChange}
              min="0"
              max="100"
            />
          </div>
        </div>
        <div className="form-group">
          <label>이미지 URL</label>
          <input
            type="text"
            name="imgUrl"
            value={formData.imgUrl}
            onChange={handleChange}
          />
        </div>
        <div className="button-group">
          <button type="submit">{formData.skillId ? "수정" : "생성"}</button>
          {formData.skillId && (
            <button type="button" onClick={resetForm}>
              취소
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

function ProjectsManagement() {
  const [formData, setFormData] = useState({
    projectId: null,
    title: "",
    summary: "",
    description: "",
    techStack: [],
    status: "PLANNING",
    startAt: "",
    endAt: "",
    github: "",
    imageUrl: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTechStackChange = (e) => {
    const techStackStr = e.target.value;
    const techStackArray = techStackStr.split(",").map((tech) => tech.trim());
    setFormData((prev) => ({ ...prev, techStack: techStackArray }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (formData.projectId) {
        await projectsApi.updateProject(formData.projectId, formData);
        alert("프로젝트가 수정되었습니다.");
      } else {
        await projectsApi.createProject(formData);
        alert("프로젝트가 생성되었습니다.");
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="management-section">
      <h2>프로젝트 관리</h2>
      <form onSubmit={handleSubmit} className="management-form">
        <div className="form-group">
          <label>프로젝트 제목</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>요약</label>
          <textarea
            name="summary"
            value={formData.summary}
            onChange={handleChange}
            rows="3"
          />
        </div>
        <div className="form-group">
          <label>상세 설명</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="6"
          />
        </div>
        <div className="form-group">
          <label>기술 스택 (쉼표로 구분)</label>
          <input
            type="text"
            name="techStack"
            value={formData.techStack.join(", ")}
            onChange={handleTechStackChange}
            placeholder="Java, Spring Boot, React"
          />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>상태</label>
            <select name="status" value={formData.status} onChange={handleChange}>
              <option value="PLANNING">계획 중</option>
              <option value="IN_PROGRESS">진행 중</option>
              <option value="COMPLETED">완료</option>
            </select>
          </div>
          <div className="form-group">
            <label>시작일</label>
            <input
              type="date"
              name="startAt"
              value={formData.startAt}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>종료일</label>
            <input
              type="date"
              name="endAt"
              value={formData.endAt}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>GitHub URL</label>
            <input
              type="text"
              name="github"
              value={formData.github}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>이미지 URL</label>
            <input
              type="text"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="button-group">
          <button type="submit">{formData.projectId ? "수정" : "생성"}</button>
        </div>
      </form>
    </div>
  );
}

function AwardsManagement() {
  const [formData, setFormData] = useState({
    awardId: null,
    name: "",
    organization: "",
    awardRank: "",
    awardedAt: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (formData.awardId) {
        await awardsApi.updateAward(formData);
        alert("수상이 수정되었습니다.");
      } else {
        await awardsApi.createAward(formData);
        alert("수상이 생성되었습니다.");
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="management-section">
      <h2>수상 관리</h2>
      <form onSubmit={handleSubmit} className="management-form">
        <div className="form-group">
          <label>수상명</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>주최 기관</label>
            <input
              type="text"
              name="organization"
              value={formData.organization}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>수상 등급</label>
            <input
              type="text"
              name="awardRank"
              value={formData.awardRank}
              onChange={handleChange}
              placeholder="대상, 금상, 1등 등"
            />
          </div>
        </div>
        <div className="form-group">
          <label>수상 날짜</label>
          <input
            type="date"
            name="awardedAt"
            value={formData.awardedAt}
            onChange={handleChange}
          />
        </div>
        <div className="button-group">
          <button type="submit">{formData.awardId ? "수정" : "생성"}</button>
        </div>
      </form>
    </div>
  );
}

export default Admin;
