import "./ProfileDashboard.css";

export default function ProjectsDashboard({ projects }) {
  return (
    <div className="dashboard-bg">
      <div className="projects-grid">
        {projects.map((project, idx) => (
          <div className="project-card" key={idx}>
            {project.image ? (
              <img
                src={project.image}
                alt={project.title + " logo"}
                className="project-image"
                style={{
                  width: "100%",
                  height: "120px",
                  objectFit: "cover",
                  borderRadius: "12px",
                  marginBottom: "1em",
                  background:
                    "#222 linear-gradient(135deg, #333 40%, #444 100%)",
                }}
              />
            ) : (
              <div className="project-image-placeholder">Image</div>
            )}
            <h3>{project.title}</h3>
            <p className="project-bio-placeholder">
              {project.description || "Project bio/description placeholder"}
            </p>
            {project.link ? (
              <a
                className="see-project-btn"
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>See Project</span>
              </a>
            ) : (
              <button className="see-project-btn" disabled>
                <span>See Project</span>
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
