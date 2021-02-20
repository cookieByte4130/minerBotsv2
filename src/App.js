import React, { Component } from "react";
import "./App.css";
import Modal from "./components/UI/modal/modal";
import Upgrades from "./components/board/upgrades/upgrades.js";
import Map from "./components/board/map";
import Cockpit from "./components/cockpit/cockpit";
import Menu from "./components/menu/menu";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuShowing: true,
      level: 1,
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
          load: {},
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
        tempGrid.gameMap[i][j] = this.generateTile(this.setCellType(25, 20));
      }
    }
    //set up base
    const baseCoords = this.setBaseLoc(size);
    console.log("base site selected");
    tempGrid.gameMap[baseCoords[1]][baseCoords[0]] = this.generateTile("base");
    this.setState({ tempGrid });
    console.log("base constructed");
    console.log(tempGrid);

    //place player
    const currLoc = { ...this.state.player.currLoc };
    currLoc.x = baseCoords[0];
    currLoc.y = baseCoords[1];
    this.setState({ player: { ...this.state.player, currLoc } });
  }

  generateTile = (type) => {
    let tile = {
      terrain: type,
    };

    tile.canMoveTo =
      tile.terrain === "land" || tile.terrain === "base" ? true : false;

    if (tile.terrain === "land") {
      //will eventually add more resources
      tile.resource = "fe";
      tile.quantity = this.roll(20);
      tile.threshold = this.state.level;
    }
    return tile;
  };

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
    //add bot mobility
    window.addEventListener("keydown", this.move);
  }

  move = (e) => {
    if (!RegExp("Arrow*").test(e.key)) return;

    let currLoc = { ...this.state.player.currLoc };
    //Asimov's second law
    if (e.key === "ArrowUp" && currLoc.y > 0) {
      currLoc.y -= 1;
    }
    if (e.key === "ArrowDown" && currLoc.y < this.state.board.mapSize - 1) {
      currLoc.y += 1;
    }
    if (e.key === "ArrowLeft" && currLoc.x > 0) {
      currLoc.x -= 1;
    }
    if (e.key === "ArrowRight" && currLoc.x < this.state.board.mapSize - 1) {
      currLoc.x += 1;
    }

    //Asimov's Third Law
    const validMove = this.state.board.gameMap[currLoc.y][currLoc.x].canMoveTo;
    if (validMove) {
      this.setState({ player: { ...this.state.player, currLoc } });
    }

    //All your base are belong to us
    if (this.state.board.gameMap[currLoc.y][currLoc.x].terrain === "base") {
      this.returnToBase();
    }
  };

  // upgrade: function (equipment, lvl) {
  //   let n;
  //   switch (equipment) {
  //     case "sensor":
  //       n = 30;
  //       break;
  //     case "digTools":
  //     case "carry":
  //       n = 5;
  //       break;
  //   }
  //   const cost = n * lvl ** 2;
  //   console.log(cost);
  //   //deduct cost from currency
  //   //update sensor level in bot obj
  //   //update display
  //   // Carry Capacity cost 3x(Lvl^2) in ©, so L2 costs 12©, L3 costs 27©, etc. Each Carry level increases carry capacity by 100kg.
  // },

  dig = (e) => {
    console.log("digging");
    const player = { ...this.state.player };
    const board = { ...this.state.board };
    const currTile = board.gameMap[player.currLoc.y][player.currLoc.x];
    if (currTile.terrain === "base") {
      alert(`Security Bot: "You can't dig on base!"`);
      return;
    }
    if (player.digTools >= currTile.threshold) {
      console.log("successful dig");
      const resource = currTile.resource;
      const qty = currTile.quantity;
      console.log(player, currTile, qty);
      if (player.carry.maxLoad === player.carry.currLoad) {
        alert("You are already full. Return to base to unload");
        return;
      } else {
        const unminedQty =
          player.carry.currLoad + qty > player.carry.maxLoad
            ? player.carry.currLoad + qty - player.carry.maxLoad
            : 0;
        const minedQty = qty - unminedQty;

        //Later we will have more resources so load will have to init type of resource being stored.
        if (!player.carry.load[resource]) player.carry.load[resource] = 0;
        player.carry.load[resource] += minedQty;
        player.carry.currLoad += minedQty;

        //update player state
        this.setState({ player: { ...this.state.player } });
        alert(
          `You mined ${minedQty} ${
            resource[0].toUpperCase() + resource.slice(1)
          }`
        );

        //update board
        currTile.quantity = unminedQty;
        this.setState({ board: { ...this.state.board } });
      }
    } else {
      console.log("You are not equipped for this dig");
    }
    //TODO: notify user w/o alerts
  };

  returnToBase = () => {
    console.log("returned to base");
    this.unload();
  };

  unload = () => {
    console.log("unloading");
    const player = { ...this.state.player };
    //calc currency earned
    const materialValues = {
      fe: 10,
    };

    let loadValue = 0;
    for (const [material, amt] of Object.entries(player.carry.load)) {
      loadValue += amt / materialValues[material];
    }
    player.currency += loadValue;

    player.carry.currLoad = 0;
    player.carry.load = {};
    //clear currLoad and load values
    this.setState({ player });
    //notify user
    alert(`Mr. Orewell: "Great job! You earned ${loadValue}(c)"`);
  };

  newGameHandler = () => {
    console.log("New Game");
    this.setState({ menuShowing: false });
  };

  loadGameHandler() {
    console.log("Load Game");
  }

  componentDidMount() {
    if (this.state.board.gameMap.length === 0) {
      this.initNewGame();
    }
  }

  render() {
    return (
      <div className="App">
        {/* <Modal /> */}
        <h1>Miner Bot</h1>
        {this.state.menuShowing ? (
          <Menu newGame={this.newGameHandler} loadGame={this.loadGameHandler} />
        ) : (
          <div className="container">
            <Map
              mapInfo={this.state.board.gameMap}
              playerLoc={this.state.player.currLoc}
            />
            <Cockpit player={this.state.player} digHandler={this.dig} />
          </div>
        )}
      </div>
    );
  }
}

export default App;
