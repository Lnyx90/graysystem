import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StartButton from '../components/HomePageStartButton';
import '../styles/HomePage.css';

function HomePage() {
	const navigate = useNavigate();

	useEffect(() => {
		document.body.classList.add('home-page-container');

		return () => {
			document.body.classList.remove('home-page-container');
		};
	}, []);

	return (
		<div className='w-screen h-screen flex items-center justify-center'>
			<div className='text-center'>
				<h2 className='mb-6 text-2xl md:text-4xl font- font-bold text-glow text-glow-home text-glow-pulse-home'>
					Archipelago Adventure!
				</h2>

				<StartButton onClick={() => navigate('/PickChar')} />
			</div>
		</div>
	);
}

export default HomePage;
