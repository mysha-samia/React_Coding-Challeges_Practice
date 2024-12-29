import React, { useRef, useState, useEffect } from "react";
import "../App.css";

const CanvasBoard = () => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  const [tool, setTool] = useState("pen");
  const [isDrawing, setIsDrawing] = useState(false);
  const [lines, setLines] = useState([]);
  const currentLine = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const context = canvas.getContext("2d");
    context.lineCap = "round";
    context.lineJoin = "round";
    context.strokeStyle = "black";
    context.lineWidth = 5;
    contextRef.current = context;

    redrawCanvas();
  }, [lines]);

  //for easer checking if the pointer is near or not from the cursor
  const isPointNear = (point, x, y, radius = 10) => {
    return Math.hypot(point.x - x, point.y - y) < radius;
  };

  //initializing the drawing
  const startDrawing = (e) => {
    if (tool === "pen") {
      const { offsetX, offsetY } = e.nativeEvent;
      currentLine.current = [{ x: offsetX, y: offsetY }];
      setIsDrawing(true);
    }
  };

  //for multiple lines
  const draw = (e) => {
    if (!isDrawing || tool !== "pen") return;

    const { offsetX, offsetY } = e.nativeEvent;
    currentLine.current.push({ x: offsetX, y: offsetY });

    redrawCanvas();
    drawLine(currentLine.current);
  };

  //saving rhe current line
  const stopDrawing = () => {
    if (tool === "pen" && currentLine.current.length > 0) {
      setLines([...lines, currentLine.current]);
      currentLine.current = [];
    }
    setIsDrawing(false);
  };

  //erasing lines when the curson is near it
  const eraseLine = (e) => {
    if (tool !== "erase") return;

    const { offsetX, offsetY } = e.nativeEvent;

    const remainingLines = lines.filter(
      (line) => !line.some((point) => isPointNear(point, offsetX, offsetY))
    );

    if (remainingLines.length !== lines.length) {
      setLines(remainingLines);
      redrawCanvas();
    }
  };

  const redrawCanvas = () => {
    const contex = contextRef.current;
    //clearing the lines from the canvas
    contex.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    lines.forEach((line) => drawLine(line));
  };

  //   single line
  const drawLine = (line) => {
    const contex = contextRef.current;
    if (line.length === 0) return;

    contex.beginPath();
    contex.moveTo(line[0].x, line[0].y);
    line.forEach((point) => contex.lineTo(point.x, point.y));
    contex.stroke();
  };

  return (
    <div className="canvas-container">
      {/* tools */}
      <div className="toolbar">
        <button
          onClick={() => setTool("pen")}
          className={tool === "pen" ? "active" : ""}
        >
          Pen
        </button>
        <button
          onClick={() => setTool("erase")}
          className={tool === "erase" ? "active" : ""}
        >
          Erase
        </button>
      </div>

      {/* canvas */}
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={(e) => {
          draw(e);
          eraseLine(e);
        }}
        onMouseUp={stopDrawing}
        onMouseOut={stopDrawing}
        className="canvas"
      />
    </div>
  );
};

export default CanvasBoard;
