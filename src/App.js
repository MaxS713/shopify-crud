import React from "react";
import Dashboard from "./components/Dashboard";
import miniRobot from "./images/mini-robot.png";
import "./App.css";

function App() {
  return (
    <div className="wrapper">
      <div id="image-and-title">
        <img src={miniRobot} alt="a cute little robot" width="100px" />
        <h1>CRUD - The Shopify Robot Factory</h1>
      </div>
      <Dashboard />
    </div>
  );
}

export default App;
