import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LevelSelection({ onSelect }) {
	const navigate = useNavigate();
	const [messageLines, setMessageLines] = useState([]);
	const [hasSelected, setHasSelected] = useState(false);

	const handleClick = (level) => {
		const hearts = level === 'easy' ? 3 : level === 'medium' ? 2 : 1;

		if (onSelect) {
			onSelect(level);
		}

		setMessageLines([
			`You choose ${level} difficulty.`,
			`❤️ You have ${hearts} heart${hearts > 1 ? 's' : ''}!`,
		]);
		setHasSelected(true);

		setTimeout(() => {
			navigate('/game', { state: { difficulty: level, hearts } });
		}, 4000);
	};

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
			<img
				className="absolute inset-0 w-full h-full object-cover"
				src="images/background/PickCharBackground.gif"
				alt="Background"
			/>
			<div className="absolute inset-0 bg-opacity-50 backdrop-blur-sm"></div>

			<div className="mr-6 ml-6 relative z-10 bg-white bg-opacity-90 p-6 sm:p-8 rounded-2xl shadow-2xl border-4 border-blue-700 max-w-md w-full text-center">
				{!hasSelected && (
					<h2 className="text-xl sm:text-2xl font-bold text-blue-800 mb-6">
						Choose Difficulty Level
					</h2>
				)}

				{!hasSelected ? (
					<div className="flex flex-col sm:flex-row justify-center gap-4 mb-4">
						{['easy', 'medium', 'hard'].map((level) => (
							<button
								key={level}
								onClick={() => handleClick(level)}
								className={`px-5 py-2 rounded-lg font-semibold transition hover:scale-105 ${
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
				) : (
					<div className="text-sm sm:text-base font-semibold text-blue-900 space-y-2 animate-pulse">
						{messageLines.map((line, index) => (
							<p key={index}>{line}</p>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
