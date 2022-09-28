const express = require("express");
const session = require("express-session");
const { v4: uuid } = require("uuid");
const app = express();
const PORT = 8000;
const { getSlots, machineRoll, userRoll, calculatePoints } = require("./helpers/helper");

const slotOptions = ["C", "L", "O", "W"];
const users = {}
let credits = 10;
let slots = {
    slotOne: "X",
    slotTwo: "XX",
    slotThree: "XXX",
}

app.use(
  session({
    name: "RollSession",
    genid: function (req) {
      return uuid();
    },
    secret: "SlotSecret!",
    resave: false,
    credits: 10,
    saveUninitialized: false,
    cookie: { secure: false, expires: 6000000 },
  })
);

//create a new session
app.get("/", (req, res) => {
const id = uuid()
users[id] = {credits, slots}
  res.header("Access-Control-Allow-Origin", "*");
  res.json({credits, slots, id});
  res.end();
});


//roll a session
app.get("/roll/:id", function (req, res) {
    const user = users[req.params.id]
    res.header("Access-Control-Allow-Origin", "*");
  if (user.credits || user.credits === 0) {
    let [slot1, slot2, slot3] = getSlots(slotOptions);
    user.slots = { slot1, slot2, slot3 };
    let machineRollResult = machineRoll(slot1, slot2, slot3);
    let rollReward = userRoll(user.credits, machineRollResult);
   user.credits = calculatePoints(user.credits, rollReward);
    res.json({credits: user.credits, slots: user.slots});
    res.end();
  } else {
    res.end("Refresh");
  }
});

//delete a session
app.get("/cash-out/:id", function (req, res) {
  const user = users[req.params.id]
  res.header("Access-Control-Allow-Origin", "*");
  res.json({credits: user.credits});
  req.session.destroy();
  res.end()
})

app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}/`);
});

module.exports = app;
