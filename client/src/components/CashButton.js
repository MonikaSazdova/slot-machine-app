import React, { useRef } from "react";
import "../styles/CashButton.css";
import { SLOT, CLASS_NAMES } from "../texts/strings";
import { getPureRandom } from "../helpers";

const CashButton = ({ onClick }) => {
  const ref = useRef();

  const moveBtnRand = (elm) => {
    elm.style.position = "absolute";
    elm.style.background = '#E03519'
    const rand = Math.floor(Math.random() * 50 + 5) + "%";
    elm.style.top = rand;
    elm.style.left = rand;
    elm.style.right = rand;
    elm.style.bottom = rand;
  };

  const clickBtn = (elm) => {
    elm.style.background = '#2EE019'
  }

  const disableBtn = (elm) => {
    elm.disabled = true;
    elm.style.background = '#E03519'
  }

  const onHover = () => {
    const d = getPureRandom();
    if (d < 0.5) {
      moveBtnRand(ref.current);
    } else if (d < 0.9) {
      disableBtn(ref.current)
    } else {clickBtn(ref.current)}
  };

  return (
    <button
      ref={ref}
      className={CLASS_NAMES.cashBtn}
      onMouseOver={() => onHover()}
      onMouseLeave={() => (ref.current.disabled = false)}
      onClick={onClick}
    >
      {SLOT.cashOutButton}
    </button>
  );
};

export default CashButton;
