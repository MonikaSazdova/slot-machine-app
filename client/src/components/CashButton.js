import React, { useRef } from "react";
import "../styles/CashButton.css";
import { SLOT, CLASS_NAMES } from "../texts/strings";
import { pureRandom } from "../helpers";

const CashButton = ({ onClick }) => {
  const ref = useRef();

  const moveBtnRand = (elm) => {
    elm.style.position = "absolute";
    const rand = Math.floor(Math.random() * 50 + 5) + "%";
    elm.style.top = rand;
    elm.style.left = rand;
    elm.style.right = rand;
    elm.style.bottom = rand;
  };

  const onHover = () => {
    const d = pureRandom();
    if (d < 0.5) {
      moveBtnRand(ref.current);
    } else if (d < 0.9) {
      ref.current.disabled = true;
    } else console.log("Btn can be clicked");
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
