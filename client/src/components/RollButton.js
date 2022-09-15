import React, {useState} from 'react';
import "../styles/RollButton.css"

const RollButton = () => {
const [slotOne, setSlotOne] = useState('C');
const [slotTwo, setSlotTwo] = useState('O');
const [slotThree, setSlotThree] = useState('W');

const	handleBtnCLick = () => {
	setSlotOne('A')
	setSlotTwo('B')
	setSlotThree('C')
	console.log('Button was pressed', slotOne, slotTwo, slotThree)
}


	return (
		<button
			className='rollBtn'
			onClick={handleBtnCLick}
		>
			Roll
		</button>
	)
}

export default RollButton;