import React, { Component } from "react";
import Upgrade from "../upgrades/upgrade/upgrade.js";

class Upgrades extends Component {
  render() {
    return (
      <div>
        Upgrades Selection goes here
        <ul>
          <li>{Upgrade}</li>
          <li>{Upgrade}</li>
          <li>{Upgrade}</li>
        </ul>
      </div>
    );
  }
}

export default Upgrades;
