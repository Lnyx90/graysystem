import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import StartButton from '../components/HomePageStartButton';
import '../styles/HomePage.css';

function HomePage() {
	const navigate = useNavigate();
	const bgMusicRef = useRef(null);

	useEffect(() => {
		document.body.classList.add('home-page-container');

		const bgMusic = bgMusicRef.current;
		const savedTime = localStorage.getItem('musicTime');

		if (savedTime) {
			bgMusic.currentTime = parseFloat(savedTime);
		}

		if (!localStorage.getItem('musicInitialized')) {
			bgMusic.play()
				.then(() => {
					localStorage.setItem('musicInitialized', 'true');
				})
				.catch(err => {
					console.log('Autoplay prevented:', err);
				});
		}

		bgMusic.ontimeupdate = () => {
			localStorage.setItem('musicTime', bgMusic.currentTime);
		};

		const handleClick = () => {
			if (bgMusic.paused) {
				bgMusic.play().catch(err => console.log('Manual play failed:', err));
			}
		};
		document.addEventListener('click', handleClick);

		return () => {
			document.body.classList.remove('home-page-container');
			document.removeEventListener('click', handleClick);
		};
	}, []);

	return (
		<div className='w-screen h-screen flex items-center justify-center'>
			<audio ref={bgMusicRef} autoPlay loop>
				<source src='images/music/homepage.mp3' type='audio/mpeg' />
			</audio>

			<div className='text-center'>
				<h2 className='mb-6 text-2xl md:text-3xl lg:text-4xl font-bold text-glow text-glow-home text-glow-pulse-home'>
					Archipelago Adventure!
				</h2>

				<StartButton onClick={() => navigate('/PickChar')} />
			</div>
		</div>
	);
}

export default HomePage;

