import React, { useState } from "react";

function ColorPicker() {
  const [color, setColor] = useState("#000000");

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h2>Exercise 3: Color Picker</h2>
      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />
      <p style={{ marginTop: "15px" }}>Selected Color: {color}</p>
      <div
        style={{
          width: "100px",
          height: "100px",
          backgroundColor: color,
          border: "1px solid #ccc",
          margin: "10px auto",
        }}
      ></div>
    </div>
  );
}

export default ColorPicker;
