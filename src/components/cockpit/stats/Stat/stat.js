import React, { Component } from "react";

class Stat extends Component {
  render() {
    return (
      <div>
        Carry
        <div>
          Level: <span>{this.props.statInfo.level}</span>
        </div>
        <div>
          Current Load: <span>{this.props.statInfo.currLoad}</span>kg
        </div>
        <div>
          Maximum Load: <span>{this.props.statInfo.maxLoad}</span>kg
        </div>
      </div>
    );
  }
}

export default Stat;
