import { Handle, Position, NodeResizeControl} from "@xyflow/react";

function Comment ({id}) {
  return (
    
    <div>
    <NodeResizeControl style={{backgroundColor: 'transparent'}} position="top-right" minWidth={100} maxWidth={1000} minHeight={76} maxHeight={76}>
        <ResizeIcon />
      </NodeResizeControl>
    <div className="node p-2 bg-stone-700 rounded-t-md text-white">
        <p>Comment</p>
    </div>
    <div className="node p-2 bg-gray-800 text-white rounded-b-md">
      <input
        id={`text-${id}`}
        name="text"
        type="text"
        className="w-full text-white p-1 rounded bg-gray-600 nodrag focus:outline-none"
      />
    </div>
    </div>
  );
}

function ResizeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="#ffffff"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ position: 'absolute', right: 10, top:10 }}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <polyline points="16 20 20 20 20 16" />
      <line x1="14" y1="14" x2="20" y2="20" />
      <polyline points="8 4 4 4 4 8" />
      <line x1="4" y1="4" x2="10" y2="10" />
    </svg>
  );
}

export default Comment;