import { useState, useCallback, useEffect } from "react";
import { Handle, Position, useReactFlow, useNodes, useNodeConnections, useNodesData } from "@xyflow/react";

function Exponentiation ({ id, data }) {

  const baseConnection = useNodeConnections({
    handleType: 'target', 
    handleId: 'base'
   });
   const nodeData = (useNodesData(baseConnection[0]?.source))
     const baseData = nodeData?.data ? nodeData.data.value : 0
   const [base, setBase] = useState(data.value);
  const exponentConnection = useNodeConnections({
     handleType: 'target', 
     handleId: 'exponent'
    });
    const nodeData2 = (useNodesData(exponentConnection[0]?.source))
    const exponentData = nodeData2?.data ? nodeData2.data.value : 0
  const [exponent, setExponent] = useState(data.value);

  const { updateNodeData } = useReactFlow();

  useEffect(() => {
    if (baseData != base || exponentData != exponent){
      setBase(baseData);
      setExponent(exponentData);
      const newValue = Math.pow(baseData,exponentData)
      updateNodeData(id, { value: newValue });
    }
  }, [baseData, base, exponentData, exponent, updateNodeData, id]);
  return (
    <div>
    <div className="node p-2 bg-red-700 rounded-t-md text-white">
        <p>Exponentiation (^)</p>
    </div>
    <div className="node p-2 bg-gray-800 text-white rounded-b-md">
      <div>
      <Handle
        type="target" 
        position={Position.Left} 
        style={{top:50}}
        id="base"
        isConnectable={baseConnection.length < 1}
        />
        <label className="label">
          Base
        </label>
      </div>
      <div>
      <Handle
        type="target" 
        position={Position.Left} 
        style={{top:69}}
        id="exponent"
        isConnectable={exponentConnection.length < 1}
        />
        <label className="label">
          Exponent
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

export default Exponentiation;