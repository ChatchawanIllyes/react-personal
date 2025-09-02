import React, { useEffect, useState } from "react";
import "./App.css";
import RainbowBackground from "./components/Background";
import ProfileDashboard from "./components/ProfileDashboard";
import ProjectsDashboard from "./components/ProjectsDashboard";
import Dock from "./components/Dock";
import { VscHome, VscFolder } from "react-icons/vsc";
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";

function App() {
  const [dark, setDark] = useState(false);
  const [showProjects, setShowProjects] = useState(false);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    document.body.style.background = dark
      ? "linear-gradient(to right, #000000ff, #000000ff 90%)"
      : "linear-gradient(to right, #020202ff, #294742ff, #294c54ff)";
    if (dark) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [dark]);

  // Example projects data
  const projects = [
    { title: "Project One" },
    { title: "Project Two" },
    { title: "Project Three" },
  ];

  const items = [
    {
      icon: <VscHome size={18} />,
      label: "Home",
      onClick: () => {
        setFade(false);
        setTimeout(() => {
          setShowProjects(false);
          setFade(true);
        }, 700);
      },
    },
    {
      icon: <VscFolder size={18} />,
      label: "Projects",
      onClick: () => {
        setFade(false);
        setTimeout(() => {
          setShowProjects(true);
          setFade(true);
        }, 700);
      },
    },
    {
      icon: dark ? (
        <MdOutlineDarkMode size={18} />
      ) : (
        <MdOutlineLightMode size={18} />
      ),
      label: "Theme",
      onClick: () => setDark((d) => !d),
    },
  ];

  return (
    <>
      {/* Keep RainbowBackground always mounted at the bottom */}
      <RainbowBackground />
      {/* Main content above the stars */}
      <div
        style={{
          transition: "opacity 1s",
          opacity: fade ? 1 : 0,
          position: "relative",
          zIndex: 2,
        }}
      >
        {showProjects ? (
          <ProjectsDashboard projects={projects} />
        ) : (
          <ProfileDashboard />
        )}
      </div>
      <Dock
        items={items}
        panelHeight={68}
        baseItemSize={50}
        magnification={70}
      />
    </>
  );
}

export default App;
