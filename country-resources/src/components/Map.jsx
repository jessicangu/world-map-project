import React, { useRef, useEffect, useState, useImperativeHandle, forwardRef } from "react";
import worldMap from "../assets/world.svg";

const Map = forwardRef(({ onCountryClick }, ref) => {
  const objectRef = useRef(null);
  const [zoom, setZoom] = useState(100);
  const countriesRef = useRef([]);

  useImperativeHandle(ref, () => ({
    resetHighlight: () => {
      countriesRef.current.forEach((el) => {
        const original = el.getAttribute("data-original-fill") || "#443d4b";
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
          country.setAttribute("data-original-fill", country.style.fill || "#443d4b");
        }
        country.style.fill = "#443d4b";

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
            el.style.fill = "#c99aff";
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
            const original = el.getAttribute("data-original-fill") || "#443d4b";
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
      svgEl.style.width = `${zoom}vw`;
      svgEl.style.height = `${zoom}vh`;
    }
  }, [zoom]);

  return (
    <>
      <div className="zoom-controls">
        <button className="zoom-out" onClick={() => setZoom(z => Math.max(z - 100, 100))}>-</button>
        <button className="zoom-in" onClick={() => setZoom(z => Math.min(z + 100, 500))}>+</button>
        <p className="zoom-value">{zoom}%</p>
      </div>
      <div className="world-map">
        <object
          ref={objectRef}
          type="image/svg+xml"
          data={worldMap}
          aria-label="World Map"
        />
      </div>
    </>
  );
});

export default Map;
