import React from "react";
import Card from "../Card/Card.jsx";
import "../Players/Player.css";
export const Player = (props) => {
  const changeName = () => {
    props.setPlayer(...props.name);
  };
  return (
    <div className="player">
      <button onChange={changeName}>{props.name}</button>
    </div>
  );
};
