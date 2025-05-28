import React from 'react';

function GameSideBar(props) {
	const {
		currentMap,
		locationText,
		formattedTime,
		greeting,
		actionData,
		setCurrentMap,
		setPlayerPosition,
		setActions,
		setLocationText,
	} = props;

	function handleBackToMainMap() {
		setCurrentMap('default');
		setPlayerPosition({ x: 2500, y: 1500 });
		setActions([]);
		setLocationText("You're Lost!");
	}

	return (
		<div className='md:row-span-4 p-1 text-center rounded-lg bg-white'>
			<div className='flex flex-col flex-wrap gap-y-2'>
				<div className='text-[10px] md:text-sm lg:text-base'>
					{currentMap === 'default' ? "You're Lost!" : locationText}
				</div>

				<div className='gap-1 flex items-center justify-center'>
					<img
						src='/images/symbol/time.png'
						className='w-6 md:w-8'
						alt='Time Icon'
					/>
					<span className='text-[10px]'>{formattedTime}</span>
				</div>

				<span className='text-[10px] md:text-sm lg:text-base'>{greeting}</span>

				{actionData.length === 0 ? (
					<div className='text-gray-600 text-[10px] md:text-sm lg:text-base'>
						No actions available here
					</div>
				) : (
					actionData.map(function (action) {
						return (
							<button key={action.key} className='w-3/4 p-2 mx-auto text-white text-[10px] md:text-sm lg:text-base rounded-lg bg-blue-500 hover:bg-blue-700'>
								{action.label}
							</button>
						);
					})
				)}

				{currentMap !== 'default' && (
					<div>
						<button
							onClick={handleBackToMainMap}
							className='w-3/4 p-2 text-white text-[10px] md:text-sm lg:text-base rounded-lg bg-red-500 hover:bg-red-700'
						>
							Back to Main Map
						</button>
					</div>
				)}
			</div>
		</div>
	);
}

export default GameSideBar;
