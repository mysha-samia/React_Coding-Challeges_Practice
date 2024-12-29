import React, { useState } from "react";

function Block({ id, x, y, onAdd, onDrag }) {
  const [position, setPosition] = useState({ x, y });
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = (e) => {
    setIsDragging(true);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const newX = e.clientX - 50; 
    const newY = e.clientY - 25; 
    setPosition({ x: newX, y: newY });
    onDrag(id, newX, newY);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      className="block"
      style={{ left: position.x, top: position.y }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div>{id}</div>
      <button onClick={(e) => { e.stopPropagation(); onAdd(); }}>+</button>
    </div>
  );
}

export default Block;
