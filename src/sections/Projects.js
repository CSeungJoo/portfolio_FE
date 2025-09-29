import Project from "../components/Project";

const Projects = ({ nickname }) => {
  return (
    <section id="projects" className="h-screen flex items-center justify-center bg-gray-200">
      <h1 className="text-4xl font-bold">PROJECTS</h1>
      <Project nickname={nickname} />
    </section>
  );
};

export default Projects;
