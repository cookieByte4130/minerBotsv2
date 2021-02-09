import React, { Component } from "react";
import "./map.css";

class Board extends Component {
  generateDOM = () => {
    return this.props.mapInfo.map((rows, i) => {
      var row = rows.map((cell, j) => (
        <td key={j} className={cell}>
          {cell}
        </td>
      ));
      return <tr key={i}>{row}</tr>;
    });
  };

  render() {
    return (
      <table className="map">
        <tbody>{this.generateDOM()}</tbody>
      </table>
    );
  }
}

export default Board;
