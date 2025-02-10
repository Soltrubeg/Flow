import { useState, useCallback, useEffect } from "react";
import { Handle, Position, useReactFlow, useNodes, useNodeConnections, useNodesData } from "@xyflow/react";

function Modulo ({ id, data }) {

  const dividendConnection = useNodeConnections({
    handleType: 'target', 
    handleId: 'dividend'
   });
   const nodeData = (useNodesData(dividendConnection[0]?.source))
     const dividendData = nodeData?.data ? nodeData.data.value : 0
   const [dividend, setDividend] = useState(data.value);
  const divisorConnection = useNodeConnections({
     handleType: 'target', 
     handleId: 'divisors'
    });
  const nodeData2 = (useNodesData(divisorConnection[0]?.source))
  const divisorData = nodeData2?.data ? nodeData2.data.value : 0
  const [divisor, setDivisor] = useState(data.value);
  
  const { updateNodeData } = useReactFlow();
  useEffect(() => {
    if (divisorData != divisor || dividendData != dividend){
      setDivisor(divisorData);
      setDividend(dividendData);
      const newValue = dividendData%divisorData
      console.log(dividendData + " % " + divisorData)
      updateNodeData(id, { value: newValue });
    }
  }, [dividendData, dividend, divisorData, divisor, updateNodeData, id]);
  return (
    <div>
    <div className="node p-2 bg-red-700 rounded-t-md text-white">
        <p>Modulo (%)</p>
    </div>
    <div className="node p-2 bg-gray-800 text-white rounded-b-md">
      <div>
      <Handle
        type="target" 
        position={Position.Left} 
        style={{top:50}}
        id="dividend"
        isConnectable={dividendConnection.length < 1}
        />
        <label className="label">
          Dividend
        </label>
      </div>
      <div>
      <Handle
        type="target" 
        position={Position.Left} 
        style={{top:69}}
        id="divisors" 
        isConnectable={divisorConnection.length < 1}
        />
        <label className="label">
          Divisor
        </label>
      </div>
      <Handle
        type="source" 
        position={Position.Right} 
        id="number" 
        style={{top:59.5}}
        data-type="number" 
        />
    </div>
    </div>
  );
}

export default Modulo;