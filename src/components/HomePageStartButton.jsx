import React, { useRef } from 'react';

function StartButton({ onClick }) {
	const clickSoundRef = useRef(null);

	const handleClick = () => {
		if (clickSoundRef.current) {
			clickSoundRef.current.currentTime = 0;
			clickSoundRef.current.play().catch((err) =>
				console.log('Play error:', err)
			);
		}

		if (onClick) {
			setTimeout(onClick, 400);
		}
	};

	return (
		<>
			<audio ref={clickSoundRef} preload='auto'>
				<source src='/images/music/click.mp3' type='audio/mpeg' />
			</audio>

			<button
				onClick={handleClick}
				className='px-6 py-2 font-semibold text-white bg-green-500 rounded-lg shadow-md hover:bg-green-600 transition button-float'
			>
				Start Exploring
			</button>
		</>
	);
}

export default StartButton;
