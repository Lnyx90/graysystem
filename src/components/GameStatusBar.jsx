import React from 'react';

function GameStatusBar({ status }) {
	return (
		<div className="w-9/10 h-3/18 md:h-2/18 mx-auto p-3 text-black rounded-lg">
			<div className="grid grid-cols-2 md:grid-cols-4 gap-3">
				{status.map(({ id, value, color }) => (
					<div
						key={id}
						className="rounded-lg p-0.5 md:p-1 gap-2 bg-white border-2 border-black flex items-center"
					>
						<img
							src={`images/symbol/${id}.png`}
							alt={id}
							className="w-4 md:w-6 lg:w-8 m-1 md:m-0"
						/>

						<div className="w-full h-2 md:h-3 bg-gray-300 rounded-full overflow-hidden">
							<div
								className={`h-2 md:h-3 ${color} transition-all duration-300`}
								style={{ width: `${Math.round(value)}%` }}
							/>
						</div>

						<span className="text-[6px] md:text-[10px]">{Math.round(value)}%</span>
					</div>
				))}
			</div>
		</div>
	);
}

export default GameStatusBar;
