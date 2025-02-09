import { useState, useCallback, useEffect } from "react";
import { Handle, Position, useReactFlow, useNodesData, useNodeConnections } from "@xyflow/react";
import { VariableStore } from "./variables/VariableStore";

function SetVariable ({ id, data }) {

  const getVariable = VariableStore((state) => state.getVariable);
  const [varName, setVarName] = useState(data.name || "myVar");
  console.log(varName)
  const value = VariableStore((state) => state.variables[varName] ?? "N/A");

  const { updateNodeData } = useReactFlow();
  useEffect(() => {
    console.log(value)
      updateNodeData(id, { value: value })
  }, [updateNodeData, id, value]);
  return (
    <div>
    <div className="node p-2 bg-pink-700 rounded-t-md text-white">
        <p>Variable</p>
    </div>
    <div className="node p-2 bg-gray-800 text-white rounded-b-md">
    <input
        id={`text-${id}`}
        name="text"
        type="text"
        onChange={(e) => setVarName(e.target.value)}
        className="w-full text-white p-1 rounded bg-gray-600 nodrag focus:outline-none"
      />
      <Handle
        type="source" 
        position={Position.Right} 
        id="text"
        data-type="text" 
        />
    </div>
    </div>
  );
}

export default SetVariable;