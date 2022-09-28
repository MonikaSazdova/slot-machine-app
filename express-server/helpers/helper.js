
 const getSlots = (slotOptions) => {
  const getRandomEl = (list) => list[Math.floor(Math.random() * list.length)];
  return [
    getRandomEl(slotOptions),
    getRandomEl(slotOptions),
    getRandomEl(slotOptions),
  ];
};

 const machineRoll = (slotOne, slotTwo, slotThree) => {
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

 const userRoll = (credits, machineRoll) => {
  let rollReward = machineRoll;
  if (credits < 40) {
    return rollReward;
  }
  if (rollReward <= 0) {
    return rollReward;
  }
  let cheatingScore = Math.random();
  if (credits <= 60 && cheatingScore < 0.3) {
    return machineRoll;
  }
  if (credits > 60 && cheatingScore < 0.6) {
    return machineRoll;
  }
  console.log("ROLL REWARD:", rollReward);
  return rollReward;
};

 const calculatePoints = (credits, userRoll) => {
  return credits -1 + userRoll;
};

module.exports = {
    getSlots,
    machineRoll,
    userRoll,
    calculatePoints
}
