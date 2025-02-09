import { useState, useCallback, useEffect } from "react";
import { Handle, Position, useReactFlow, useNodesData, useNodeConnections } from "@xyflow/react";

function RoundNumber ({ id, data }) {

  const connections = useNodeConnections({
    handleType: 'target',
  });
  const nodeData = (useNodesData(connections[0]?.source))
  const incomingData = nodeData?.data ? nodeData.data.value : ""
  const [option, setOption] = useState(data.value);
  const { updateNodeData } = useReactFlow();
  useEffect(() => {
    var newValue;
    var data=parseFloat(incomingData)
      switch(option) {
        case 'abs':
          newValue = Math.abs(data)
          break;
        case 'round':
          newValue = Math.round(data)
          break;
        case 'ceil':
          newValue = Math.ceil(data)
          break;
        case 'floor':
          newValue = Math.floor(data)
          break;
        case 'sqrt':
          newValue = Math.sqrt(data)
          break;
        case 'sin':
          newValue = Math.sin(data)
          break;
        case 'cos':
          newValue = Math.cos(data)
          break;
        case 'tan':
          newValue = Math.tan(data)
          break;
        case 'asin':
          newValue = Math.asin(data)
          break;
        case 'acos':
          newValue = Math.acos(data)
          break;
        case 'atan':
          newValue = Math.atan(data)
          break;
        case 'log':
          newValue = Math.log(data)
          break;
        case 'exp':
          newValue = Math.exp(data)
          break;
        case 'e':
          newValue = 10**data
          break;
      }
      updateNodeData(id, { value: option });
  }, [incomingData, option, updateNodeData, id]);
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
    setOption(evt.target.value);
  }, []);
  return (
    <div>
    <div className="node p-2 bg-red-700 rounded-t-md text-white">
        <p>Number Function</p>
    </div>
    <div className="node p-2 bg-gray-800 text-white rounded-b-md">
      <select onChange={onChange} value={option} name="round-type" id="round-type" className="rounded p-1 bg-gray-600 w-full nodrag focus:outline-none">
        <option value='abs'>Abs</option>
        <option value="round">Round</option>
        <option value="floor">Floor</option>
        <option value="ceil">Ceil</option>
        <option value="sqrt">Sqrt</option>
        <option value="sin">Sin</option>
        <option value="cos">Cos</option>
        <option value="tan">Tan</option>
        <option value="asin">Asin</option>
        <option value="acos">Acos</option>
        <option value="atan">Atan</option>
        <option value="log">Log</option>
        <option value="exp">e ^</option>
        <option value="e">10 ^</option>
        
      </select>
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

export default RoundNumber;