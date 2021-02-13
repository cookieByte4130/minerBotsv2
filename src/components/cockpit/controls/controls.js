import React, { Component } from "react";
import "../controls/controls.css";

class Controls extends Component {
  render() {
    return (
      <div className="controls">
        <button
          className="btn"
          onClick={() => {
            this.props.digHandler();
          }}
        >
          Dig
        </button>
      </div>
    );
  }
}

export default Controls;
