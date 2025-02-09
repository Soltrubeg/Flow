import { useState, useCallback, useEffect } from "react";
import { Handle, Position, useReactFlow } from "@xyflow/react";

function StringConstant ({ id, data }) {
  const { updateNodeData } = useReactFlow();
  const [string, setString] = useState(data.value);
  useEffect(() => { 
      updateNodeData(id, { value: string });
  }, [string, updateNodeData, id]);
    const onChange = useCallback((evt) => {
    setString(evt.target.value);
  }, []);
  return (
    <div>
    <div className="node p-2 bg-blue-700 rounded-t-md text-white">
        <p>Text Constant</p>
    </div>
    <div className="node p-2 bg-gray-800 text-white rounded-b-md">
      <input
        id={`text-${id}`}
        name="text"
        type="text"
        className="w-full text-white p-1 rounded bg-gray-600 nodrag focus:outline-none"
        onChange={onChange}
      />
      <Handle
        type="source" 
        position={Position.Right} 
        id="number" 
        data-type="number" 
        />
    </div>
    </div>
  );
}

export default StringConstant;