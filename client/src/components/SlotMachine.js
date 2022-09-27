import React, { useState, useEffect } from "react";
import RollButton from "./RollButton";
import SlotTable from "./SlotTable";
import CashButton from "./CashButton";
import { getRandomEl, getPureRandom } from "../helpers";
import { slotOptions } from "../constants/slotConstants";
import { SLOT, CLASS_NAMES } from "../texts/strings";
import "../styles/SlotMachine.css";

const SlotMachine = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [slotOne, setSlotOne] = useState("?");
  const [slotTwo, setSlotTwo] = useState("??");
  const [slotThree, setSlotThree] = useState("???");
  const [credits, setCredits] = useState(10);
  const [account, setAccount] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    if (isLoading) {
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    }
  }, [isLoading]);

  useEffect(() => {
    setCredits(credits);
  }, [credits]);

  const getSlots = () => [
    getRandomEl(slotOptions),
    getRandomEl(slotOptions),
    getRandomEl(slotOptions),
  ];

  const machineRoll = () => {
    const areValuesEqual = slotOne === slotTwo && slotTwo === slotThree;
    const result =
      areValuesEqual === false
        ? 0
        : slotOne === "C"
        ? 10
        : slotOne === "L"
        ? 20
        : slotOne === "O"
        ? 30
        : 40;
    return result;
  };

  const userRoll = () => {
    let rollReward = machineRoll();
    if (credits < 40) {
      return rollReward;
    }
    if (rollReward <= 0) {
      return rollReward;
    }
    let cheatingScore = getPureRandom();
    if (credits <= 60 && cheatingScore < 0.3) {
      return machineRoll();
    }
    if (credits > 60 && cheatingScore < 0.6) {
      return machineRoll();
    }
    console.log("ROLL REWARD:", rollReward);
    return rollReward;
  };

  const calculatePoints = (points) => {
    setCredits(points - 1 + userRoll());
  };

  const handleRollCLick = () => {
    calculatePoints(credits);
    isLoading && setSlotOne("X");
    isLoading && setSlotTwo("XX");
    isLoading && setSlotThree("XXX");
    const [slot1, slot2, slot3] = getSlots();
    setTimeout(() => setSlotOne(slot1), 1000);
    setTimeout(() => setSlotTwo(slot2), 2000);
    setTimeout(() => setSlotThree(slot3), 3000);
  };

  const handleCashOutClick = () => {
    setAccount(credits);
    //end session
  };

  return (
    <div className={CLASS_NAMES.container}>
      <SlotTable slotOne={slotOne} slotTwo={slotTwo} slotThree={slotThree} />
      <div className={CLASS_NAMES.slotButtons}>
        <RollButton onClick={handleRollCLick} />
        <CashButton onClick={handleCashOutClick} />
      </div>
      <div>{`${SLOT.score}: ${credits}`}</div>
      <div>{`${SLOT.account}: ${account}`}</div>
    </div>
  );
};

export default SlotMachine;
