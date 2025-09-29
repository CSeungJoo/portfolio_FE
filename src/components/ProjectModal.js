import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from "remark-gfm"
import '../styles/projectModal.css';

const ProjectModal = ({ isOpen, onClose, project, markdownContent, loading }) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <div className="modal-header">
          <h2>{project?.title}</h2>
          <button className="modal-close" onClick={onClose}>
            &times;
          </button>
        </div>
        
        <div className="modal-body">
          {loading ? (
            <div className="loading-spinner">
              <p>로딩 중...</p>
            </div>
          ) : (
            <div className="markdown-content">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdownContent}</ReactMarkdown>
            </div>
          )}
        </div>

        {project && (
          <div className="modal-footer">
            <div className="project-meta">
              <p><strong>프로젝트 기간:</strong> {project.startAt} ~ {project.endAt || "진행 중"}</p>
              <p><strong>상태:</strong> {project.status}</p>
              <p><strong>기술 스택:</strong> {project.techStack?.join(', ')}</p>

              {/* GitHub 링크가 있는 경우 */}
              {project.github && (
                <p>
                  <strong>GITHUB:</strong>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ marginLeft: "6px" }}
                  >
                    바로가기
                  </a>
                </p>
              )}

              {/* Prod 링크가 있는 경우 */}
              {project.prod && (
                <p>
                  <strong>Prod:</strong>
                  <a
                    href={project.prod}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ marginLeft: "6px" }}
                  >
                    바로가기
                  </a>
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectModal;