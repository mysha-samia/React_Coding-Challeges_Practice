import React, { useState } from "react";
import Block from "./component/Block";
import "./index.css";

function App() {
  const [blocks, setBlocks] = useState([
    {
      id: 0, //parentid(initially) set to 0
      x: Math.random() * 700,
      y: Math.random() * 500,
      parentId: null, 
    },
  ]);
// for adding blocks parent Id is passed
  const addBlock = (parentId) => {
    const newBlock = {
      id: blocks.length,
      x: Math.random() * 600,
      y: Math.random() * 400,
      parentId: parentId,
    };
    setBlocks([...blocks, newBlock]);
  };

  const updateBlockPosition = (id, x, y) => {
    setBlocks((prevBlocks) =>
      prevBlocks.map((block) =>
        block.id === id ? { ...block, x, y } : block
      )
    );
  };

  return (
    <div className="App">
      <svg className="lines">
        {blocks.map((block) =>
          block.parentId !== null ? (
            <line
              key={`line-${block.id}`}
              x1={blocks[block.parentId].x + 50} 
              y1={blocks[block.parentId].y + 25} 
              x2={block.x + 50}
              y2={block.y + 25}
              stroke="black"
              strokeDesharray="5,5"
            />
          ) : null
        )}
      </svg>
      {blocks.map((block) => (
        <Block
          key={block.id}
          id={block.id}
          x={block.x}
          y={block.y}
          onAdd={() => addBlock(block.id)}
          onDrag={updateBlockPosition}
        />
      ))}
    </div>
  );
}

export default App;
