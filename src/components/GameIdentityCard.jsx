import React, { useState } from 'react';

function IdentityCard({ onClose, userName }) {
	const [flipped, setFlipped] = useState(false);
	const characterImage = `/images/characters/${localStorage.getItem('PlayerImageBase')}_right.png`;


	return (
		<div className='mt-20 fixed flex inset-0 justify-center items-center text-center z-10'>
			<div
				onClick={() => setFlipped(!flipped)}
				style={{ perspective: '1000px' }}
				className='w-4/5 md:w-3/4 lg:w-1/2'
			>
				<div
					style={{
						transformStyle: 'preserve-3d',
						transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
					}}
					className='w-full h-full p-2 rounded-lg text-[10px] md:text-sm lg:text-base border-2 bg-white transition-transform duration-500'
				>
					<div
						className='flex flex-col fixed inset-0'
						style={{ backfaceVisibility: 'hidden' }}
					>
						{!flipped && (
							<div className='flex justify-end p-2'>
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

						<div className='flex items-center justify-center'>
							<h2>ID Card</h2>
						</div>

						<div className='w-full h-full grid grid-cols-2'>
							<div className='flex items-center justify-center'>
								<img
									src={characterImage}
									className='w-3/10 p-0.5 md:p-1 lg:p-2'
									alt="Player Character"
									/>
							</div>
							<div className='flex flex-col items-start justify-center'>
								<p className=''>Name: {userName}</p>
								<p className=''>Level: 1</p>
								<p className=''>Exp:0/100</p>
							</div>
						</div>
					</div>

					<div
						className='w-full h-full '
						style={{
							backfaceVisibility: 'hidden',
							transform: 'rotateY(180deg)',
						}}
					>
						<div className='flex justify-end'>
							<button
								onClick={(e) => {
									e.stopPropagation();
									onClose();
								}}
							>
								×
							</button>
						</div>

						<div className='flex items-center justify-center'>
							<h2>Achievements</h2>
						</div>

						<div className='w-full grid grid-cols-2 grid-rows-2'>
							<div className='rouded-full w-3/14 flex flex-col justify-center items-center mx-auto'>
								<img src='/images/achivements/GameAchievementCapture.png'/>
                                <h3>Photography</h3>
							</div>
							<div className='rouded-full w-3/14 flex flex-col justify-center items-center mx-auto'>
								<img src='/images/achivements/GameAchievementExplorer.png'/>
                                <h3>Map Explorer</h3>
							</div>
							<div className='rouded-full w-3/14 flex flex-col justify-center items-center mx-auto'>
								<img src='/images/achivements/GameAchievementTreasure.png'/>
                                <h3>Collector</h3>
							</div>
							<div className='rouded-full w-3/14 flex flex-col justify-center items-center mx-auto'>
								<img src='/images/achivements/GameAchievementComposting.png'/>
                                <h3>Compostion</h3>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default IdentityCard;
