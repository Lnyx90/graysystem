import React from 'react';

export default function LevelSelection({ onSelect, onClose }) {
	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center overflow-hidden'>
			<img
				className='absolute inset-0 w-full h-full object-cover'
				src='/images/background/PickCharBackground.gif'
				alt='Background'
			/>
			<div className='absolute inset-0 bg-opacity-50 backdrop-blur-sm'></div>

			<div className='relative z-10 bg-white bg-opacity-90 p-6 sm:p-8 rounded-2xl shadow-2xl border-4 border-blue-700 max-w-md w-full text-center'>
				<h2 className='text-xl sm:text-2xl font-bold text-blue-800 mb-6'>
					Choose Difficulty Level
				</h2>
				<div className='flex flex-col sm:flex-row justify-center gap-4'>
					{['easy', 'medium', 'hard'].map((level) => (
						<button
							key={level}
							onClick={() => onSelect(level)}
							className={`px-5 py-2 rounded-lg font-semibold transition hover:scale-105
                ${
									level === 'easy'
										? 'bg-green-500 hover:bg-green-600 text-white'
										: level === 'medium'
										? 'bg-yellow-500 hover:bg-yellow-600 text-white'
										: 'bg-red-500 hover:bg-red-600 text-white'
								}`}
						>
							{level.charAt(0).toUpperCase() + level.slice(1)}
						</button>
					))}
				</div>
			</div>
		</div>
	);
}
