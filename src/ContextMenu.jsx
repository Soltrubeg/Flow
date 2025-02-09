import React, { useState } from "react";

const ContextMenu = ({ x, y, onSelect, onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const nodeCategories = {
    Constants: ["numberConstant", "stringConstant"],
    Operations: ["addNumbers", "multiplyNumbers"],
    Other: ["repeatString", "outputField"],
  };

  return (
    <div
      style={{
        position: "absolute",
        top: y,
        left: x,
        background: "white",
        borderRadius: "5px",
        padding: "10px",
        boxShadow: "0px 0px 10px rgba(0,0,0,0.2)",
        zIndex: 1000,
      }}
      onBlur={onClose} // Close menu when losing focus
    >
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ width: "100%", marginBottom: "5px", padding: "5px" }}
        autoFocus
      />
      {Object.entries(nodeCategories).map(([category, types]) => (
        <details key={category}>
          <summary>{category}</summary>
          {types
            .filter((type) => type.toLowerCase().includes(searchQuery.toLowerCase()))
            .map((type) => (
              <div
                key={type}
                style={{ padding: "5px", cursor: "pointer" }}
                onClick={() => onSelect(type)}
              >
                {type}
              </div>
            ))}
        </details>
      ))}
    </div>
  );
};

export default ContextMenu;
