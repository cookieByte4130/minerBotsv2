import React, { Component } from "react";
import Stats from "../cockpit/stats/stats";
import Controls from "../cockpit/controls/controls";
import "../cockpit/cockpit.css";

class Cockpit extends Component {
  render() {
    return (
      <div className="cockpit">
        <Stats player={this.props.player} />
        <Controls digHandler={this.props.digHandler} />
      </div>
    );
  }
}

export default Cockpit;
