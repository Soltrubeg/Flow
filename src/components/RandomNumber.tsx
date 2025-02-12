import { useState, useCallback, useEffect } from "react";
import { Handle, Position, useReactFlow, useNodesData, useNodeConnections } from "@xyflow/react";

function RandomNumber ({ id, data }) {

  const connections = useNodeConnections({
    handleType: 'target',
  });
  const nodeData = (useNodesData(connections[0]?.source))
  const incomingData = nodeData?.data ? nodeData.data.value : ""
  const { updateNodeData } = useReactFlow();
  useEffect(() => {
      if(incomingData!=false){
      updateNodeData(id, { value: Math.random() });
      }
  }, [incomingData, updateNodeData, id]);
  return (
    <div>
    <div className="node p-2 bg-red-700 rounded-t-md text-white">
        <p>Random Number (⚅)</p>
    </div>
    <div className="node p-2 bg-gray-800 text-white rounded-b-md">
      <Handle
        type="target" 
        position={Position.Left} 
        id="text" 
        data-type="text" 
        style={{top:51}}
        />
          <label className="label">
          Signal
        </label>
      <Handle
        type="source" 
        position={Position.Right} 
        id="text" 
        data-type="text" 
        style={{top:51}}
        />
    </div>
    </div>
  );
}

export default RandomNumber;