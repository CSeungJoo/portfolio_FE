import { useState, useEffect } from "react";
import "../styles/project.css";
import profileImage from "../img/profile.jpg";
import { projectsApi } from "../services/api";
import ProjectModal from "./ProjectModal";


const statusMap = {
  "PLANNING": "계획 중",
  "IN_PROGRESS": "진행 중",
  "COMPLETED": "완성"
}

const Project = ({ nickname }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [markdownContent, setMarkdownContent] = useState("");
  const [modalLoading, setModalLoading] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      if (!nickname) return;
      
      try {
        setLoading(true);
        const data = await projectsApi.getProjects(nickname);
        setProjects(data.data.map(project => ({
          ...project,
          imageUrl: project.imageUrl || profileImage,
          status: statusMap[project.status]
        })));
      } catch (error) {
        console.error('프로젝트 데이터를 불러오는데 실패했습니다:', error);
        setProjects([
          {
            id: 1,
            title: "포폴 제작",
            summary: "React를 이용한 포트폴리오 사이트 제작 프로젝트.",
            description: "React, JS, HTML, CSS로 제작 중인 개인 포트폴리오 웹사이트입니다.",
            startAt: "2025-03-05",
            endAt: "진행중",
            techStack: ["React", "JS", "HTML", "CSS"],
            imageUrl: profileImage,
            status: "진행 중",
            projectType: "개인프로젝트",
            github: "https://github.com/doeun07/portfolio",
            improvements: ["반응형 웹 디자인을 적용해 다양한 화면에서 잘 보이도록 개선할 수 있다."]
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [nickname]);

  const handleProjectClick = async (project) => {
    try {
      setSelectedProject(project);
      setModalOpen(true);
      setModalLoading(true);
      
      // const detailData = await projectsApi.getProjectDetail(project.id);
      setMarkdownContent(project.description || `# ${project.title}\n\n${project.summary}\n\n## 기술 스택\n${project.technologies?.join(', ')}`);
    } catch (error) {
      console.error('프로젝트 상세 정보를 불러오는데 실패했습니다:', error);
      setMarkdownContent(`# ${project.title}\n\n${project.summary}\n\n프로젝트 상세 정보를 불러올 수 없습니다.`);
    } finally {
      setModalLoading(false);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedProject(null);
    setMarkdownContent('');
    setModalLoading(false);
  };

  if (loading) {
    return <div className="projects-list"><p>로딩 중...</p></div>;
  }

  return (
    <>
      <div className="projects-list">
        {projects.map((project) => (
          <div key={project.id} className="project-card" onClick={() => handleProjectClick(project)}>
            <img
              src={project.imageUrl}
              alt={project.title}
              className="project-image"
            />
            <div className="project-box">
              <span className="project-title">{project.title}</span>
              {project.projectStatus === "완료" ? (
                <span className="project-status-end">
                  {project.projectStatus}
                </span>
              ) : (
                <span className="project-status-ing">
                  {project.status}
                </span>
              )}
            </div>
            <p className="project-summary">{project.summary}</p>
            <p className="project-dates">
              {project.startAt} ~ {project.endAt || `개발중`}
            </p>

            {/* GitHub 링크 - project.github가 있을 때만 표시 */}
              {project.github && (
                <div className="project-link" onClick={(e) => e.stopPropagation()}>
                  <p>GITHUB :</p>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    바로가기
                  </a>
                </div>
              )}

              {/* Prod 링크 - project.prod가 있을 때만 표시 */}
              {project.prod && (
                <div className="project-link" onClick={(e) => e.stopPropagation()}>
                  <p>PROD :</p>
                  <a
                    href={project.prod}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    바로가기
                  </a>
                </div>
              )}
            </div>
        ))}
      </div>
      
      <ProjectModal
        isOpen={modalOpen}
        onClose={closeModal}
        project={selectedProject}
        markdownContent={markdownContent}
        loading={modalLoading}
      />
    </>
  );
};

export default Project;
