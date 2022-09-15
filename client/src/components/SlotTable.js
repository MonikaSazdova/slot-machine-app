import React, { useState, useEffect } from 'react';
import "../styles/SlotTable.css"

const SlotTable = () => {
	const [isLoading, setIsLoading] = useState(false)
	const [slotOne, setSlotOne] = useState('?');
	const [slotTwo, setSlotTwo] = useState('??');
	const [slotThree, setSlotThree] = useState('???');
	const [hover, setHover] = useState(false);
	const [isDisabled, setIsDisabled] = useState(false);
	const [isMoved, setIsMoved] = useState(false)
	const [credits, setCredits] = useState(10);
	const slotOptions = ['C', 'L', 'O', 'W'];

	useEffect(() => {
		setIsLoading(true)
		if (isLoading) {
			setTimeout(() => {
				setIsLoading(false);
			}, 3000);
		}
	}, [isLoading]);

	useEffect(() => {}, [credits]);

	const getRandom = list => list[Math.floor(Math.random() * list.length)];
	const getSlots = () => [getRandom(slotOptions), getRandom(slotOptions), getRandom(slotOptions)]

	const machineRoll = () => {
		const areValuesEqual = slotOne === slotTwo && slotTwo === slotThree
		return areValuesEqual === false ? 0 : (slotOne === 'C' ? 10 : slotOne === 'L' ? 20 : slotOne === 'O' ? 30 : 40)
	}

	const cheatingRoll = () => Math.random()

	const userRoll = () => {
		let rollReward = machineRoll();
		if (credits < 40) {
			return rollReward;
		}
		if (rollReward <= 0) {
			return rollReward;
		}
		let cheatingScore = cheatingRoll();
		if (credits <= 60 && cheatingScore < 0.3) {
			return machineRoll();
		}
		if (credits > 60 && cheatingScore < 0.6) {
			return machineRoll();
		}
		return rollReward;
	}

	const playSession = points => {setCredits(points - 1 + userRoll())}

	const handleBtnCLick = () => {
		isLoading && setSlotOne('X')
		isLoading && setSlotTwo('XX')
		isLoading && setSlotThree('XXX')
		const [slot1, slot2, slot3] = getSlots()
		setTimeout(() => setSlotOne(slot1), 1000)
		setTimeout(() => setSlotTwo(slot2), 2000)
		setTimeout(() => setSlotThree(slot3), 3000)
		playSession(credits)
	}

	const randomCalc = () => {
		setHover(true)
		const rand = Math.floor(Math.random() * 100);
		if (rand < 50) {
			setIsDisabled(true)
			setIsMoved(false)
		}
		else if (rand < 90) {
			setIsMoved(true)
			setIsDisabled(false)
		}
		else if (rand < 100) {
			setIsDisabled(false)
			setIsMoved(false)
		}
	}

	const cleanUp = () => {
		setIsDisabled(false)
		setIsMoved(false)
		setHover(false)
	}

	return (
		<div className='container'>
			<table className="slotTable">
				<tbody>
					<tr>
						<td>{slotOne}</td>
						<td>{slotTwo}</td>
						<td>{slotThree}</td>
					</tr>
				</tbody>
			</table>
			<div className='btns'>
				{/*I would use useRef() to manipulate the DOM, in this case the Cash Out btn*/}
				{/*I used btn rotation just to try out if the logic works, otherwise I would use Math.random() to calculate a random position for the btn to be able to "escape" */}
				<button
					type="button"
					disabled={isDisabled}
					style={{transform: isMoved ? 'rotate(90deg)' : 'rotate(0deg)'}}
					onMouseOver={() => randomCalc()}
					onMouseLeave={() => cleanUp()}
				>
					Cash Out
				</button>
				<button
					type="button"
					className='rollBtn'
					onClick={() => handleBtnCLick()}
				>
					Roll
				</button>
			</div>
			<div>Score: {credits}</div>
		</div>

	)
}

export default SlotTable;
