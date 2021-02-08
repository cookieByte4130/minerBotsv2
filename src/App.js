import React, { Component } from "react";
import "./App.css";
import Map from "./components/board/map";
import Stats from "./components/stats/stats";

class App extends Component {
  state = {
    board: {
      gameMap: Array(8)
        .fill(0)
        .map((x) => Array(8).fill("land")),
    },
    player: {
      currency: 0,
      sensors: 1,
      digTools: 1,
      carry: {
        level: 1,
        currLoad: 0,
        maxLoad: 100,
      },
      currLoc: {
        x: 0,
        y: 0,
      },
    },
  };

  render() {
    return (
      <div className="App">
        <h1>Miner Bot</h1>
        {/* <Map gameMap={this.state.board.gameMap} /> */}
        <Stats player={this.state.player} />
      </div>
    );
  }
}

export default App;
