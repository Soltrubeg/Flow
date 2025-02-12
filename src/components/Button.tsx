import { useState, useCallback } from "react";
import { Handle, Position, useReactFlow } from "@xyflow/react";

function Button ({ id, data }) {
  const { updateNodeData } = useReactFlow();
  const Click = useCallback((evt) => {
    updateNodeData(id, { value: true });
  }, []);
  const Release = useCallback((evt) => {
    updateNodeData(id, { value: false });
  }, []);
  return (
    <div>
    <div className="node p-2 bg-emerald-700 rounded-t-md text-white">
        <p className="mr-3 ml-3">Button</p>
    </div>
    <div className="node p-2 bg-gray-800 text-white rounded-b-md">
      <button
        className="w-full text-white p-1 rounded bg-gray-600 nodrag focus:outline-none"
        onMouseDown={Click}
        onMouseUp={Release}
      >Click</button>
      <Handle type="source" position={Position.Right} id="number" data-type="number" style={{top:54}}>
        </Handle>
    </div>
    </div>
  );
}

export default Button;