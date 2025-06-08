import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import '../styles/Dead.css'

function Dead() {
    const navigate = useNavigate();
	const location = useLocation();
 	 const score = location.state?.score || 0;

	useEffect(() => {
		// Play background music when component mounts
		const music = document.getElementById('music');
		if (music) {
			music.play().catch((error) => {
				console.log('Auto-play prevented:', error);
				// Handle cases where autoplay is blocked
			});
		}

		return () => {
			// Pause music when component unmounts
			if (music) {
				music.pause();
			}
		};
	}, []);

    const startGame = () =>{
        navigate('/')
    }

	return (
		<div
			className='flex items-center justify-center min-h-screen text-green-800 text-center px-4 sm:px-6 transition-opacity'
			style={{
				backgroundImage: "url('/images/background/DeadBackground.gif')",
				backgroundSize: 'cover',
				backgroundPosition: 'center',
			}}
		>
			<audio id='bgMusic' autoPlay loop>
				<source src='images/music/over.mp3' type='audio/mpeg' />
			</audio>

			<div
				id='gameContainer'
				className='flex flex-col items-center justify-center text-center w-full max-w-md sm:mt-[-30px] mt-[-20px] space-y-6'
			>
				<div className='flex flex-col'>
					<h2 className='text-3xl md:text-4xl lg:text-4xl text-black font-bold glow-text'>
						GAME OVER!
					</h2>
					 <div className="text-center mt-20">
						<p className="text-[10px] md:text-sm lg:text-base text-white font-bold glow-text">Life Satisfaction Score: {score}/100</p>
						</div>
				</div>
				<button
					onClick={startGame}
					className='px-4 py-2.5 text-base sm:text-lg font-semibold text-white bg-gray-500 rounded-lg shadow-md transition pulse-button w-40 sm:w-48'
				>
					Exit
				</button>
			</div>
		</div>
	);
}

export default Dead;
