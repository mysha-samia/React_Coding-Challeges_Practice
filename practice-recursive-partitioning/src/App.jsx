import React, { useState } from "react";
import Partition from "./components/Partition";
import generateRandomColor from "./utils/generateRandomColor";

function App() {
  const [rootPartition, setRootPartition] = useState({
    id: "root",
    color: generateRandomColor(),
    children: [],
    direction: "none",
  });

  return (
    <div className="h-screen w-screen">
      <Partition
        partition={rootPartition}
        setPartition={setRootPartition}
      />
    </div>
  );
}

export default App;







