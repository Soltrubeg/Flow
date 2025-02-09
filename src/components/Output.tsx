import { useCallback } from "react";
import { Handle, Position, useNodesData, useNodeConnections } from "@xyflow/react";

function OutputField () {

  const connections = useNodeConnections({
    type: 'target',
  });

  const nodeData = (useNodesData(connections[0]?.source))
  const data = nodeData?.data ? nodeData.data.value : ""

  return (
    <div>
    <div className="node p-2 bg-stone-700 rounded-t-md text-white">
        <p>Output Field</p>
    </div>
    <div className="node p-2 bg-gray-800 text-white rounded-b-md">
      <p
        className="w-full text-white p-1 rounded bg-gray-600"
      >{data}</p>
      <Handle 
      type="target" 
      position={Position.Left} 
      id="output" 
      data-type="all" 
      isConnectable={connections.length < 1}
      />
    </div>
    </div>
  );
}

export default OutputField;