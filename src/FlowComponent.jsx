import React, { useState, useCallback, useRef } from "react";
import { 
  ReactFlow, 
  ReactFlowProvider,
  MiniMap, 
  Controls, 
  Background, 
  BackgroundVariant,
  useNodesState, 
  useEdgesState, 
  addEdge, 
  useReactFlow,
  reconnectEdge,
  getIncomers,
  getOutgoers,
  getConnectedEdges,
  Panel
} from "@xyflow/react";
import NumberConstant from "./components/NumberConstant.tsx";
import StringConstant from "./components/StringConstant.tsx";
import Output from "./components/Output.tsx";
import RepeatString from "./components/RepeatString.tsx";
import AddNumbers from "./components/AddNumbers.tsx";
import MultiplyNumbers from "./components/MultiplyNumbers.tsx";
import ReverseString from "./components/ReverseString.tsx";
import "@xyflow/react/dist/style.css";
import StringLength from "./components/StringLength.tsx";
import PI from "./components/PI.tsx";
import Eulers from "./components/Eulers.tsx";
import Comment from "./components/Comment.tsx";
import NumberFunction from "./components/NumberFunction.tsx";
import Date from "./components/Date.tsx";
import DivideNumbers from "./components/DivideNumbers.tsx";
import Modulo from "./components/Modulo.tsx";
import SubstractNumbers from "./components/SubstractNumbers.tsx";
import SetVariable from "./components/SetVariable.tsx";
import Variable from "./components/Variable.tsx";
import Exponentiation from "./components/Exponentiation.tsx";
import JoinTexts from "./components/JoinTexts.tsx";

const nodeTypes = {
  numberConstant: NumberConstant,
  stringConstant: StringConstant,

  addNumbers: AddNumbers,
  multiplyNumbers: MultiplyNumbers,
  substractNumbers: SubstractNumbers,
  divideNumbers: DivideNumbers,
  modulo: Modulo,
  exponentiation: Exponentiation,
  numberFunction: NumberFunction,

  repeatString: RepeatString,
  reverseString: ReverseString,
  stringLength: StringLength,
  joinTexts: JoinTexts,

  pi: PI,
  eulers: Eulers,
  date: Date,

  variable: Variable,
  setVariable: SetVariable,

  outputField: Output,
  comment: Comment,
};

const initialNodes = [];
const initialEdges = [];

const FlowComponent = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [contextMenu, setContextMenu] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <ReactFlowProvider>
      <FlowContent 
        nodes={nodes} setNodes={setNodes} 
        edges={edges} setEdges={setEdges} 
        onNodesChange={onNodesChange} 
        onEdgesChange={onEdgesChange} 
        contextMenu={contextMenu} setContextMenu={setContextMenu}
        searchQuery={searchQuery} setSearchQuery={setSearchQuery}
      />
    </ReactFlowProvider>
  );
};

const FlowContent = ({ 
  nodes, setNodes, edges, setEdges, 
  onNodesChange, onEdgesChange, 
  contextMenu, setContextMenu, 
  searchQuery, setSearchQuery
}) => {
  const edgeReconnectSuccessful = useRef(true);
  const reactFlowInstance = useReactFlow();
  const { setViewport } = useReactFlow();
  const [rfInstance, setRfInstance] = useState(null);

  async function onSave()  {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      console.log(JSON.stringify(flow))
      const blob = new Blob([JSON.stringify(flow)], { type: 'application/json' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'flow.json';
      link.click();
    }
  }

 const onLoad = (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
                const flow = JSON.parse(e.target.result);
                console.log(flow); // Assign this data to a state variable if needed
                if (flow) {
                  const { x = 0, y = 0, zoom = 1 } = flow.viewport;
                  setNodes(flow.nodes || []);
                  setEdges(flow.edges || []);
                  setViewport({ x, y, zoom });
                }

        };
        reader.readAsText(file);
    }
};

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ ...params, animated: true }, eds)),
    []
  );

  const onReconnectStart = useCallback(() => {
    edgeReconnectSuccessful.current = false;
  }, []);
 
  const onReconnect = useCallback((oldEdge, newConnection) => {
    edgeReconnectSuccessful.current = true;
    setEdges((els) => reconnectEdge(oldEdge, newConnection, els));
  }, []);
 
  const onReconnectEnd = useCallback((_, edge) => {
    if (!edgeReconnectSuccessful.current) {
      setEdges((eds) => eds.filter((e) => e.id !== edge.id));
    }
 
    edgeReconnectSuccessful.current = true;
  }, []);

  const onNodesDelete = useCallback(
    (deleted) => {
      setEdges(
        deleted.reduce((acc, node) => {
          const incomers = getIncomers(node, nodes, edges);
          const outgoers = getOutgoers(node, nodes, edges);
          const connectedEdges = getConnectedEdges([node], edges);
 
          const remainingEdges = acc.filter(
            (edge) => !connectedEdges.includes(edge),
          );
 
          const createdEdges = incomers.flatMap(({ id: source }) =>
            outgoers.map(({ id: target }) => ({
              id: `${source}->${target}`,
              source,
              target,
              animated:true
            })),
          );
 
          return [...remainingEdges, ...createdEdges];
        }, edges),
      );
    },
    [nodes, edges],
  );

  const handleContextMenu = (event) => {
    event.preventDefault();
    setContextMenu({ x: event.clientX, y: event.clientY });
  };

  const handleAddNode = (type) => {
    if (!contextMenu) return;
    
    const flowCoords = reactFlowInstance.screenToFlowPosition({
      x: contextMenu.x,
      y: contextMenu.y,
    });

    const newNode = {
      id: `${type}${nodes.length + 1}`,
      type,
      position: { x: flowCoords.x, y: flowCoords.y },
      data: { value: "" },
    };
    setNodes((nds) => [...nds, newNode]);
    setContextMenu(null);
  };

  const nodeCategories = {
    "Constants": {
      "Number":"numberConstant", 
      "Text":"stringConstant", 
    },
    "Math Constants": {
      "PI (π)":"pi",
      "Euler's Number (e)":"eulers",
      "Date":"date"
    },
    "Math Operations": {
      "Add (+)": "addNumbers", 
      "Substract (-)":"substractNumbers",
      "Multiply (×)":"multiplyNumbers",
      "Divide (÷)":"divideNumbers",
      "Modulo (%)":"modulo",
      "Exponentiation (^)":"exponentiation",
      "Number Function":"numberFunction",
    },
    "Text Operations": {
      "Join Texts":"joinTexts",
      "Repeat Text":"repeatString", 
      "Reverse Text":"reverseString",
      "Text Length":"stringLength",
    },
    "Variables": {
      "Variable":"variable",
      "Set Variable":"setVariable",
    },
    "Other": {
      "Output Field":"outputField",
      "Comment":"comment"
    },
  };

  const [snapToGrid, setSnapToGrid] = useState(false)
  const [colorMode, setColorMode] = useState("light")

  return (
    <div
      style={{ width: "100vw", height: "100vh" }}
      onContextMenu={handleContextMenu}
    >
      <ReactFlow 
        maxZoom={3}
        minZoom={0.7}
        nodeTypes={nodeTypes}
        nodes={nodes} 
        edges={edges} 
        onNodesChange={onNodesChange} 
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onReconnect={onReconnect}
        onReconnectStart={onReconnectStart}
        onReconnectEnd={onReconnectEnd}
        onNodesDelete={onNodesDelete}
        onInit={setRfInstance}
        snapToGrid={snapToGrid}
        colorMode={colorMode}
        fitView
      >
        <MiniMap nodeColor="#94A3B8" />
        <Controls />
        <Background
        id="1"
        gap={15}
        color="#b0b0b0"
        variant={BackgroundVariant.Dots}
        />
        <div id="hud">

        <div className="flex items-center justify-center h-screen">
        <p
        hidden={nodes.length>0}
        className="text-xl"
        >Right click to add a node</p>
        </div>
        <Panel position="top-right" className="p-5">
        <button className="cursor-pointer transition delay-0 duration-200 ease-in-out hover:bg-stone-300 rounded-md pt-2 pb-2 pl-5 pr-5" 
        onClick={onSave}>Save</button>
        
        <label className="cursor-pointer transition delay-0 duration-200 ease-in-out hover:bg-stone-300 rounded-md pt-2 pb-2 pl-5 pr-5" 
        >Load
        <input type="file" id='file' class="hidden" accept="application/json" onChange={onLoad}></input>
        </label>
        </Panel>

        <Panel position="top-left" className="p-5">
        <div className="pt-2 pb-2 pl-5 pr-5">
        <label>Snap to Grid:</label>
        <input className="ml-2" type="checkbox"
       onChange={useCallback((evt) => {
        setSnapToGrid(evt.target.checked)
      }, [])}
      ></input>
      <br></br>
      <label>Dark Mode:</label>
      <input className="ml-2" type="checkbox"
       onChange={useCallback((evt) => {
        if(evt.target.checked) setColorMode("dark");
        else setColorMode("light");
        
      }, [])}
      ></input>
      <br></br>
      <br></br>
      <hr></hr>
      <br></br>
          <label>Nodes: {nodes.length}</label>
          <br></br>
          <label>Connections: {edges.length}</label>
        </div>
        </Panel>

        </div>
        
        
      </ReactFlow>

      

      {contextMenu && (
  <div
    className="bg-stone-200 border-3 rounded-xl border-gray-300 text-stone-800"
    style={{
      position: "absolute",
      top: contextMenu.y,
      left: contextMenu.x,
      padding: "10px",
      boxShadow: "0px 0px 10px rgba(0,0,0,0.2)",
      zIndex: 1000,
    }}
  >
    <p
    className="text-center"
    >
      Create new Node
    </p>
    <hr class="h-px mt-2 mb-2 bg-stone-800 border-0"></hr>
    <input
      type="text"
      placeholder="Search..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="text-stone-800 bg-stone-300 rounded-md focus:outline-none"
      style={{ width: "100%", marginBottom: "5px", padding: "5px" }}
    />
    {Object.entries(nodeCategories).map(([category, types]) => (
      <details key={category} style={{ padding: "5px"}} open={searchQuery.length > 0}>
        <summary className="text-stone-700 font-bold">{category}</summary>
        {Object.entries(types)
          .filter(([typeName, typeValue]) =>
            typeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            typeValue.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map(([typeName, typeValue]) => (
            <div>
            <button
              key={typeValue}
              style={{ padding: "5px", cursor: "pointer" }}
              className="transition delay-0 duration-200 ease-in-out hover:bg-stone-300 rounded-md w-full text-left"
              onClick={() => handleAddNode(typeValue)}
            >
              {typeName}
            </button>
            </div>
          ))}
      </details>
    ))}
    <button className="border-2 border-transparent bg-stone-300 mt-3 p-2 rounded-md w-full cursor-pointer transition delay-0 duration-200 ease-in-out hover:border-stone-500"
    onClick={() => setContextMenu(null)}>Cancel</button>
  </div>
)}
    </div>
  );
};

export default FlowComponent;
