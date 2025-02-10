import { useState, useCallback, useEffect } from "react";
import { Handle, Position, useReactFlow, useNodes, useNodeConnections } from "@xyflow/react";

function AddNumbers ({ id, data }) {

  const connections = useNodeConnections({ handleType: 'target', });
  const nodeDataMap = useNodes();
  
  const { updateNodeData } = useReactFlow();
  const [number, setNumber] = useState(data.value);
  const incomingData = connections.reduce((sum, connection) => {
    const sourceNode = nodeDataMap.find((node) => node.id === connection.source);
    return sum + (sourceNode?.data?.value ? parseFloat(sourceNode.data.value) : 0);
  }, 0);
  useEffect(() => {
    if (incomingData != number){
      setNumber(incomingData);
      const newValue = incomingData.toString();
      updateNodeData(id, { value: newValue });
    }
  }, [incomingData, connections, nodeDataMap, number, updateNodeData, id]);
  return (
    <div>
    <div className="node p-2 bg-red-700 rounded-t-md text-white">
        <p>Add Numbers (+)</p>
    </div>
    <div className="node p-2 bg-gray-800 text-white rounded-b-md">
      <Handle
        type="target" 
        position={Position.Left} 
        id="number" 
        data-type="number" 
        style={{top:41.5}}
        />
      <Handle
        type="source" 
        position={Position.Right} 
        id="number" 
        data-type="number" 
        style={{top:41.5}}
        />
    </div>
    </div>
  );
}

export default AddNumbers;