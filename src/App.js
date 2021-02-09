import React, { Component } from "react";
import "./App.css";
import Map from "./components/board/map";
import Stats from "./components/stats/stats";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: {
        mapSize: 8,
        gameMap: [],
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
  }

  createGrid(grid, size) {
    let tempGrid = [];
    for (let i = 0; i < size; i++) {
      tempGrid.push([]);
      for (let j = 0; j < size; j++) {
        tempGrid[i][j] = this.setCellType(25, 20);
      }
    }
    //set up base
    const baseCoords = this.setBaseLoc(grid.length);
    tempGrid[baseCoords[1]][baseCoords[0]] = "base";
    this.state.board.gameMap = tempGrid;
  }

  roll(dSides) {
    return Math.floor(Math.random() * dSides) + 1;
  }

  setCellType(waterChance, cliffChance) {
    if (this.roll(100) <= waterChance) {
      return "water";
    } else if (this.roll(100) <= cliffChance) {
      return "cliff";
    } else {
      return "land";
    }
  }

  setBaseLoc(size) {
    const x = Math.floor(Math.random() * size);
    let y;
    if (x === 0 || x === size - 1) {
      y = Math.floor(Math.random() * size);
    } else {
      y = Math.round(Math.random());
      if (y === 1) y = size - 1;
    }
    return [x, y];
  }

  render() {
    if (this.state.board.gameMap.length === 0) {
      this.createGrid(this.state.board.gameMap, this.state.board.mapSize);
    }
    return (
      <div className="App">
        <h1>Miner Bot</h1>
        <Map mapInfo={this.state.board.gameMap} />
        <Stats player={this.state.player} />
      </div>
    );
  }
}

export default App;
