//get random number and return the floor
export const getRandomNumber = (max, min) => {
  return Math.floor(Math.random() * (max - min)) + min;
};


//Convert the fruit text into picture
export const convertFruitTextToPicture = (fruitText) => {
  let picture;
  switch (fruitText) {
    case "cherry":
      picture = "🍒";
      break;
    case "apple":
      picture = "🍎";
      break;
    case "banana":
      picture = "🍌";
      break;
    case "lemon":
      picture = "🍋";
      break;
    default:
      picture = "";
      break;
  }

  return picture;
};


export const slotMachineRewardPoints = (reels) => {
  const { reel1, reel2, reel3 } = reels;
  if (reel1 === "cherry" && reel2 === "cherry" && reel3 === "cherry") {
    return 10;
	}
	if (reel1 === "lemon" && reel2 === "lemon" && reel3 === "banana") {
    return 20;
  }
	if (reel1 === "apple" && reel2 === "apple" && reel3 === "apple") {
    return 30;
	}
	if (reel1 === "banana" && reel2 === "banana" && reel3 === "banana") {
    return 40;
	}
  return 0;
};