import "./ProfileDashboard.css";

export default function ProfileDashboard() {
  return (
    <div className="dashboard-bg">
      <div className="dashboard-grid">
        <div className="card profile-card">
          <img src="/avatar.png" alt="avatar" className="avatar" />
          <div className="profile-icons">
            <a href="#"><img src="/github.svg" alt="GitHub" /></a>
            <a href="#"><img src="/linkedin.svg" alt="LinkedIn" /></a>

          </div>
          <p className="greet">Hey, I'm <span className="Name">Chatchawan.</span></p>
          <div className="subheading">CS Student & Developer</div>
          <div className="location">
            <span role="img" aria-label="location">📍</span> Texas, United States
          </div>
        </div>

        <div className="card bio-card">
          <div className="bio-header">ChatchawanIllyes/README.md</div>
          <h2>
            <u>Slice of Me</u>
          </h2>
          <div className="bio-text">
            I’m a rising sophomore Computer Science student who loves anime and creative projects. Beyond my classes, I’m always exploring full-stack tools and frameworks to bring cool ideas to life.
          </div>
        </div>


        
      </div>
    </div>
  );
}