import React, { Component } from "react";
import "./menu.css";

const menu = (props) => {
  return (
    <div className="menu">
      <p>Start mining sequence...</p>
      <button onClick={props.newGame}>New Game</button>
      {/* <button onClick={props.loadGame}>Load Game</button> */}
    </div>
  );
};

export default menu;
