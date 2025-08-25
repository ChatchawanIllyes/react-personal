import React, { useEffect, useRef } from "react";
import "./UniverseStars.css";

const UniverseStars = () => {
  const universeRef = useRef(null);

  useEffect(() => {
    const starCount = 400;
    const maxTime = 30;
    const universe = universeRef.current;
    const width = window.innerWidth;
    const height = window.innerHeight;

    universe.innerHTML = "";

    for (let i = 0; i < starCount; ++i) {
      const ypos = Math.round(Math.random() * height);
      const star = document.createElement("div");
      const speed = 1000 * (Math.random() * maxTime + 1);
      star.setAttribute("class", "star" + (3 - Math.floor(speed / 1000 / 8)));
      star.style.backgroundColor = "white";
      star.style.top = `${ypos}px`;

      universe.appendChild(star);

      star.animate(
        [
          {
            transform: `translate3d(${width}px, 0px, 0)`
          },
          {
            transform: `translate3d(-${Math.random() * 256}px, 0px, 0)`
          }
        ],
        {
          delay: Math.random() * -speed,
          duration: speed,
          iterations: 1000
        }
      );
    }
  }, []);

  return (
    <div
      id="universe"
      ref={universeRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 0
      }}
    />
  );
};

export default UniverseStars;