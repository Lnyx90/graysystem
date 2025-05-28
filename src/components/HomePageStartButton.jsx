import React from 'react';
import '../styles/HomePage.css';

function StartButton({ onClick }) {
	return (
		<button
			onClick={onClick}
			className='px-6 py-3 font-semibold font- text-white bg-green-500 rounded-lg shadow-md hover:bg-green-601 transition button-float'
		>
			Start Game
		</button>
	);
}

export default StartButton;
