import { useState, useCallback, useEffect } from "react";
import { Handle, Position, useReactFlow, useNodesData, useNodeConnections } from "@xyflow/react";
import { VariableStore } from "./variables/VariableStore";

function SetVariable ({ id, data }) {

  const setVariable = VariableStore((state) => state.setVariable);
  const [varName, setVarName] = useState(data.name || "myVar");
  const [varValue, setVarValue] = useState(data.value || 0);

  const onChange = useCallback((evt) => {
    setVarName(evt.target.value);
    update();
  }, []);

  const connections = useNodeConnections({
    type: 'target',
  });
  const nodeData = (useNodesData(connections[0]?.source))
  const incomingData = nodeData?.data ? nodeData.data.value : ""
  const { updateNodeData } = useReactFlow();
  function update(){
    setVarValue(incomingData)
    setVariable(varName, incomingData)
    console.log(varName + " = " + incomingData)
  }
  useEffect(() => {
    if(incomingData != varValue){
      update();
    }
  
  }, [incomingData, varValue, update]);
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