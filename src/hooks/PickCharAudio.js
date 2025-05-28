import { useEffect, useRef } from 'react';

export default function PickCharAudio() {
	const bgMusicRef = useRef(null);
	const clickSoundRef = useRef(null);

	useEffect(() => {
		const savedTime = localStorage.getItem('musicTime') || 0;

		if (bgMusicRef.current) {
			bgMusicRef.current.currentTime = savedTime;
		}

		return () => {
			if (bgMusicRef.current) {
				localStorage.setItem('musicTime', bgMusicRef.current.currentTime);
			}
		};
	}, []);

	const playClickSound = () => {
		if (clickSoundRef.current) {
			clickSoundRef.current.currentTime = 0;
		}
	};

	return { bgMusicRef, clickSoundRef, playClickSound };
}
