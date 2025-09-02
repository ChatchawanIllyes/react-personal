import "./ProfileDashboard.css";

export default function ProjectsDashboard({ projects }) {
  return (
    <div className="dashboard-bg">
      <div className="projects-grid">
        {projects.map((project, idx) => (
          <div className="project-card" key={idx}>
            <div className="project-image-placeholder">Image</div>
            <h3>{project.title}</h3>
            <p className="project-bio-placeholder">
              {project.description || "Project bio/description placeholder"}
            </p>
            <button className="see-project-btn">See Project</button>
          </div>
        ))}
      </div>
    </div>
  );
}
