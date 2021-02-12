import React, { Component } from "react";
import "./App.css";
import Map from "./components/board/map";
import Cockpit from "./components/cockpit/cockpit";

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

  createGrid(size) {
    console.log("creating grid");
    let tempGrid = { ...this.state.board };
    for (let i = 0; i < size; i++) {
      tempGrid.gameMap.push([]);
      for (let j = 0; j < size; j++) {
        tempGrid.gameMap[i][j] = this.setCellType(25, 20);
      }
    }
    //set up base
    const baseCoords = this.setBaseLoc(size);
    console.log("base site selected");
    tempGrid.gameMap[baseCoords[1]][baseCoords[0]] = "base";
    this.setState({ tempGrid });
    console.log("base constructed");

    //place player
    const currLoc = { ...this.state.player.currLoc };
    currLoc.x = baseCoords[0];
    currLoc.y = baseCoords[1];
    console.log(currLoc);
    this.setState({ currLoc });
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
    console.log("setting up base");
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

  initNewGame() {
    console.log("init game");
    //create gameMap
    this.createGrid(this.state.board.mapSize);
    //add event listener
    //window.addEventListener("keydown", this.move);
  }

  move = (e) => {
    console.log(this.state);
    let currLoc = { ...this.state.player.currLoc };
    console.log(e.key, currLoc);
    if (e.key === "ArrowUp") {
      console.log("move up");
      if (currLoc.y > 0) currLoc.y -= 1;
      else alert("cant leave the map");
      this.setState({ currLoc });
    }
  };

  componentDidMount() {
    if (this.state.board.gameMap.length === 0) {
      this.initNewGame();
    }
  }

  render() {
    return (
      <div className="App">
        <h1>Miner Bot</h1>
        <div className="container">
          <Map
            mapInfo={this.state.board.gameMap}
            playerLoc={this.state.player.currLoc}
          />
          <Cockpit player={this.state.player} />
        </div>
      </div>
    );
  }
}

export default App;
