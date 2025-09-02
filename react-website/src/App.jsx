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
      ? "linear-gradient(to right, #000000ff, #222222ff 90%)"
      : "linear-gradient(to right, #020202ff, #294647ff, #34674aff, #c6c6c6ff)";
    if (dark) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [dark]);

  // Example projects data
  const projects = [
    { title: "CodeSense", description: "Custom coding platform for visually impaired children that uses screen reader compatibility and voice-controlled programming to make learning to code more inclusive."  },
    { title: "CloudMed", description: "Cloud-based storage solution for medical VR devices, built with Azure Blob Storage to securely host 250+ VR video files and eliminate reliance on internal headset storage." },
    { title: "Market Data Service", description: "Limited-availability platform built with FastAPI, PostgreSQL, and Kafka to process live data for 100+ stocks in real time." },
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
          <ProjectsDashboard 
          projects={projects}
        
           />
        ) : (
          <ProfileDashboard dark={dark} />
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
