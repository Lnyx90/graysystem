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
		performActions,
		activityInProgress,
		currentActivity,
		fastForward,
		difficulty,
		completedActions,
		setLockedMessage,
		setShowLockedPopup,
	} = props;

	const getUnlockedMaps = (difficulty, completedActions) => {
		const unlockedMaps = [];
		if (difficulty === 'easy') {
			unlockedMaps.push('default');
			unlockedMaps.push('lake');
			unlockedMaps.push('temple');
			unlockedMaps.push('beach');

			if (completedActions.includes('Observing Borobudur')) {
				unlockedMaps.push('mountain');
			}
		} else if (difficulty === 'medium') {
			unlockedMaps.push('default');
			unlockedMaps.push('lake');
			unlockedMaps.push('beach');
			if (completedActions.includes('Become Cashier')) {
				unlockedMaps.push('temple');
			}
			if (completedActions.includes('Observing Borobudur')) {
				unlockedMaps.push('mountain');
			}
		} else if (difficulty === 'hard') {
			unlockedMaps.push('default');
			unlockedMaps.push('lake');
			if (completedActions.includes('Become a Tour Guide')) {
				unlockedMaps.push('beach');
			}
			if (completedActions.includes('Become Cashier')) {
				unlockedMaps.push('temple');
			}
			if (completedActions.includes('Observing Borobudur')) {
				unlockedMaps.push('mountain');
			}
		}
		return unlockedMaps;
	};


	const unlockedMaps = getUnlockedMaps(difficulty, completedActions);

	function handleBackToMainMap() {
		setCurrentMap('default');
		setPlayerPosition({ x: 2500, y: 1500 });
		setActions([]);
		setLocationText("You're Lost!");
	}

	const mapLocations = [
		{
			id: 'lake',
			label: 'Lake Toba',
			image: '/images/symbol/lake.jpg',
			position: { x: 760, y: 330 },
			text: 'Welcome to Lake Toba',
		},
		{
			id: 'mountain',
			label: 'Bromo Mountain',
			image: '/images/symbol/mountain.jpg',
			position: { x: 3390, y: 2450 },
			text: 'Welcome to the Mountain',
			requirement: {
				task: 'Observing Borobudur',
			},
		},
		{
			id: 'beach',
			label: 'Kuta Beach',
			image: '/images/symbol/beach.jpg',
			position: { x: 1040, y: 720 },
			text: 'Welcome to Kuta Beach',
			requirement: {
				task: 'Become a Tour Guide',
			},
		},
		{
			id: 'temple',
			label: 'Borobudur Temple',
			image: '/images/symbol/temple.jpg',
			position: { x: 2240, y: 1620 },
			text: 'Welcome to the Borobudur Temple',
			requirement: {
				task: 'Become Cashier',
			},
		},
	];

	function handleMapClick(map) {
		const isUnlocked = unlockedMaps.includes(map.id);
		if (!isUnlocked) {
			setLockedMessage({
				map: map.label,
				image: map.image,
				requiredTask: map.requirement
					? `Complete ${map.requirement.task} to unlock`
					: 'This map is locked.',
			});
			setShowLockedPopup(true);
			return;
		}
			setCurrentMap(map.id);
			setPlayerPosition(map.position);
			setActions([]);
			setLocationText(map.text);
	}

	return (
		<div className="md:row-span-4 p-1 text-center rounded-lg bg-white">
			<div className="grid grid-cols-2 gap-3 md:space-y-0 md:flex md:flex-col flex-wrap md:gap-y-2">
				<div className="flex flex-col gap-1 md:gap-2 lg:gap-3">
					<div className="text-[5px] md:text-xs lg:text-sm">
						{currentMap === 'default' ? "You're Lost!" : locationText}
					</div>

					<div className="flex items-center justify-center">
						<img src="/images/symbol/time.png" className="w-3 md:w-8" alt="Time Icon" />
						<span className="text-[6px] md:text-[10px] lg:text-[15px]">{formattedTime}</span>
					</div>

					{currentMap !== 'default' && (
						<div className="w-full text-center flex flex-col items-center gap-1">
							<span className="text-[5px] md:text-xs lg:text-sm">{greeting}</span>

							<button
								onClick={handleBackToMainMap}
								className="text-[6px] md:text-xs lg:text-sm px-2 py-1 w-2/3 bg-red-500 hover:bg-red-700 text-white rounded-md"
							>
								Back
							</button>

							{activityInProgress && (
								<>
									<div className="text-[5px] md:text-xs lg:text-sm animate-pulse">
										Doing: {currentActivity?.label}
									</div>
									<button
										onClick={fastForward}
										className="text-[5px] md:text-xs lg:text-sm px-2 py-1 w-2/3 bg-red-500 hover:bg-red-700 text-white rounded-md"
									>
										Fast Forward
									</button>
								</>
							)}
						</div>
					)}
				</div>

				{currentMap === 'home' && (
					<button
						onClick={() => {
							setCurrentMap('lake');
							setPlayerPosition({ x: 1050, y: 200 });
							setActions([]);
							setLocationText('Welcome to Lake Toba');
						}}
						className="w-full mt-2 bg-green-500 hover:bg-green-700 text-white rounded-lg py-2 text-xs sm:text-sm"
					>
						Back to Lake Map
					</button>
				)}

				<div className="flex flex-col gap-2">
					{currentMap === 'default' ? (
						<div className="flex flex-col items-center gap-2 ">
							{mapLocations.map((map) => {
								const isUnlocked = unlockedMaps.includes(map.id);
								return (
									<button
										key={map.id}
										onClick={() => handleMapClick(map)}
										className={`flex flex-col items-center transition ${
											isUnlocked ? 'hover:scale-105' : 'opacity-30 grayscale cursor-pointer'
										}`}
									>
										<img src={map.image} alt={`${map.label} Icon`} className="w-8 md:w-25 lg:w-30 rounded-lg" />
										<span className="text-[6px] md:text-xs">{map.label}</span>
									</button>
								);
							})}
						</div>
					) : (
						actionData.map((action) => (
							<div key={action.id} className="mt-1 lg:mt-2 md:mt-3 flex justify-between items-center">
								<button
									onClick={() => !action.locked && performActions(action)}
									className={`h-fit w-9/10 p-1 mx-auto text-white text-[5px] md:text-xs lg:text-sm rounded-lg ${
										action.locked
											? 'bg-blue-400 cursor-not-allowed'
											: action.earnings > 0
											? 'bg-orange-500 hover:bg-orange-500'
											: action.cost > 0
											? 'bg-yellow-500 hover:bg-yellow-500'
											: 'bg-blue-500 hover:bg-blue-700'
									}`}
								>
									{action.label}
								</button>
							</div>
						))
					)}
				</div>
			</div>
		</div>
	);
}

export default GameSideBar;
