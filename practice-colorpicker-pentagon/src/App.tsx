
import React, { useState, useEffect, useRef } from "react";
import "./index.css";

function App() {
  const canvasRef = useRef(null);
  const [hue, setHue] = useState(0.5); // Hue value (range 0-1)

  useEffect(() => {
    const canvas = canvasRef.current;
    console.log(canvasRef.current);
    const ctx = canvas.getContext("2d");

    // empty canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // generating gradiant
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, `hsl(${hue * 360}, 100%, 50%)`); // Start color
    gradient.addColorStop(1, "white"); // End color

    // filling the canvas with the gradiant
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, [hue]);

  const updateHue = (event) => {
    setHue(parseFloat(event.target.value));
  };

  return (
    <div className="container">
      <h1>Color Picker Pentagon</h1>
      <div className="canvas-wrapper">
        <canvas
          ref={canvasRef}
          width="500"
          height="500"
          className="pentagon-canvas"
        />
      </div>
      <input
        type="range"
        step="0.01"
        min="0"
        max="1"
        value={hue}
        onChange={updateHue}
        className="slider"
      />
    </div>
  );
}

export default App;


