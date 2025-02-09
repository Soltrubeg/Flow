import { useState, useCallback, useEffect } from "react";
import { Handle, Position, useReactFlow, useNodesData, useNodeConnections } from "@xyflow/react";

function RepeatString ({ id, data }) {

  const connections = useNodeConnections({
    type: 'target',
  });
  const nodeData = (useNodesData(connections[0]?.source))
  const incomingData = nodeData?.data ? nodeData.data.value : ""
  const { updateNodeData } = useReactFlow();
  const [number, setNumber] = useState(data.value);
  useEffect(() => {
    if (number) {
      const newValue = incomingData.repeat(number);
      updateNodeData(id, { value: newValue });
    }
  }, [incomingData, number, updateNodeData, id]);
  const onChange = useCallback((evt) => {
    const cappedNumber = Math.min(256, Math.max(0, evt.target.value));
    setNumber(cappedNumber);
  }, []);
  return (
    <div>
    <div className="node p-2 bg-blue-700 rounded-t-md text-white">
        <p>Repeat Text</p>
    </div>
    <div className="node p-2 bg-gray-800 text-white rounded-b-md">
      <input
        id={`number-${id}`}
        name="number"
        type="number"
        value={number}
        min="1"
        className="w-full text-white p-1 rounded bg-gray-600 nodrag focus:outline-none"
        onChange={onChange}
      />
      <Handle
        type="target" 
        position={Position.Left} 
        id="rep" 
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

export default RepeatString;