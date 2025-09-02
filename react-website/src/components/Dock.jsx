// Responsive, scalable Dock component using motion
"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "motion/react";
import {
  Children,
  cloneElement,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import "./Dock.css";

function DockItem({
  children,
  className = "",
  onClick,
  mouseX,
  spring,
  distance,
  magnification,
  baseItemSize,
}) {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseDistance = useTransform(mouseX, (val) => {
    const rect = ref.current?.getBoundingClientRect() ?? {
      x: 0,
      width: baseItemSize,
    };
    return val - rect.x - baseItemSize / 2;
  });

  const targetSize = useTransform(
    mouseDistance,
    [-distance, 0, distance],
    [baseItemSize, magnification, baseItemSize]
  );
  const size = useSpring(targetSize, spring);

  // Separate icon and label
  const icon = Children.toArray(children).find(
    (child) => child.type && child.type.name === "DockIcon"
  );
  const label = Children.toArray(children).find(
    (child) => child.type && child.type.name === "DockLabel"
  );

  return (
    <motion.div
      ref={ref}
      style={{
        width: size,
        height: size,
        minWidth: baseItemSize,
        minHeight: baseItemSize,
        position: "relative",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      onClick={onClick}
      className={`dock-item ${className}`}
      tabIndex={0}
      role="button"
      aria-haspopup="true"
    >
      {icon}
      {label && cloneElement(label, { isHovered })}
    </motion.div>
  );
}

function DockLabel({ children, className = "", isHovered }) {
  return (
    <AnimatePresence>
      {isHovered && (
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: -16 }}
          exit={{ opacity: 0, y: 0 }}
          transition={{
            duration: 0.22,
            type: "spring",
            stiffness: 180,
            damping: 18,
          }}
          className={`dock-label ${className}`}
          role="tooltip"
          style={{ x: "-50%", pointerEvents: "none" }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function DockIcon({ children, className = "" }) {
  return <div className={`dock-icon ${className}`}>{children}</div>;
}

export default function Dock({
  items,
  className = "",
  spring = { mass: 0.18, stiffness: 90, damping: 18 }, // optimized for smoothness
  magnification = 70,
  distance = 200,
  panelHeight = 68,
  dockHeight = 256,
  baseItemSize = 50,
}) {
  const mouseX = useMotionValue(Infinity);
  const isHovered = useMotionValue(0);

  // Responsive scaling for mobile and large screens
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Adjust sizes for mobile
  const isMobile = screenWidth < 600;
  const responsivePanelHeight = isMobile ? 48 : panelHeight;
  const responsiveBaseItemSize = isMobile ? 36 : baseItemSize;
  const responsiveMagnification = isMobile ? 48 : magnification;
  const responsiveDistance = isMobile ? 100 : distance;
  const responsiveDockHeight = isMobile ? 120 : dockHeight;

  const maxHeight = useMemo(
    () =>
      Math.max(
        responsiveDockHeight,
        responsiveMagnification + responsiveMagnification / 2 + 4
      ),
    [responsiveMagnification, responsiveDockHeight]
  );
  const heightRow = useTransform(
    isHovered,
    [0, 1],
    [responsivePanelHeight, maxHeight]
  );
  const height = useSpring(heightRow, spring);

  return (
    <motion.div
      style={{ height, scrollbarWidth: "none" }}
      className="dock-outer"
    >
      <motion.div
        onMouseMove={({ pageX }) => {
          isHovered.set(1);
          mouseX.set(pageX);
        }}
        onMouseLeave={() => {
          isHovered.set(0);
          mouseX.set(Infinity);
        }}
        className={`dock-panel ${className}`}
        style={{ height: responsivePanelHeight }}
        role="toolbar"
        aria-label="Application dock"
      >
        {items.map((item, index) => (
          <DockItem
            key={index}
            onClick={item.onClick}
            className={item.className}
            mouseX={mouseX}
            spring={spring}
            distance={responsiveDistance}
            magnification={responsiveMagnification}
            baseItemSize={responsiveBaseItemSize}
          >
            <DockIcon>{item.icon}</DockIcon>
          </DockItem>
        ))}
      </motion.div>
    </motion.div>
  );
}
