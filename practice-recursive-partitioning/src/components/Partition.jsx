import React, { useState } from "react";
import generateRandomColor from "../utils/generateRandomColor";

const Partition = ({ partition, setPartition }) => {
  const [sizes, setSizes] = useState([50, 50]); // Sizes of child partitions in percentage

  // partitioning between the children blocks
  const handleSplit = (direction) => {
    const child1 = {
      id: `${partition.id}-1`,
      color: partition.color,
      children: [],
    };
    const child2 = {
      id: `${partition.id}-2`,
      color: generateRandomColor(), 
      children: [],
    };

    setPartition({
      ...partition, 
      direction, 
      children: [child1, child2], 
    });
  };

  // delete the current partition
  const handleDelete = () => {
    setPartition(null); 
  };

  // Resizing Partitions
  const handleResize = (index, delta) => {
    setSizes((prevSizes) => {
      const total = prevSizes[index] + prevSizes[index + 1];
      let newSize1 = prevSizes[index] + delta;
      let newSize2 = prevSizes[index + 1] - delta;

      // resize prevention 
      if (newSize1 > total * 0.5) {
        newSize1 = total * 0.5;
        newSize2 = total - newSize1;
      } else if (newSize2 > total * 0.5) {
        newSize2 = total * 0.5;
        newSize1 = total - newSize2;
      }

      return prevSizes.map((size, i) =>
        i === index ? newSize1 : i === index + 1 ? newSize2 : size
      );
    });
  };

  return (
    <div
      className={`flex ${
        partition.direction === "vertical" ? "flex-row" : "flex-col"
      } h-full w-full`}
    >
      {partition.children && partition.children.length > 0 ? (
        partition.children.map((child, index) => (
          <React.Fragment key={child.id}>
            <div
              style={{
                flex: `${sizes[index]}%`,
                position: "relative",
              }}
            >
              {/* Rendering child partitions recursively */}
              <Partition
                partition={child}
                setPartition={(updatedChild) => {
                  const updatedChildren = [...partition.children];

                  // remove the deleted child
                  if (updatedChild === null) {
                    updatedChildren.splice(index, 1);
                  } else {
                    updatedChildren[index] = updatedChild;
                  }

                  setPartition({
                    ...partition,
                    children: updatedChildren,
                  });
                }}
              />
            </div>
            {index < partition.children.length - 1 && (
              <div
                className={`cursor-${
                  partition.direction === "vertical" ? "col-resize" : "row-resize"
                } bg-gray-400`}
                style={{
                  width: partition.direction === "vertical" ? "5px" : "100%",
                  height: partition.direction === "vertical" ? "100%" : "5px",
                }}
                onMouseDown={(e) => {
                  const start =
                    partition.direction === "vertical" ? e.clientX : e.clientY;

                  const moveHandler = (e) => {
                    const delta =
                      (partition.direction === "vertical"
                        ? e.clientX
                        : e.clientY) - start;
                    handleResize(index, (delta / window.innerWidth) * 100);
                  };

                  const upHandler = () => {
                    window.removeEventListener("mousemove", moveHandler);
                    window.removeEventListener("mouseup", upHandler);
                  };

                  window.addEventListener("mousemove", moveHandler);
                  window.addEventListener("mouseup", upHandler);
                }}
              />
            )}
          </React.Fragment>
        ))
      ) : (
        <div
          className="relative flex-1 border"
          style={{ backgroundColor: partition.color }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={() => handleSplit("vertical")}
              className="m-1 p-2 bg-gray-300"
            >
              v
            </button>
            <button
              onClick={() => handleSplit("horizontal")}
              className="m-1 p-2 bg-gray-300"
            >
              h
            </button>
            <button onClick={handleDelete} className="m-1 p-2 bg-red-300">
              -
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Partition;


