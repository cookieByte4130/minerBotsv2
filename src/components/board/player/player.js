import React, { Component } from "react";
import "../player/player.css";

class Player extends Component {
  render() {
    const playerLoc = this.props.playerLoc;
    const style = {
      top: playerLoc.y * 40,
      left: playerLoc.x * 40,
    };
    return <div className="player" style={style} />;
  }
}

export default Player;
