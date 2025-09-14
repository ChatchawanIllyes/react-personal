import React, { useEffect, useState } from "react";
import "./App.css";
import RainbowBackground from "./components/Background";
import ProfileDashboard from "./components/ProfileDashboard";
import ProjectsDashboard from "./components/ProjectsDashboard";
import Dock from "./components/Dock";
import {
  FolderIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/24/outline/index.js";

function App() {
  console.log("App Rendering");
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
      image: "/CloudMed.png",
      link: "https://github.com/ChatchawanIllyes/CloudMed",
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
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          style={{ width: 22, height: 22, display: "block", color: "white" }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
          />
        </svg>
      ),
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
      icon: <FolderIcon style={{ width: 22, height: 22, color: "white" }} />,
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
        <MoonIcon style={{ width: 22, height: 22, color: "white" }} />
      ) : (
        <SunIcon style={{ width: 22, height: 22, color: "white" }} />
      ),
      label: "Theme",
      onClick: () => setDark((d) => !d),
    },
  ];

  console.log("FolderIcon:", FolderIcon);
  console.log("MoonIcon:", MoonIcon);
  console.log("SunIcon:", SunIcon);

  return (
    <>
      {/* Keep RainbowBackground always mounted at the bottom */}
      <RainbowBackground />
      {/* Main content above the stars */}
      <div className="crossfade-container">
        <div
          className={`crossfade-view${
            !pendingProjects && fade ? " active" : ""
          }`}
          style={{ minHeight: "100vh" }}
        >
          <ProfileDashboard dark={dark} />
        </div>
        <div
          className={`crossfade-view${
            pendingProjects && fade ? " active" : ""
          }`}
          style={{ minHeight: "100vh" }}
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
