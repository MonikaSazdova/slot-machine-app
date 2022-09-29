const express = require("express");
const session = require("express-session");
const { v4: uuid } = require("uuid");
const app = express();
const PORT = 8000;
const { getSlots, machineRoll, userRoll, calculatePoints } = require("./helper");

const slotOptions = ["C", "L", "O", "W"];
const users = {}
let credits = 10;
let slots = {};
//I had issue with CORS and I was not able to use express-session (I instead created a mock db by defining users, credits and slots)
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
users[id] = {credits, slots, id}
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
    let machineRollResult = machineRoll(slot1, slot2, slot3);
    let rollReward = userRoll(user.credits, machineRollResult);
    user.credits = calculatePoints(user.credits, rollReward);
    user.slots = { slot1, slot2, slot3 };
    res.json({credits: user.credits, slots: user.slots, id: user});
    res.end();
  } else {
    res.end("Refresh");
  }
});

//delete a session
app.get("/cash-out/:id", function (req, res) {
  const user = users[req.params.id]
  res.header("Access-Control-Allow-Origin", "*");
  res.json({credits: user.credits, slots: {slot1: 'END', slot2: 'END', slot3: 'END'}, id: null});
  res.end()
})

app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}/`);
});

module.exports = app;
