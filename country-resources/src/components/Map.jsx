import React, { useRef, useEffect, useState, useImperativeHandle, forwardRef } from "react";
import { motion } from "framer-motion";
import worldMap from "../assets/world.svg";
import "../styles/ViewMap.css";

const zoomButtonVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.3,
      ease: "easeOut"
    }
  })
};

const Map = forwardRef(({ onCountryClick }, ref) => {
  const objectRef = useRef(null);
  const countriesRef = useRef([]);
  const [zoom, setZoom] = useState(100);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setOffset({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleZoomIn = () => setZoom((z) => Math.min(z + 10, 200));
  const handleZoomOut = () => setZoom((z) => Math.max(z - 10, 50));

  useImperativeHandle(ref, () => ({
    resetHighlight: () => {
      countriesRef.current.forEach((el) => {
        const original = el.getAttribute("data-original-fill") || "#153112";
        el.style.fill = original;
      });
    }
  }));

  useEffect(() => {
    const objectEl = objectRef.current;
    const handleLoad = () => {
      const svgDoc = objectEl.contentDocument;
      if (!svgDoc) return;

      const paths = svgDoc.querySelectorAll("path");
      countriesRef.current = Array.from(paths);

      paths.forEach((country) => {
        if (!country.hasAttribute("data-original-fill")) {
          country.setAttribute("data-original-fill", country.style.fill || "#A4AC86");
        }
        country.style.fill = "#A4AC86";
        country.style.stroke = "#705d43";
        country.style.strokeWidth = "1";

        const name = country.getAttribute("name") || country.classList.value;

        country.addEventListener("mouseenter", () => {
          const classList = [...country.classList];
          const selector = classList.length
            ? classList.map((cls) => "." + cls).join("")
            : null;
          const elements = selector
            ? svgDoc.querySelectorAll(selector)
            : [country];
          elements.forEach((el) => {
            el.style.fill = "#333D29";
          });
        });

        country.addEventListener("mouseout", () => {
          const classList = [...country.classList];
          const selector = classList.length
            ? classList.map((cls) => "." + cls).join("")
            : null;
          const elements = selector
            ? svgDoc.querySelectorAll(selector)
            : [country];
          elements.forEach((el) => {
            const original = el.getAttribute("data-original-fill") || "#153112";
            el.style.fill = original;
          });
        });

        country.addEventListener("click", () => {
          onCountryClick(name);
        });
      });
    };

    objectEl.addEventListener("load", handleLoad);
    return () => objectEl.removeEventListener("load", handleLoad);
  }, [onCountryClick]);

  useEffect(() => {
    const svgDoc = objectRef.current?.contentDocument;
    const svgEl = svgDoc?.querySelector("svg");
    if (svgEl) {
      svgEl.style.transform = `scale(${zoom / 100})`;
      svgEl.style.transformOrigin = "top center"; 
      svgEl.style.transition = "transform 0.3s ease";
    }
  }, [zoom]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}

    >
      <object
        ref={objectRef}
        type="image/svg+xml"
        data={worldMap}
        aria-label="World Map"
      />

      <motion.div
        className="zoom-controls"
        initial="hidden"
        animate="visible"
      >
        {["+", "–"].map((label, i) => (
          <motion.button
            key={label}
            onClick={label === "+" ? handleZoomIn : handleZoomOut}
            variants={zoomButtonVariants}
            custom={i}
          >
            {label}
          </motion.button>
        ))}
        <motion.p
          className="zoom-value"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.3 }}
        >
          {zoom}%
        </motion.p>
      </motion.div>
    </motion.div>
  );
});

export default Map;
