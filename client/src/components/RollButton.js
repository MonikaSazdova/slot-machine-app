import React from "react";
import { SLOT, CLASS_NAMES } from "../texts/strings";
import "../styles/RollButton.css";

const RollButton = ({ onClick }) => {
  return (
    <button className={CLASS_NAMES.rollBtn} onClick={onClick}>
      {SLOT.rollButton}
    </button>
  );
};

export default RollButton;
