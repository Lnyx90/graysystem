import React, { useEffect, useImperativeHandle, useState, useRef} from 'react';
import { useNavigate } from 'react-router-dom';

import GameTitleBar from '../components/GameTitleBar';
import GameWelcomePopup from '../components/GameWelcomePopup';
import GameStatusBar from '../components/GameStatusBar';
import GameSideBar from '../components/GameSideBar';

import useGameTime from '../hooks/GameTime';
import { getActionData, goBackToMainMap } from '../hooks/GameMapLocation';


import '../styles/Game.css';

function Game() {
	//Player

	const [player, setPlayer] = useState({ name: '', base: '', direction: 'down' });
	const [imageLoaded, setImageLoaded] = useState(false);
	const [playerSize, setPlayerSize] = useState(65);

	const [playerStatus, setPlayerStatus] = useState([
		{ id: 'hunger', value: 50, color: 'bg-red-500' },
		{ id: 'energy', value: 50, color: 'bg-yellow-300' },
		{ id: 'hygiene', value: 50, color: 'bg-blue-400' },
		{ id: 'happiness', value: 50, color: 'bg-pink-400' },
	]);

	const updateState = (key, delta) => {
		setPlayerStatus((prev) =>
			prev.map((stat) =>
				stat.id === key
					? { ...stat, value: Math.max(0, Math.min(100, stat.value + delta)) }
					: stat
			)
		);
	};

	const performActions = (action) => {
		
		switch (typeof action === 'string' ? action : action.label) {
			case 'Enjoy the View':
			case 'Capture the Moment':
			case 'Take a Picture':
			case 'Sightseeing':
			case 'Observing Borobudur':
			case 'Fly a Lantern':
			case 'Attend a Ceremony':
				updateState('happiness', +15);
				updateState('energy', -5);
				break;

			case 'Rest & Eat Snacks':
			case 'Eat Snacks':
				updateState('hunger', +20);
				updateState('energy', +10);
				updateState('hygiene', -2);
				break;

			case 'Eat Seafood':
				updateState('hunger', +25);
				updateState('energy', +15);
				updateState('happiness', +5);
				break;

			case 'Drink Coffee':
				updateState('energy', +25);
				updateState('hunger', +5);
				break;

			case 'Drink Tropical Juice':
				updateState('energy', +20);
				updateState('hygiene', +2);
				break;

			case 'Write Travel Journal':
			case 'Hiking Journaling':
				updateState('happiness', +10);
				break;

			case 'Chit Chat':
			case 'Talk to Fellow Campers':
				updateState('happiness', +15);
				updateState('energy', -3);
				break;

			case 'Buy Souvenir':
				updateState('happiness', +10);
				updateState('energy', -2);
				break;

			case 'Rent a Traditional Outfit':
				updateState('happiness', +15);
				updateState('energy', -5);
				break;

			case 'Hiking':
				updateState('energy', -20);
				updateState('happiness', +15);
				updateState('hunger', -10);
				break;

			case 'Fishing':
				updateState('hunger', -15);
				updateState('happiness', +10);
				updateState('energy', -10);
				break;

			case 'Collect Firewood':
				updateState('energy', -15);
				break;

			case 'Build Campfire':
			case 'Build a Campfire':
				updateState('energy', -15);
				updateState('happiness', +10);
				break;

			case 'Set Up Tent':
				updateState('energy', -10);
				updateState('hygiene', -3);
				break;

			case 'Cook Food':
				updateState('hunger', +30);
				updateState('energy', -5);
				break;

			case 'Observe Nature':
			case 'Learn Coral Ecosystem':
			case 'Observe Small Marine Life':
				updateState('happiness', +20);
				updateState('energy', -5);
				updateState('hygiene', +5);
				break;

			case 'Gather Spring Water':
				updateState('hygiene', +15);
				updateState('energy', -3);
				break;

			case 'Tanning':
				updateState('happiness', +10);
				updateState('hygiene', -5);
				break;

			case 'Build Sandcastles':
				updateState('happiness', +12);
				updateState('energy', -5);
				break;

			case 'Seashell Hunt':
				updateState('happiness', +15);
				updateState('energy', -7);
				break;

			case 'Visit Museum':
				updateState('happiness', +8);
				updateState('energy', -5);
				break;

				 case 'Eat':
        showActionPopup('Delicious meal! Hunger satisfied.');
        updateState('hunger', +30);
        updateState('energy', +10);
        updateState('hygiene', -5);
        return;
	  case 'Sleep':
		showActionPopup('Rested well! Energy restored.');
		updateState('energy', +50);
		updateState('hygiene', -10);
		updateState('happiness', +10);
		return;
	  case 'Bath':
  showBathPopup();
  updateState('hygiene', +30);
  return;
	 

			default:
				break;
		}
	};

	const [bathPopup, setBathPopup] = useState({
  show: false,
  message: "Bath Time!"
});

const showBathPopup = () => {
  setBathPopup({ show: true, message: "Bath Time!" });
  setTimeout(() => setBathPopup({ show: false, message: "" }), 3000);
};
	
useEffect(() => {
	const interval = setInterval(() => {
		setPlayerStatus(prevStatus =>
			prevStatus.map(stat => {
				let newValue = stat.value;

				switch (stat.id) {
					case 'hunger':
						newValue = Math.max(0, stat.value - 1); 
						break;
					case 'energy':
						newValue = Math.max(0, stat.value - 2);
						break;
					case 'happiness':
						newValue = Math.max(0, stat.value - 1);
						break;
					case 'hygiene':
						newValue = Math.max(0, stat.value - 1);
						break;
					default:
						break;
				}

				return { ...stat, value: newValue };
			})
		);
	}, 8000);

	return () => clearInterval(interval);
}, []);


	const navigate = useNavigate();

	React.useEffect(() => {
		if (playerStatus.some((stat) => stat.value === 0)) {
			navigate('/dead');
		}
	}, [playerStatus, navigate]);

	//Movement
	const moveIntervalRef = useRef(null);
	function startMoving(direction) {
		if (moveIntervalRef.current) return;

		moveIntervalRef.current = setInterval(() => {
			movePlayer(direction);
		}, 25);
	}

	function stopMoving() {
		clearInterval(moveIntervalRef.current);
		moveIntervalRef.current = null;
	}

	const inventoryItems = [
		{ id: 1, name: 'Item 1', icon: '1' },
		{ id: 2, name: 'Item 2', icon: '2' },
		{ id: 3, name: 'Item 3', icon: '3' },
	];

	//Date
	const { gameTime, formattedDate, formattedTime, greeting } = useGameTime(10);

	//Welcome Popup
	const [showWelcomePopup, setShowWelcomePopup] = useState(true);
	const closePopUp = () => {
		setShowWelcomePopup(false);
	};

	//Money
	const [money, setMoney] = useState(1000);

	const rupiah = new Intl.NumberFormat('id-ID', {
		style: 'currency',
		currency: 'IDR',
	}).format(money);

	//Position, Step & Location
	const [locationText, setLocationText] = useState('');
	const [playerPosition, setPlayerPosition] = useState({ x: 2500, y: 1500 });

	//Actions
	const [actions, setActions] = useState([]);
	const actionData = getActionData(actions);
const [actionPopup, setActionPopup] = useState({ show: false, message: '' });
	const showActionPopup = (message) => { 
  setActionPopup({ show: true, message });
  setTimeout(() => setActionPopup({ show: false, message: '' }), 3000);
	}



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
		default: '/images/background/GameDefaultMap.png',
		lake: '/images/background/GameLakeMap.jpg',
		beach: '/images/background/GameBeach.gif',
		mountain: '/images/background/GameMountainMap.jpeg',
		temple: '/images/background/GameTempleMap.jpg',
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
	const storedBase = localStorage.getItem('PlayerImageBase'); 

	document.body.style.backgroundImage = "url('/images/background/newbg.gif')";

	setPlayer({
		name: storedName || 'Player',
		base: storedBase || 'char1',
		direction: 'down',
	});
}, []);

	function movePlayer(direction) {
	setPlayer(prev => ({
		...prev,
		direction,
	}));

	setPlayerPosition((prev) => {
		let { x, y } = prev;
		const step = 20;

		if (direction === 'right') x += step;
		if (direction === 'left') x -= step;
		if (direction === 'up') y -= step;
		if (direction === 'down') y += step;

		x = Math.max(minX, Math.min(x, maxX));
		y = Math.max(minY, Math.min(y, maxY));

		return { x, y };
	});
}


	useEffect(() => {
		if (!showWelcomePopup) {
			const handleKeyDown = (e) => {
				setPlayerPosition((prev) => {
					let { x, y } = prev;
					const step = 20;

					if (e.key === 'ArrowRight') movePlayer('right');
					if (e.key === 'ArrowLeft') movePlayer('left');
					if (e.key === 'ArrowUp') movePlayer('up');
					if (e.key === 'ArrowDown') movePlayer('down');

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

				setMinX(10);
				setMinY(10);

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

				setMinX(10);
				setMinY(10);

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

				setMinX(10);
				setMinY(10);

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

				setMinX(10);
				setMinY(10);

				setMaxX(4670);
				setMaxY(2590);

				setMinScrollX(620);
				setMinScrollY(300);

				setMaxScrollX(6500);
				setMaxScrollY(3570);
			} else if (width >= 375) {
				setMapWidth(5000);
				setMapHeight(3000);

				setVWWidth(-4550);
				setVWHeight(-2500);
				setPlayerSize(60);

				setMinX(10);
				setMinY(10);

				setMaxX(4570);
				setMaxY(2580);

				setMinScrollX(620);
				setMinScrollY(300);

				setMaxScrollX(6500);
				setMaxScrollY(3570);
			} else {
				setMapWidth(5000);
				setMapHeight(3000);

				setVWWidth(-4650);
				setVWHeight(-2500);

				setPlayerSize(60);

				setMinX(10);
				setMinY(10);

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
			} else if (
				playerPosition.x >= 0 &&
				playerPosition.x <= 1300 &&
				playerPosition.y >= 1640 &&
				playerPosition.y <= 2350
			) {
				setCurrentMap('beach');
				setPlayerPosition({ x: 100, y: 100 });
				setActions([]);
				setLocationText('Welcome to Kuta Beach');
			} else if (
				playerPosition.x >= 400 &&
				playerPosition.x <= 1700 &&
				playerPosition.y >= 0 &&
				playerPosition.y <= 760
			) {
				setCurrentMap('mountain');
				setPlayerPosition({ x: 100, y: 100 });
				setActions([]);
				setLocationText('Welcome to the Mountain');
			} else if (
				playerPosition.x >= 3060 &&
				playerPosition.x <= 3420 &&
				playerPosition.y >= 780 &&
				playerPosition.y <= 1000
			) {
				setCurrentMap('temple');
				setPlayerPosition({ x: 100, y: 100 });
				setActions([]);
				setLocationText('Welcome to the Borobudur Temple');
			} else if (playerPosition.x === 2500 && playerPosition.y === 1500) {
			}
		} else if (currentMap === 'lake') {
			if (
				playerPosition.x >= 740 &&
				playerPosition.x <= 900 &&
				playerPosition.y === 260
			) {
				setActions(['Eat', 'Sleep', 'Bath']);
				setLocationText('Welcome Home');
			} else if (
				playerPosition.x === 2580 &&
				playerPosition.y === 620
			) {
				setActions(['Eat Snacks', 'Drink Coffee', 'Write Journal']);
				setLocationText('Welcome to Bites Shop');

			} else if (playerPosition.x === 3220 && playerPosition.y === 1500) {
				setActions(['Rent a Boat', 'Rent speedboat']);
				setLocationText('Welcome to Dockside shop');
			} else if (
				playerPosition.x >= 2700 &&
				playerPosition.x <= 2860 &&
				playerPosition.y >= 2050 &&
				playerPosition.y <= 2410
			) {
				setActions(['Sightseeing', 'Fishing', 'Take a Picture']);
				setLocationText(['You are at fishing dock']);
			} else {
				setActions([]);
			}
		} else if (currentMap === 'mountain') {
			if (
				Math.sqrt(
					(playerPosition.x - 2460) ** 2 + (playerPosition.y - 80) ** 2
				) < 80
			) {
				setActions([
					'Enjoy the View',
					'Capture the Moment',
					'Rest & Eat Snacks',
					'Hiking Journaling',
				]);
				setLocationText('You are at the Mountain Peak');
			} else if (
				Math.sqrt(
					(playerPosition.x - 2460) ** 2 + (playerPosition.y - 1800) ** 2
				) < 120
			) {
				setActions([
					'Hiking',
					'Observe Nature',
					'Collect Firewood',
					'Gather Spring Water',
				]);
				setLocationText('You are on the Mountain Slope');
			} else if (
				Math.sqrt(
					(playerPosition.x - 3860) ** 2 + (playerPosition.y - 2480) ** 2
				) < 120
			) {
				setActions([
					'Set Up Tent',
					'Cook Food',
					'Build a Campfire',
					'Talk to Fellow Campers',
				]);
				setLocationText('You are at the Campground');
			} else {
				setActions([]);
			}
		} else if (currentMap === 'temple') {
			if (
				playerPosition.x >= 1740 &&
				playerPosition.x <= 2180 &&
				playerPosition.y === 2180
			) {
				setActions([
					'Buy Souvenir',
					'Rent a Traditional Outfit',
					'Take a Picture',
				]);
				setLocationText(['You are near a shop']);
			} else if (
				playerPosition.x >= 3940 &&
				playerPosition.x <= 4220 &&
				playerPosition.y === 940
			) {
				setActions(['Visit Museum']);
				setLocationText(['You are at the temple']);
			} else if (
				playerPosition.x >= 2140 &&
				playerPosition.x <= 2340 &&
				playerPosition.y >= 880 &&
				playerPosition.y <= 920
			) {
				setActions([
					'Meditate',
					'Observing Borobudur',
					'Fly a Lanttern',
					'Attend a Ceremony',
				]);
			} else {
				setActions([]);
			}
		} else if (currentMap === 'beach') {
			if (
				playerPosition.x >= 1299 &&
				playerPosition.x <= 1380 &&
				playerPosition.y === 1100
			) {
				setActions(['Eat Seafood', 'Drink Tropical Juice', 'Chit Chat']);
				setLocationText(['You are near a Seaside Restaurant']);
			} else if (
				playerPosition.x >= 2619 &&
				playerPosition.x <= 4659 &&
				playerPosition.y === 1540
			) {
				setActions([
					'Take Picture',
					'Learn Coral Ecosystem',
					'Observe Small Marine Life',
				]);
				setLocationText(['You are at the Beach']);
			} else if (
				playerPosition.x >= 4059 &&
				playerPosition.x <= 4139 &&
				playerPosition.y <= 2020 &&
				playerPosition.y >= 1860
			) {
				setActions([
					'Tanning',
					'Build Sandcastles',
					'Seashell Hunt',
					'Sightseeing',
				]);
			} else {
				setActions([]);
			}
		}


	}, [playerPosition, currentMap]);

	return (
		<div
			id='bodyBackground'
			className='relative w-screen h-screen px-2 py-2 md:py-4 md:px-4 lg:py-8 lg:px-8 overflow-hidden'
		>
			<GameWelcomePopup
				player={player}
				showWelcomePopup={showWelcomePopup}
				closePopUp={closePopUp}
			/>
			{/* Action Popup */}
				{actionPopup.show && (
				<div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-white text-black px-4 py-2 rounded-lg shadow-lg z-50 animate-fade">
					{actionPopup.message}
				</div>
				)}
				{/* Add this to your JSX */}
{bathPopup.show && (
  <div className="fixed inset-0 z-50 flex items-center justify-center">
    <div className="animate-popup bg-white bg-opacity-90 p-4 rounded-lg shadow-xl border-2 border-blue-300 max-w-xs text-center">
      <img 
        src="/images/symbol/bath.gif" 
        alt="Bathing" 
        className="w-48 h-48 mx-auto mb-2"
      />
      <p className="text-lg font-bold text-blue-600">{bathPopup.message}</p>
      <p className="text-sm text-gray-700">You feel clean and refreshed!</p>
    </div>
  </div>
)}



			<GameTitleBar formattedDate={formattedDate} />

			<GameStatusBar status={playerStatus} />

			<div className='w-9/10 h-13/18 lg:h-14/18 mx-auto grid grid-rows-4 md:grid-cols-4 gap-2'>
				<div className=' row-span-3 md:row-span-4 md:col-span-3'>
					<div className='w-fit h-fit m-2 p-2 text-[6px] md:text-[10px] rounded-lg fixed bg-white z-10'>
						X: {playerPosition.x}, Y: {playerPosition.y}
					</div>

					<div className='w-fit h-fit m-2 mt-12 p-2 text-[6px] md:text-[10px] rounded-lg fixed bg-white z-10'>
						{rupiah}
					</div>

					<div className='m-2 mt-68 p-2 rounded-lg fixed grid grid-cols-3 grid-rows-3 z-10'>
						<div className='col-span-3 flex justify-center items-center '>
							<button
								onMouseDown={() => startMoving('up')}
								onMouseUp={stopMoving}
								onMouseLeave={stopMoving}
								onTouchStart={() => startMoving('up')}
								onTouchEnd={stopMoving}
							>
								<img
									className='w-4 md:w-6 lg:w-8	'
									src='/images/symbol/top.png'
								/>
							</button>
						</div>

						<div className='flex justify-center items-center -rotate-90'>
							<button
								onMouseDown={() => startMoving('left')}
								onMouseUp={stopMoving}
								onMouseLeave={stopMoving}
								onTouchStart={() => startMoving('left')}
								onTouchEnd={stopMoving}
							>
								<img
									className='w-4 md:w-6 lg:w-8'
									src='/images/symbol/top.png'
								/>
							</button>
						</div>

						<div></div>

						<div className='flex justify-center items-center rotate-90'>
							<button
								onMouseDown={() => startMoving('right')}
								onMouseUp={stopMoving}
								onMouseLeave={stopMoving}
								onTouchStart={() => startMoving('right')}
								onTouchEnd={stopMoving}
							>
								<img
									className='w-4 md:w-6 lg:w-8'
									src='/images/symbol/top.png'
								/>
							</button>
						</div>

						<div className='col-span-3 flex justify-center items-center rotate-180'>
							<button
								onMouseDown={() => startMoving('down')}
								onMouseUp={stopMoving}
								onMouseLeave={stopMoving}
								onTouchStart={() => startMoving('down')}
								onTouchEnd={stopMoving}
							>
								<img
									className='w-4 md:w-6 lg:w-8'
									src='/images/symbol/top.png'
								/>
							</button>
						</div>
					</div>

					<div className='w-full h-full rounded-lg relative overflow-hidden'>
						<div
							id='map'
							className='z-5 absolute scale-y-50 scale-x-50 md:scale-y-75 md:scale-x-75'
							style={{
								width: `${mapWidth}px`,
								height: `${mapHeight}px`,
								backgroundImage: `url(${mapImages[currentMap]})`,
								transform: `translate(${-offsetX}px, ${-offsetY}px)`,
								transition: 'transform 0.1s ease-out',
							}}
						>
							<div
								className='text-center'
								style={{
									width: playerSize * 3,
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
								<div className='flex flex-col'>
									<p>{player.name}</p>
									<img
										className='self-center'
										style={{ width: playerSize }}
										src={`/images/characters/${player.base}_${player.direction}.png`}
										alt="player"
									/>

									<div className='h-12 mt-2 gap-3 grid grid-cols-3'>
										<div className='border-1 bg-white/30'></div>
										<div className='border-1 bg-white/30'></div>
										<div className='border-1 bg-white/30'></div>
									</div>
								</div>
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
					performActions={performActions}
				/>
			</div>
		</div>
	);
}

export default Game;
