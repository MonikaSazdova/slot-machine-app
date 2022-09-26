import React from "react";
import { SLOT, CLASS_NAMES } from "../texts/strings";
import "../styles/RollButton.css";

const RollButton = ({ onClick }) => {
  return (
    <button className={CLASS_NAMES.cashBtn} onClick={onClick}>
      {SLOT.rollButton}
    </button>
  );
};

export default RollButton;
