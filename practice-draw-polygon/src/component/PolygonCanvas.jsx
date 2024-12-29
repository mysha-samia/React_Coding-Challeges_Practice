import React, { useState, useRef } from "react";

function PolygonCanvas() {
  const [polygons, setPolygons] = useState([]); // Completed polygons
  const [currentPolygon, setCurrentPolygon] = useState([]); // Polygon being drawn
  const svgRef = useRef(null); // Reference to the SVG element

  // Handle click to add vertices
  const handleSvgClick = (e) => {
    const rect = svgRef.current.getBoundingClientRect(); // Get SVG bounds
    const x = e.clientX - rect.left; // Click X relative to SVG
    const y = e.clientY - rect.top; // Click Y relative to SVG

    console.log(`Click detected at (${x}, ${y})`); // Debugging output

    // Close the polygon if near the first vertex
    if (currentPolygon.length > 2) {
      const [startX, startY] = currentPolygon[0];
      if (Math.hypot(x - startX, y - startY) < 10) {
        setPolygons([...polygons, currentPolygon]); // Save completed polygon
        setCurrentPolygon([]); // Reset for a new polygon
        return;
      }
    }

    // Add the new vertex to the current polygon
    setCurrentPolygon([...currentPolygon, [x, y]]);
  };

  return (
    <svg
      ref={svgRef}
      width="800"
      height="600"
      style={{
        background: "white",
        border: "1px solid #ccc",
        cursor: "crosshair",
      }}
      onClick={handleSvgClick} // Attach click handler
    >
      {/* Render completed polygons */}
      {polygons.map((polygon, polygonIndex) => (
        <polygon
          key={polygonIndex}
          points={polygon.map(([x, y]) => `${x},${y}`).join(" ")}
          fill="rgba(0, 128, 255, 0.3)"
          stroke="blue"
          strokeWidth="2"
        />
      ))}

      {/* Render the current polygon */}
      {currentPolygon.length > 0 && (
        <>
          <polygon
            points={currentPolygon.map(([x, y]) => `${x},${y}`).join(" ")}
            fill="rgba(0, 128, 255, 0.2)"
            stroke="blue"
            strokeWidth="2"
          />
          {currentPolygon.map(([x, y], index) => (
            <circle key={index} cx={x} cy={y} r="5" fill="blue" />
          ))}
        </>
      )}
    </svg>
  );
}

export default PolygonCanvas;







