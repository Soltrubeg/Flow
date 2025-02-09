import { useState, useCallback, useEffect } from "react";
import { Handle, Position, useReactFlow, useNodesData, useNodeConnections } from "@xyflow/react";
import { VariableStore } from "./variables/VariableStore";

function SetVariable ({ id, data }) {
  const { updateNodeData } = useReactFlow();

  const setVariable = VariableStore((state) => state.setVariable);
  const [varName, setVarName] = useState(data.value || "");
  const [varValue, setVarValue] = useState(data.value || "");

  const onChange = useCallback((evt) => {
    setVarName(evt.target.value);
    console.log(varName)
    update();
  }, []);

  const connections = useNodeConnections({
    type: 'target',
  });
  const nodeData = (useNodesData(connections[0]?.source))
  const incomingData = nodeData?.data ? nodeData.data.value : ""

  function update(){
    setVarValue(incomingData)
    setVariable(varName, incomingData)
    console.log(varName + " = " + incomingData)
  }
  useEffect(() => { 
    updateNodeData(id, { value: varName });
}, [varName, updateNodeData, id]);
useEffect(() => { 
  if(incomingData!=varValue){
    update();
  }
}, [incomingData, varValue,update]);
  return (
    <div>
    <div className="node p-2 bg-pink-700 rounded-t-md text-white">
        <p>Set Variable</p>
    </div>
    <div className="node p-2 bg-gray-800 text-white rounded-b-md">
    <input
        id={`text-${id}`}
        name="text"
        type="text"
        value={varName}
        onChange={onChange}
        className="w-full text-white p-1 rounded bg-gray-600 nodrag focus:outline-none"
      />
      <Handle
        type="target" 
        position={Position.Left} 
        id="text"
        data-type="text" 
        isConnectable={connections.length < 1}
        />
    </div>
    </div>
  );
}

export default SetVariable;