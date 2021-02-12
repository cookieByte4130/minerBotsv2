import React, { Component } from "react";
import "./map.css";
import Player from "./player/player";

class Board extends Component {
  generateDOM = () => {
    return this.props.mapInfo.map((rows, i) => {
      var row = rows.map((cell, j) => <div key={j} className={cell} />);
      return (
        <div key={i} className="row">
          {row}
        </div>
      );
    });
  };

  render() {
    return (
      <div className="map">
        <Player playerLoc={this.props.playerLoc} />
        {this.generateDOM()}
      </div>
    );
  }
}

export default Board;
