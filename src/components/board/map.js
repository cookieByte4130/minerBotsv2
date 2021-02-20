import React, { Component } from "react";
import "./map.css";
import Player from "./player/player";

class Board extends Component {
  generateDOM = () => {
    return this.props.mapInfo.map((rows, i) => {
      let row = rows.map((cell, j) => {
        return <div key={j} className={cell.terrain} />;
      });
      return (
        <div key={i} className="row">
          {row}
        </div>
      );
    });
  };

  render() {
    return (
      <div>
        <button>Menu</button>
        <div className="map">
          <Player playerLoc={this.props.playerLoc} />
          {this.generateDOM()}
        </div>
      </div>
    );
  }
}

export default Board;
