import React, { Component } from "react";
import "./map.css";

class Board extends Component {
  render() {
    console.log(this.props.gameMap);

    return (
      <div className="map">
        {this.props.gameMap.map((row, index) => {
          <div key={index} row={index} className="row">
            {row.map((cell, i) => {
              <div key={i} cell={i} className="cell">
                {cell}
              </div>;
            })}
          </div>;
        })}
      </div>
    );
  }
}

export default Board;
