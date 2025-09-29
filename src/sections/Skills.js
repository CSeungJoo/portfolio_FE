import { useState, useEffect } from "react";
import "../styles/skills.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faHtml5,
  faCss3Alt,
  faJs,
  faReact,
  faBootstrap,
  faPhp,
  faGitAlt,
  faFigma,
  faJava,
} from "@fortawesome/free-brands-svg-icons";
import { faDatabase, faLeaf } from "@fortawesome/free-solid-svg-icons";
import { skillsApi } from "../services/api";

const iconMap = {
  HTML: faHtml5,
  CSS: faCss3Alt,
  JavaScript: faJs,
  React: faReact,
  Bootstrap: faBootstrap,
  PHP: faPhp,
  MySQL: faDatabase,
  Git: faGitAlt,
  GitHub: faGithub,
  Figma: faFigma,
  Java: faJava,
  Spring_Boot: faLeaf
};

const Skills = ({ nickname }) => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSkills = async () => {
      if (!nickname) return;
      
      try {
        setLoading(true);
        const data = await skillsApi.getSkills(nickname);
        setSkills(data.data.map(skill => ({
          ...skill,
          iconLink: iconMap[skill.name.replace(/\s+/g, '_')] || faDatabase
        })));
      } catch (error) {
        console.error('스킬 데이터를 불러오는데 실패했습니다:', error);
        setSkills([
          { name: "HTML", proficiencyRate: 90, skillLevel: "PROFICIENT", iconLink: faHtml5 },
          { name: "CSS", proficiencyRate: 85, skillLevel: "PROFICIENT", iconLink: faCss3Alt },
          { name: "JavaScript", proficiencyRate: 60, skillLevel: "PROFICIENT", iconLink: faJs },
          { name: "React", proficiencyRate: 30, skillLevel: "PROFICIENT", iconLink: faReact },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, [nickname]);

  if (loading) {
    return (
      <section id="skills">
        <h1 className="skills-title">SKILLS</h1>
        <p>로딩 중...</p>
      </section>
    );
  }

  return (
    <section id="skills">
      <h1 className="skills-title">SKILLS</h1>
      <div className="skills-content">
        {skills.map((skill, index) => (
          <div key={index} className="skill-bar">
            <p className="skill-name">
              <FontAwesomeIcon icon={skill.iconLink} /> {skill.name}
            </p>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${skill.proficiencyRate}%` }}
              >
                {skill.proficiencyRate}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
