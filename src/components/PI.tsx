import { useState, useCallback, useEffect } from "react";
import { Handle, Position, useReactFlow } from "@xyflow/react";

function PI ({ id, data }) {
  const { updateNodeData } = useReactFlow();
  useEffect(() => {
      updateNodeData(id, { value: Math.PI.toString() });
  }, [id]);
  return (
    <div>
    <div className="node p-2 bg-red-700 rounded-t-md text-white">
        <p className="mr-5 ml-5">PI (π)</p>
    </div>
    <div className="node p-2 bg-gray-800 text-white rounded-b-md">
      <Handle type="source" position={Position.Right} id="number" data-type="number" style={{top:41.5}}/>
    </div>
    </div>
  );
}

export default PI;