import React, { useEffect, useImperativeHandle, useState, useRef } from 'react';

import GameTitleBar from '../components/GameTitleBar';
import GameWelcomePopup from '../components/GameWelcomePopup';
import GameStatusBar from '../components/GameStatusBar';
import GameSideBar from '../components/GameSideBar';

import useGameTime from '../hooks/GameTime';
import Status from '../hooks/GameStats';
import { getActionData, goBackToMainMap } from '../hooks/GameMapLocation';

import '../styles/Game.css';

function Game() {
	//Player
	const [player, setPlayer] = useState({ name: '', image: '' });
	const [imageLoaded, setImageLoaded] = useState(false);
	const playerStatus = Status.player;
	const [playerSize, setPlayerSize] = useState(65);

	//Date
	const { gameTime, formattedDate, formattedTime, greeting } = useGameTime(10);

	//Welcome Popup
	const [showWelcomePopup, setShowWelcomePopup] = useState(true);
	const closePopUp = () => {
		setShowWelcomePopup(false);
	};

	//Money

	//Position, Step & Location
	const [locationText, setLocationText] = useState('');
	const [playerPosition, setPlayerPosition] = useState({ x: 2500, y: 1500 });

	//Actions
	const [actions, setActions] = useState([]);
	const actionData = getActionData(actions);

	//Map
	let [currentMap, setCurrentMap] = useState('default');

	const [mapWidth, setMapWidth] = useState(5000);
	const [mapHeight, setMapHeight] = useState(3000);

	const [vwWidth, setVWWidth] = useState(940);
	const [vwHeight, setVWHeight] = useState(350);

	const [minX, setMinX] = useState(0);
	const [minY, setMinY] = useState(0);

	const [maxX, setMaxX] = useState(4790);
	const [maxY, setMaxY] = useState(2610);

	const [minScrollX, setMinScrollX] = useState(620);
	const [minScrollY, setMinScrollY] = useState(300);

	const [maxScrollX, setMaxScrollX] = useState(4360);
	const [maxScrollY, setMaxScrollY] = useState(2560);

	let [offsetX, setOffsetX] = useState(0);
	let [offsetY, setOffsetY] = useState(0);

	const width = window.innerWidth;

	const mapImages = {
		default: '/images/background/map.png',
		lake: '/images/background/lake.jpg',
		beach: '/images/background/beach.gif',
		mountain: '/images/background/mountain.jpeg',
		temple: '/images/background/temple.jpg',
	};

	if (width >= 1440) {
		if (playerPosition.x > minScrollX) {
			offsetX = Math.max(
				0,
				Math.min(playerPosition.x - vwWidth / 2, maxScrollX)
			);
		} else {
			offsetX = 840;
		}

		if (playerPosition.y > minScrollY) {
			offsetY = Math.max(
				0,
				Math.min(playerPosition.y - vwHeight / 2, maxScrollY)
			);
		} else {
			offsetY = 500;
		}
	} else if (width >= 1024) {
		if (playerPosition.x > minScrollX) {
			offsetX = Math.max(
				0,
				Math.min(playerPosition.x - vwWidth / 2, maxScrollX)
			);
		} else {
			offsetX = 840;
		}

		if (playerPosition.y > minScrollY) {
			offsetY = Math.max(
				0,
				Math.min(playerPosition.y - vwHeight / 2, maxScrollY)
			);
		} else {
			offsetY = 500;
		}
	} else if (width >= 768) {
		if (playerPosition.x > minScrollX) {
			offsetX = Math.max(
				0,
				Math.min(playerPosition.x - vwWidth / 2, maxScrollX)
			);
		} else {
			offsetX = 840;
		}

		if (playerPosition.y > minScrollY) {
			offsetY = Math.max(
				0,
				Math.min(playerPosition.y - vwHeight / 2, maxScrollY)
			);
		} else {
			offsetY = 500;
		}
	} else if (width >= 425) {
		if (playerPosition.x > minScrollX) {
			offsetX = Math.max(
				0,
				Math.min(playerPosition.x - vwWidth / 2, maxScrollX)
			);
		} else {
			offsetX = 2500;
		}

		if (playerPosition.y > minScrollY) {
			offsetY = Math.max(
				0,
				Math.min(playerPosition.y - vwHeight / 2, maxScrollY)
			);
		} else {
			offsetY = 1500;
		}
	} else if (width >= 375) {
		if (playerPosition.x > minScrollX) {
			offsetX = Math.max(
				0,
				Math.min(playerPosition.x - vwWidth / 2, maxScrollX)
			);
		} else {
			offsetX = 2500;
		}

		if (playerPosition.y > minScrollY) {
			offsetY = Math.max(
				0,
				Math.min(playerPosition.y - vwHeight / 2, maxScrollY)
			);
		} else {
			offsetY = 1500;
		}
	} else {
		if (playerPosition.x > minScrollX) {
			offsetX = Math.max(
				0,
				Math.min(playerPosition.x - vwWidth / 2, maxScrollX)
			);
		} else {
			offsetX = 2500;
		}

		if (playerPosition.y > minScrollY) {
			offsetY = Math.max(
				0,
				Math.min(playerPosition.y - vwHeight / 2, maxScrollY)
			);
		} else {
			offsetY = 1500;
		}
	}

	//UseEffects
	useEffect(() => {
		const storedName = localStorage.getItem('playerName');
		const storedImage = localStorage.getItem('PlayerImage');
		document.body.style.backgroundImage = "url('/images/background/newbg.gif')";

		setPlayer({
			name: storedName || 'Player',
			image: storedImage || '/images/symbol/wayang1.png',
		});
	}, []);

	useEffect(() => {
		if (!showWelcomePopup) {
			const handleKeyDown = (e) => {
				setPlayerPosition((prev) => {
					let { x, y } = prev;
					const step = 20;

					if (e.key === 'ArrowRight') x += step;
					if (e.key === 'ArrowLeft') x -= step;
					if (e.key === 'ArrowUp') y -= step;
					if (e.key === 'ArrowDown') y += step;

					x = Math.max(minX, Math.min(x, maxX));
					y = Math.max(minY, Math.min(y, maxY));

					return { x, y };
				});
			};

			window.addEventListener('keydown', handleKeyDown);
			return () => window.removeEventListener('keydown', handleKeyDown);
		}
	}, [showWelcomePopup, maxScrollX, maxScrollY, vwWidth, vwHeight]);

	useEffect(() => {
		if (!showWelcomePopup) {
			const timeoutId = setTimeout(() => setImageLoaded(true), 600);
			return () => clearTimeout(timeoutId);
		}
	}, [showWelcomePopup]);

	useEffect(() => {
		const handleResize = () => {
			if (width >= 1440) {
				setMapWidth(5000);
				setMapHeight(3000);

				setVWWidth(-450);
				setVWHeight(-400);

				setPlayerSize(60);

				setMinX(0);
				setMinY(0);

				setMaxX(4790);
				setMaxY(2610);

				setMinScrollX(620);
				setMinScrollY(300);

				setMaxScrollX(4360);
				setMaxScrollY(2560);
			} else if (width >= 1024) {
				setMapWidth(5000);
				setMapHeight(3000);

				setVWWidth(-900);
				setVWHeight(-600);

				setPlayerSize(60);

				setMinX(0);
				setMinY(0);

				setMaxX(4310);
				setMaxY(2500);

				setMinScrollX(620);
				setMinScrollY(300);

				setMaxScrollX(4360);
				setMaxScrollY(2560);
			} else if (width >= 768) {
				setMapWidth(5000);
				setMapHeight(3000);

				setVWWidth(-1100);
				setVWHeight(-600);
				setPlayerSize(60);

				setMinX(0);
				setMinY(0);

				setMaxX(4110);
				setMaxY(2490);

				setMinScrollX(620);
				setMinScrollY(300);

				setMaxScrollX(4360);
				setMaxScrollY(2560);
			} else if (width >= 425) {
				setMapWidth(5000);
				setMapHeight(3000);

				setVWWidth(-4400);
				setVWHeight(-2500);

				setPlayerSize(60);

				setMinX(0);
				setMinY(0);

				setMaxX(4670);
				setMaxY(2590);

				setMinScrollX(620);
				setMinScrollY(300);

				setMaxScrollX(6500);
				setMaxScrollY(3570);
			} else if (width >= 375) {
				setMapWidth(5000);
				setMapHeight(3000);

				setVWWidth(-4400);
				setVWHeight(-2500);
				setPlayerSize(60);

				setMinX(0);
				setMinY(0);

				setMaxX(4570);
				setMaxY(2580);

				setMinScrollX(620);
				setMinScrollY(300);

				setMaxScrollX(6500);
				setMaxScrollY(3570);
			} else {
				setMapWidth(5000);
				setMapHeight(3000);

				setVWWidth(-4500);
				setVWHeight(-2500);

				setPlayerSize(60);

				setMinX(0);
				setMinY(0);

				setMaxX(4480);
				setMaxY(2590);

				setMinScrollX(620);
				setMinScrollY(300);

				setMaxScrollX(6500);
				setMaxScrollY(3570);
			}
			setPlayerPosition({ x: 2500, y: 1500 });
		};

		handleResize();
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	useEffect(() => {
		if (currentMap === 'default') {
			// Lake entry zone
			if (
				playerPosition.x >= 3540 &&
				playerPosition.x <= 4790 &&
				playerPosition.y >= 2310 &&
				playerPosition.y <= 2610
			) {
				setCurrentMap('lake');
				setPlayerPosition({ x: 100, y: 100 });
				setActions([]);
				setLocationText('Welcome to Lake Toba');
			}
			// Beach entry zone
			else if (
				playerPosition.x >= 510 &&
				playerPosition.x <= 610 &&
				playerPosition.y >= 900 &&
				playerPosition.y <= 1170
			) {
				setCurrentMap('beach');
				setPlayerPosition({ x: 100, y: 100 });
				setActions([]);
				setLocationText('Welcome to Kuta Beach');
			}
			//Mountain entry zone
			else if (
				playerPosition.x >= 490 &&
				playerPosition.x <= 510 &&
				playerPosition.y >= 390 &&
				playerPosition.y <= 410
			) {
				setCurrentMap('mountain');
				setPlayerPosition({ x: 100, y: 100 });
				setActions([]);
				setLocationText('Welcome to the Mountain');
			}
			// Temple entry zone
			else if (
				playerPosition.x >= 1440 &&
				playerPosition.x <= 1460 &&
				playerPosition.y >= 340 &&
				playerPosition.y <= 360
			) {
				setCurrentMap('temple');
				setPlayerPosition({ x: 100, y: 100 });
				setActions([]);
				setLocationText('Welcome to the Borobudur Temple');
			}
		}
	}, [playerPosition, currentMap]);

	//Collision

	//Movement
	const [position, setPosition] = useState({ x: 0, y: 0 });

	return (
		<div
			id='bodyBackground'
			className='w-screen h-screen px-2 py-2 md:py-4 md:px-4 lg:py-8 lg:px-8 overflow-hidden'
		>
			<GameWelcomePopup
				player={player}
				showWelcomePopup={showWelcomePopup}
				closePopUp={closePopUp}
			/>

			<GameTitleBar formattedDate={formattedDate} />

			<GameStatusBar status={playerStatus} />

			<div className='w-9/10 h-13/18 lg:h-14/18 mx-auto grid grid-rows-4 md:grid-cols-4 gap-2'>
				<div className=' row-span-3 md:row-span-4 md:col-span-3'>
					<div className='w-fit h-fit m-2 p-2 text-[6px] md:text-[10px] rounded-lg fixed bg-white z-10'>
						X: {playerPosition.x}, Y: {playerPosition.y}
					</div>

					<div className='w-full h-full rounded-lg relative overflow-hidden'>
						<div
							id='map'
							className='absolute scale-y-50 scale-x-50 md:scale-y-75 md:scale-x-75'
							style={{
								width: `${mapWidth}px`,
								height: `${mapHeight}px`,
								backgroundImage:
									currentMap === 'default'
										? "url('/images/background/map.png')"
										: currentMap === 'lake'
										? "url('/images/background/lake.jpg')"
										: currentMap === 'beach'
										? "url('/images/background/beach.gif')"
										: currentMap === 'temple'
										? "url('/images/background/temple.jpg')"
										: currentMap === 'mountain'
										? "url('/images/background/mountain.jpeg')"
										: 'none',
								transform: `translate(${-offsetX}px, ${-offsetY}px)`,
								transition: 'transform 0.1s ease-out',
							}}
						>
							<div
								className='text-center'
								style={{
									width: playerSize,
									left: playerPosition.x,
									top: playerPosition.y,
									position: 'fixed',
									objectFit: 'cover',
									opacity: imageLoaded ? 1 : 0,
									transform: imageLoaded
										? 'scale(1) translateY(0)'
										: 'scale(0.5) translateY(1rem)',
									transition:
										'opacity 0.7s ease-out, transform 0.7s ease-out, left 0.1s, top 0.1s',
								}}
							>
								<p>{player.name}</p>
								<img src={player.image} />
							</div>
						</div>
					</div>
				</div>

				<GameSideBar
					currentMap={currentMap}
					locationText={locationText}
					formattedTime={formattedTime}
					greeting={greeting}
					actionData={actionData}
					setCurrentMap={setCurrentMap}
					setPlayerPosition={setPlayerPosition}
					setActions={setActions}
					setLocationText={setLocationText}
				/>
			</div>
		</div>
	);
}

export default Game;
