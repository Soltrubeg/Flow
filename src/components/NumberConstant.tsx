import { useState, useCallback } from "react";
import { Handle, Position, useReactFlow } from "@xyflow/react";

function NumberNode ({ id, data }) {
  const { updateNodeData } = useReactFlow();
  const [number, setNumber] = useState(data.value);
  const onChange = useCallback((evt) => {
    setNumber(evt.target.value);
    updateNodeData(id, { value: evt.target.value });
  }, []);
  return (
    <div>
    <div className="node p-2 bg-red-700 rounded-t-md text-white">
        <p>Number Constant</p>
    </div>
    <div className="node p-2 bg-gray-800 text-white rounded-b-md">
      <input
        type="number"
        className="w-full text-white p-1 rounded bg-gray-600 nodrag focus:outline-none"
        onChange={onChange}
      />
      <Handle type="source" position={Position.Right} id="number" data-type="number">
        </Handle>
    </div>
    </div>
  );
}

export default NumberNode;