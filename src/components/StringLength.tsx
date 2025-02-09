import { useState, useCallback, useEffect } from "react";
import { Handle, Position, useReactFlow, useNodesData, useNodeConnections } from "@xyflow/react";

function StringLength ({ id, data }) {

  const connections = useNodeConnections({
    type: 'target',
  });
  const nodeData = (useNodesData(connections[0]?.source))
  const incomingData = nodeData?.data ? nodeData.data.value : ""
  const { updateNodeData } = useReactFlow();
  useEffect(() => {
      const newValue = incomingData.length
      updateNodeData(id, { value: newValue });
  }, [incomingData, updateNodeData, id]);
  return (
    <div>
    <div className="node p-2 bg-blue-700 rounded-t-md text-white">
        <p>Text Length</p>
    </div>
    <div className="node p-2 bg-gray-800 text-white rounded-b-md">
      <Handle
        type="target" 
        position={Position.Left} 
        id="text" 
        data-type="text" 
        isConnectable={connections.length < 1}
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

export default StringLength;