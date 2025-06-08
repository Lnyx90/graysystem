import React from 'react';

function GameAchievementPopup({ show, icon, title, desc }) {
	return (
		<div
		id="achievement-popup"
		className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 
			flex items-center justify-center
			bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 
			p-4 rounded-lg z-50
			transition-all duration-300
			w-[90%] sm:w-2/3 md:w-2/3 lg:w-2/5 xl:w-1/3 2xl:w-1/4
			${show ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
		>
			<div className="flex items-start">
				<div className="flex-shrink-0">
					<img
						id="achievement-icon"
						src={icon}
						alt="Achievement"
						className="w-10 rounded-full"
					/>
				</div>
				<div className="ml-3">
					<h3 className="text-[8px] md:text-xs lg:text-sm font-bold" id="achievement-title">
						{title}
					</h3>
					<p className="text-[6px] md:text-[8px] lg:text-sm mt-1" id="achievement-desc">
						{desc}
					</p>
				</div>
			</div>
		</div>
	);
}

export default GameAchievementPopup;
