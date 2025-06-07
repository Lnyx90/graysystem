import React, { useState } from 'react';
import GameBackpack from './GameBackpack';
import IdentityCard from './GameIdentityCard';

function GameTitleBar({ formattedDate, unlockedItems, unlockItem, achievements }) {
	const [showCard, setShowCard] = useState(false);
	const [characterImage, setCharacterImage] = useState('');

	return (
		<>
			<div
				id='titleBar'
				className='w-9/10 h-2/18 mx-auto p-3 text-white text-center rounded-lg flex flex-col md:flex-row md:flex-col justify-between items-center'
			>
				<span className='text-[9px] md:text-sm lg:text-base'>
					Archipelago Adventure
				</span>

				<div className='flex md:mx-10 gap-2'>
					<button
						onClick={() => setShowCard(true)}
						className='text-[9px] md:text-sm lg:text-base'
					>
						Level <span>1</span>
					</button>

					<GameBackpack unlockedItems={unlockedItems} />
				</div>

				<div className='flex items-center'>
					<img
						src='/images/symbol/calendar.png'
						className='w-5 md:w-10 lg:w-20'
					/>
					<span className='text-[9px] md:text-sm lg:text-base'>
						{formattedDate}
					</span>
				</div>
			</div>

			{showCard && (
				<IdentityCard
					userName={localStorage.getItem('playerName')}
					onClose={() => setShowCard(false)}
					characterImage={characterImage}
					achievements={achievements}
				/>
			)}
		</>
	);
}

export default GameTitleBar;
