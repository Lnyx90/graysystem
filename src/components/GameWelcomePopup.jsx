import React from 'react';

function GameWelcomePopup({ player, showWelcomePopup, closePopUp }) {
	if (!showWelcomePopup) return null;

	return (
		<div className="mt-20 fixed flex inset-0 justify-center items-center text-center z-10">
			<div className="w-7/12 lg:w-2/7 md:w-3/9 sm:w-6/11 rounded-lg bg-white p-1">
				{showWelcomePopup && (
					<div className="text-[10px] md:text-sm lg:text-base">
						<h2 className="p-0.5 md:p-1 lg:p-2">Welcome, {player.name}!</h2>

						<p className="p-0.5 md:p-1 lg:p-2">You Have Chosen:</p>

						<img
							src={`images/characters/${player.base}_right.png`}
							alt="player"
							className="w-1/10 md:w-2/10 lg:w-3/10 mx-auto p-0.5 md:p-1 lg:p-2"
						/>

						<p className="p-2">Time For Epic Journey!</p>

						<button
							onClick={closePopUp}
							className="p-1 md:p-2 lg:p-3 text-white rounded-lg bg-blue-500 hover:bg-blue-700"
						>
							Play
						</button>
					</div>
				)}
			</div>
		</div>
	);
}

export default GameWelcomePopup;
