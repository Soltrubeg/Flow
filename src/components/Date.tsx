import { useState, useCallback, useEffect } from "react";
import { Handle, Position, useReactFlow } from "@xyflow/react";

function CurrentDate ({ id, data }) {
  const { updateNodeData } = useReactFlow();
  useEffect(() => {
    const interval = setInterval(() => {
      updateNodeData(id, { value: Date.now() });
    }, 5);

    return () => clearInterval(interval);
  }, [id, updateNodeData]);
  return (
    <div>
    <div className="node p-2 bg-red-700 rounded-t-md text-white">
        <p className="mr-2 ml-2">Date</p>
    </div>
    <div className="node p-2 bg-gray-800 text-white rounded-b-md">
      <Handle type="source" position={Position.Right} id="number" data-type="number" style={{top:41.5}}/>
    </div>
    </div>
  );
}

export default CurrentDate;