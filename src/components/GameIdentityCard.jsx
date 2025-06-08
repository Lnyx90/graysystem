import React, { useState } from 'react';


function IdentityCard({ onClose, userName, achievements }) {
	const [flipped, setFlipped] = useState(false);
	const imageBase = localStorage.getItem('PlayerImageBase') || 'char1';
	const characterImage = `/images/characters/${imageBase}_right.png`;
	const [showLockedPopup, setShowLockedPopup] = useState(false);
	const [lockedMessage, setLockedMessage] = useState('');

	return (
		<div className="mt-20 fixed flex inset-0 justify-center items-center text-center z-15">
			<div
				onClick={() => setFlipped(!flipped)}
				style={{ perspective: '1000px' }}
				className="w-4/5 md:w-3/4 lg:w-4/7"
			>
				<div
				
					style={{
						transformStyle: 'preserve-3d',
						transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
					}}
					className="w-full h-full p-2 rounded-lg text-[10px] md:text-sm lg:text-base border-2 bg-white transition-transform duration-500"
				>
					<div className="flex flex-col fixed inset-0" style={{ backfaceVisibility: 'hidden' }}>
						{!flipped && (
							<div className="flex justify-end p-2">
								<button
									onClick={(e) => {
										e.stopPropagation();
										onClose();
									}}
								>
									×
								</button>
							</div>
						)}

						<div className="text-[10px] md:text-base lg:text-lg flex items-center justify-center">
							<h2>ID Card</h2>
						</div>

						<div className="w-full h-full grid grid-cols-2">
							<div className="flex items-center justify-center">
								<img
									src={characterImage}
									className="w-3/9 md:w-2/7 lg:w-4/12 xl:2/12 p-0.5 md:p-1 lg:p-2"
									alt="Player Character"
								/>
							</div>
							<div className="text-[8px] md:text-base lg:text-lg flex flex-col items-start justify-center">
								<p className="">Name : {userName}</p>
								<p className="">Level: 1</p>
							</div>
						</div>
					</div>

					<div
						className="w-full h-full "
						style={{
							backfaceVisibility: 'hidden',
							transform: 'rotateY(180deg)',
						}}
					>
						<div className="flex justify-end">
							<button
								onClick={(e) => {
									e.stopPropagation();
									onClose();
								}}
							>
								×
							</button>
						</div>

						<div className="text-[8px] md:text-sm lg:text-base flex items-center justify-center mb-4 ">
							<h2>ACHIEVEMENTS</h2>
						</div>

						<div className="w-full grid grid-cols-2 grid-rows-3 gap-y-4 px-2 md:px-0">
						<div className="w-12 md:w-24 flex flex-col items-center mx-auto">
							<img
								src="/images/achivements/GameAchievementCapture.png"
								className={!achievements.photography ? 'grayscale opacity-40 cursor-pointer' : ''}
								onClick={() => {
									if (!achievements.photography) {
										setLockedMessage('Take photos in different locations to unlock this achievement.');
										setShowLockedPopup(true);
									}
								}}
							/>
							<h3 className={`text-sm mt-1 ${!achievements.photography ? 'text-[8px] md:text-sm lg:text-base text-gray-400' : ''}`}>
								Photography
							</h3>
						</div>

						<div className="w-12 md:w-24 flex flex-col items-center mx-auto">
							<img
								src="/images/achivements/GameAchievementExplorer.png"
								className={!achievements.explorer ? 'grayscale opacity-40 cursor-pointer' : ''}
								onClick={() => {
									if (!achievements.explorer) {
										setLockedMessage('Visit all map areas to unlock this achievement.');
										setShowLockedPopup(true);
									}
								}}
							/>
							<h3 className={`text-sm mt-1 whitespace-nowrap ${!achievements.explorer ? 'text-[8px] md:text-sm lg:text-base text-gray-400' : ''}`}>
								Map Explorer
							</h3>
						</div>

						<div className="col-span-2 flex flex-col items-center mx-auto w-12 md:w-24">
							<img
								src="/images/achivements/GameAchievementCampSkills.png"
								className={!achievements.campSkills ? 'grayscale opacity-40 cursor-pointer' : ''}
								onClick={() => {
									if (!achievements.campSkills) {
										setLockedMessage('Complete camp tasks like cooking, hiking and enjoying the view at the Mountain to earn this achievement.');
										setShowLockedPopup(true);
									}
								}}
							/>
							<h3 className={`text-sm mt-1 whitespace-nowrap ${!achievements.campSkills ? 'text-[8px] md:text-sm lg:text-base text-gray-400' : ''}`}>
								Camp Skills
							</h3>
						</div>

						<div className="w-12 md:w-24 flex flex-col items-center mx-auto">
							<img
								src="/images/achivements/GameAchievementCrazyRich.png"
								className={!achievements.crazyRich ? 'grayscale opacity-40 cursor-pointer' : ''}
								onClick={() => {
									if (!achievements.crazyRich) {
										setLockedMessage('Earn a large amount of money to unlock this achievement.');
										setShowLockedPopup(true);
									}
								}}
							/>
							<h3 className={`text-sm mt-1 whitespace-nowrap ${!achievements.crazyRich ? 'text-[8px] md:text-sm lg:text-base text-gray-400' : ''}`}>
								Crazy Rich
							</h3>
						</div>

						<div className="w-12 md:w-24 flex flex-col items-center mx-auto">
							<img
								src="/images/achivements/GameAchievementCollector.png"
								className={!achievements.collector ? 'grayscale opacity-40 cursor-pointer' : ''}
								onClick={() => {
									if (!achievements.collector) {
										setLockedMessage('Collect all items in backpack to unlock this achievement.');
										setShowLockedPopup(true);
									}
								}}
							/>
							<h3 className={`text-sm mt-1 ${!achievements.collector ? 'text-[8px] md:text-sm lg:text-base text-gray-400' : ''}`}>
								Collector
							</h3>
						</div>

												</div>
											</div>
										</div>
									</div>
									{showLockedPopup && (
							<div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
								<div className="bg-white text-gray-800 rounded-2xl p-6 shadow-2xl w-4/5 md:w-1/2 lg:w-1/3 text-center border border-blue-200">
									<p className="text-sm md:text-base lg:text-lg font-medium">
										{lockedMessage}
									</p>
									<button
										onClick={() => setShowLockedPopup(false)}
										className="mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition duration-200"
									>
										OK
									</button>
								</div>
							</div>
						)}
		</div>
	);
}

export default IdentityCard;
