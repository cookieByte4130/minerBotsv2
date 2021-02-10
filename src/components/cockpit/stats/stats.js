import React, { Component } from "react";
import Stat from "./Stat/stat";
import "./stats.css";

class Stats extends Component {
  render() {
    return (
      <div className="stats">
        <div>
          Currency: <span>{this.props.player.currency}</span>&copy;
        </div>
        <div>
          Dig Tools: <span>{this.props.player.digTools}</span>
        </div>
        <div>
          Sensors: <span>{this.props.player.sensors}</span>
        </div>
        <Stat statInfo={this.props.player.carry} />
      </div>
    );
  }
}

export default Stats;
