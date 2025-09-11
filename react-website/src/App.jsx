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
  const [pendingProjects, setPendingProjects] = useState(showProjects);

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
    {
      title: "CodeSense",
      description:
        "Custom coding platform for visually impaired children that uses screen reader compatibility and voice-controlled programming to make learning to code more inclusive.",
      image: "/CodeSense_Pic.png", // Place your image in public folder
      link: "https://code-sense-gamma.vercel.app/",
    },
    {
      title: "CloudMed",
      description:
        "Cloud-based storage solution for medical VR devices, built with Azure Blob Storage to securely host 250+ VR video files and eliminate reliance on internal headset storage.",
      image: "/project-cloudmed.png",
      link: "https://code-sense-gamma.vercel.app/",
    },
    {
      title: "Market Data Service",
      description:
        "Limited-availability platform built with FastAPI, PostgreSQL, and Kafka to process live data for 100+ stocks in real time.",
      image: "/stock_charts.png",
      link: "https://github.com/ChatchawanIllyes/market_data_service?tab=readme-ov-file",
    },
    {
      title: "Plantify",
      description:
        "Transform any recipe into a plant-based version using AI by pasting a URL and getting vegan ingredient substitutions.",
      image: "/plantify_v3.png",
      link: "https://plantify.figma.site/",
    },
  ];

  const transitionDuration = 500;
  const items = [
    {
      icon: <VscHome size={18} />, 
      label: "Home",
      onClick: () => {
        if (!showProjects) return;
        setFade(false);
        setTimeout(() => {
          setPendingProjects(false);
          setFade(true);
          setTimeout(() => setShowProjects(false), transitionDuration);
        }, transitionDuration);
      },
    },
    {
      icon: <VscFolder size={18} />, 
      label: "Projects",
      onClick: () => {
        if (showProjects) return;
        setFade(false);
        setTimeout(() => {
          setPendingProjects(true);
          setFade(true);
          setTimeout(() => setShowProjects(true), transitionDuration);
        }, transitionDuration);
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
      <div className="crossfade-container">
        <div
          className={`crossfade-view${!pendingProjects && fade ? ' active' : ''}`}
          style={{ minHeight: '100vh' }}
        >
          <ProfileDashboard dark={dark} />
        </div>
        <div
          className={`crossfade-view${pendingProjects && fade ? ' active' : ''}`}
          style={{ minHeight: '100vh' }}
        >
          <ProjectsDashboard projects={projects} />
        </div>
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
