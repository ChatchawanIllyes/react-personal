import "./ProfileDashboard.css";

export default function ProfileDashboard() {
  return (
    <div className="dashboard-bg">
      <div className="dashboard-grid">
        <div className="card profile-card">
          <img src="/mcofficial1.png" alt="avatar" className="avatar" />
          <div className="profile-icons">
            <a href="https://github.com/ChatchawanIllyes" target="_blank"><img src="/github-logo.png" alt="GitHub" /></a>
            <a href="https://www.linkedin.com/in/chatchawanillyes/" target="_blank"><img src="/linkedin-square.png" alt="LinkedIn" /></a>

          </div>
          <p className="greet">Hey, I'm</p> <span className="Name">Chatchawan.</span>
          <div className="subheading">CS Student & Developer</div>
          <div className="location">
            <img className="pin-pic" src="./map-pin.png" alt="pin location" /> Texas, United States
          </div>
        </div>

        <div className="card bio-card">
          <a target="_blank" className="profile-header-close" href="https://github.com/ChatchawanIllyes"><div  className="bio-header"><span className="git-name">ChatchawanIllyes</span>/<span className="git-name">README</span>.md</div></a>
          
          
          <h2>
            <u>Slice of Me</u>
          </h2>
          <div className="bio-text">
            I’m a rising sophomore Computer Science student who loves anime and creative projects. Beyond my classes, I’m always exploring full-stack tools and frameworks to bring cool ideas to life!
          </div>
        </div>


        
      </div>
    </div>
  );
}