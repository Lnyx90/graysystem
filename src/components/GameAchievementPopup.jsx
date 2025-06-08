import React from 'react';

function GameAchievementPopup({ show, icon, title, desc }) {
	return (
		<div
			id="achievement-popup"
			className={`fixed bottom-4 right-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-lg z-50 max-w-xs transition-all duration-300 transform ${
				show ? 'translate-x-0' : 'translate-x-full'
			}`}
			style={{ display: show ? 'block' : 'none' }}
		>
			<div className="flex items-start">
				<div className="flex-shrink-0">
					<img
						id="achievement-icon"
						src={icon}
						alt="Achievement"
						className="w-10 h-10 rounded-full"
					/>
				</div>
				<div className="ml-3">
					<h3 className="text-sm font-bold" id="achievement-title">
						{title}
					</h3>
					<p className="text-xs mt-1" id="achievement-desc">
						{desc}
					</p>
				</div>
			</div>
		</div>
	);
}

export default GameAchievementPopup;
