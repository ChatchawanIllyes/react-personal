import React, { useEffect, useState } from "react";
import "./App.css";
import RainbowBackground from "./components/Background";
import ProfileDashboard from "./components/ProfileDashboard";
import Dock from "./components/Dock";
import { VscHome, VscFolder } from "react-icons/vsc";
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";

function App() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.body.style.background = dark
      ? "linear-gradient(to right, #111, #222 90%)"
      : "linear-gradient(to right, #111, #889498)";
  }, [dark]);

  const items = [
    {
      icon: <VscHome size={18} />,
      label: "Home",
      onClick: () => {},
    },
    {
      icon: <VscFolder size={18} />,
      label: "Projects",
      onClick: () => {},
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
      <RainbowBackground />
      <ProfileDashboard />
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
