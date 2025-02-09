import { useState, useCallback, useEffect } from "react";
import { Handle, Position, useReactFlow, useNodes, useNodeConnections, useNodesData } from "@xyflow/react";

function SubstractNumbers ({ id, data }) {

  const minuendConnection = useNodeConnections({
    handleType: 'target', 
    handleId: 'minuend'
   });
   const nodeData = (useNodesData(minuendConnection[0]?.source))
     const minuendData = nodeData?.data ? nodeData.data.value : 0
   const [minuend, setMinuend] = useState(data.value);
  const subtrahends = useNodeConnections({
     handleType: 'target', 
     handleId: 'subtrahends'
    });
  
  const nodeDataMap = useNodes();
  
  const { updateNodeData } = useReactFlow();
  const [subtrahend, setSubtrahend] = useState(data.value);
  const subtrahendData = subtrahends.reduce((sum, connection) => {
    const sourceNode = nodeDataMap.find((node) => node.id === connection.source);
    return sum + (sourceNode?.data?.value ? parseFloat(sourceNode.data.value) : 0);
  }, 0);
  useEffect(() => {
    if (subtrahendData != subtrahend || minuendData != minuend){
      setSubtrahend(subtrahendData);
      setMinuend(minuendData);
      const newValue = minuendData-subtrahendData
      console.log(minuendData + " - " + subtrahendData)
      updateNodeData(id, { value: newValue });
    }
  }, [minuendData, minuend, subtrahendData, subtrahend, updateNodeData, id]);
  return (
    <div>
    <div className="node p-2 bg-red-700 rounded-t-md text-white">
        <p>Substract Numbers (-)</p>
    </div>
    <div className="node p-2 bg-gray-800 text-white rounded-b-md">
      <div>
      <Handle
        type="target" 
        position={Position.Left} 
        style={{top:50}}
        id="minuend"
        isConnectable={minuendConnection.length < 1}
        />
        <label className="label">
          Minuend
        </label>
      </div>
      <div>
      <Handle
        type="target" 
        position={Position.Left} 
        style={{top:69}}
        id="subtrahends" 
        />
        <label className="label">
          Subtrahend(s)
        </label>
      </div>
      <div>
      <Handle
        type="source" 
        position={Position.Right} 
        id="number" 
        style={{top:59.5}}
        data-type="number" 
        />
        </div>
    </div>
    </div>
  );
}

export default SubstractNumbers;