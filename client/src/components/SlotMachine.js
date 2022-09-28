import React, { useState, useEffect } from "react";
import RollButton from "./RollButton";
import SlotTable from "./SlotTable";
import CashButton from "./CashButton";
import { SLOT, CLASS_NAMES } from "../texts/strings";
import "../styles/SlotMachine.css";
const axios = require("axios");

const SlotMachine = () => {
  const [slotOne, setSlotOne] = useState("?");
  const [slotTwo, setSlotTwo] = useState("??");
  const [slotThree, setSlotThree] = useState("???");
  const [credits, setCredits] = useState(0);
  const [account, setAccount] = useState(0);
  const [isLoading, setIsLoading] = useState(false)
  const [userId, setUserId] = useState(null)

  useEffect(() => {
    setIsLoading(true);
    const apiUrl = 'http://localhost:8000/';
    axios.get(apiUrl).then((res) => {
      const data = res.data;
      const {id, credits} = data
      setUserId(id)
      setCredits(credits)
    });
  }, []);


  const handleRollCLick = () => {
    isLoading && setSlotOne("X");
    isLoading && setSlotTwo("XX");
    isLoading && setSlotThree("XXX");
    axios.get(`http://localhost:8000/roll/${userId}`).then((res) => {
      setCredits(credits - 1)
      setTimeout(() => setSlotOne(res.data.slots.slot1), 1000);
      setTimeout(() => setSlotTwo(res.data.slots.slot2), 2000);
      setTimeout(() => setSlotThree(res.data.slots.slot3), 3000);
      setTimeout(() => setCredits(res.data.credits), 3000);
    });

  };

  const handleCashOutClick = () => {
    setAccount(credits);
    setCredits(0)
    axios.get(`http://localhost:8000/cash-out/${userId}`).then((res) => {setAccount(res.data.credits)})
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
