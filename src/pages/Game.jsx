import React, { useEffect, useImperativeHandle, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import GameTitleBar from '../components/GameTitleBar';
import GameWelcomePopup from '../components/GameWelcomePopup';
import GameStatusBar from '../components/GameStatusBar';
import GameSideBar from '../components/GameSideBar';
import LevelSelection from '../components/PickCharLevelSelection';
import useGameTime from '../hooks/GameTime';
import { getActionData, goBackToMainMap } from '../hooks/GameMapLocation';
import '../styles/Game.css';
import GamePopup from '../components/Gamepopup';

function Game() {
	//Player
	const location = useLocation();
	const navigate = useNavigate();
	const [player, setPlayer] = useState({
		name: '',
		base: '',
		direction: 'right',
	});
	const [imageLoaded, setImageLoaded] = useState(false);
	const [playerSize, setPlayerSize] = useState(65);
	const { difficulty: initialDifficulty, hearts: initialHearts } = location.state || {};
	const [difficulty, setDifficulty] = useState(initialDifficulty || null);
	const [hearts, setHearts] = useState(initialHearts || 0);
	const [unlockedItems, setUnlockedItems] = useState([]);
	const [activityLog, setActivityLog] = useState([]);
	const [visitedMaps, setVisitedMaps] = useState([]);

	const defaultPlayerStatus = [
		{ id: 'hunger', value: 50, color: 'bg-red-500' },
		{ id: 'energy', value: 50, color: 'bg-yellow-300' },
		{ id: 'hygiene', value: 50, color: 'bg-blue-400' },
		{ id: 'happiness', value: 50, color: 'bg-pink-400' },
	];
	const [playerStatus, setPlayerStatus] = useState([
		{ id: 'hunger', value: 50, color: 'bg-red-500' },
		{ id: 'energy', value: 50, color: 'bg-yellow-300' },
		{ id: 'hygiene', value: 50, color: 'bg-blue-400' },
		{ id: 'happiness', value: 50, color: 'bg-pink-400' },
	]);

	const updateStats = (key, delta) => {
		setPlayerStatus((prev) =>
			prev.map((stat) =>
				stat.id === key ? { ...stat, value: Math.max(0, Math.min(100, stat.value + delta)) } : stat
			)
		);
	};

	//Activites
	const activityInterval = useRef(null);
	const [currentActivity, setCurrentActivity] = useState(null);
	const [activityInProgress, setActivityInProgress] = useState(false);

	const unlockItem = (name) => {
		setUnlockedItems((prev) => (prev.includes(name) ? prev : [...prev, name]));
	};

	//popup
	const [popup, setPopup] = useState({
		show: false,
		type: '', // 'bath', 'eat', 'sleep', etc.
		message: '',
		additionalMessage: '',
		image: '',
	});

	const popupConfigs = {
		bath: {
			image: '/images/symbol/bath.gif',
			message: 'Bath Time!',
			additionalMessage: 'You feel clean and refreshed!',
		},
		BuyFishingRod: {
			image: '/images/items/pancing.png',
			message: 'Here is Your Fishing Rod!',
			additionalMessage: 'Check Your Backpack!',
		},
		Rentboat: {
			image: '/images/symbol/boat.gif',
			message: 'Get On Board!',
			additionalMessage: 'Dont Forget Your Ticket!',
		},
		Takepic: {
			image: '/images/items/kamera.png',
			message: 'Say Cheese!',
			additionalMessage: 'Damn, You look Amazing !',
		},
		FlyLantern: {
			image: '/images/symbol/lantern.gif',
			message: '',
			additionalMessage: 'The lantern cant shine as bright as u',
		},
		Journal: {
			image: '/images/symbol/Journal.gif',
			message: 'Every Memory is Worth Written',
			additionalMessage: '',
		},
		Wood: {
			image: '/images/symbol/wood.gif',
			message: 'Do it all for the flamin fire',
			additionalMessage: '',
		},
		Cook: {
			image: '/images/symbol/cook.gif',
			message: 'Looking Delicious',
			additionalMessage: '',
		},
		Sandal: {
			image: '/images/symbol/sandal.avif',
			message: 'Looking Good in Your New Sandals',
			additionalMessage: '',
		},
		Crab: {
			image: '/images/symbol/crab.gif',
			message: 'Get to Know Your New Friend',
			additionalMessage: 'Be careful of Its Claw',
		},
		Sandcastle: {
			image: '/images/items/sandcastle.png',
			message: 'You Bought a Sandcastle Bucket!',
			additionalMessage: 'Check You Backpack!',
		},
		sleep: {
			image: '/images/symbol/sleep.png',
			message: 'Good Night!',
			additionalMessage: 'Sleep Tight!',
		},
		Eat: {
			image: '/images/items/makanan.png',
			message: 'Bon Appétit!',
			additionalMessage: 'Enjoy Your Meal!',
		},
		BuyBucket: {
			image: '/images/items/wadah.png',
			message: 'Bought a Bucket',
			additionalMessage: 'Check Your Backpack!',
		},
		BuyBait: {
			image: '/images/items/umpan.png',
			message: 'Bought Bait',
			additionalMessage: 'Check Your Backpack!',
		},
		TourGuide: {
			image: '/images/symbol/tourguide.png',
			message: 'You are now a Tour Guide!',
			additionalMessage: 'Guide your friends to explore the world!',
		},
		BuyBinoculars: {
			image: '/images/items/binokular.png',
			message: 'Bought Binoculars',
			additionalMessage: 'Check Your Backpack!',
		},
		Fishing: {
			image: '/images/symbol/fish.png',
			message: 'Fishing Time!',
			additionalMessage: 'Relax and enjoy the moment!',
		},
		Sightseeing: {
			image: '/images/symbol/sight.png',
			message: 'Enjoy the Scenery!',
			additionalMessage: 'Take a moment to appreciate nature!',
		},
		Takepic: {
			image: '/images/items/kamera.png',
			message: 'Capture the Moment!',
			additionalMessage: 'Your memories are now preserved!',
		},
		BecomeCashier: {
			image: '/images/symbol/cashier.png',
			message: 'You are now a Cashier!',
			additionalMessage: 'Manage your transactions wisely!',
		},
		ObserveCoral: {
			image: '/images/symbol/coral.png',
			message: 'Observe the Coral Ecosystem!',
			additionalMessage: 'Learn about the beauty of marine life!',
		},
		BuildSandcastle: {
			image: '/images/symbol/Sandcastle.gif',
			message: 'Building Sandcastles is Fun!',
			additionalMessage: 'Let your creativity shine!',
		},
		Seashell: {
			image: '/images/symbol/seashell.png',
			message: 'Seashell Hunt is Exciting!',
			additionalMessage: 'Discover the treasures of the beach!',
		},
		Tanning: {
			image: '/images/symbol/sun.png',
			message: 'Enjoy the Sun!',
			additionalMessage: 'Get that perfect tan!',
		},
	};

	const showPopup = (type) => {
		const config = popupConfigs[type] || {};
		setPopup({
			show: true,
			type,
			message: config.message,
			additionalMessage: config.additionalMessage,
			image: config.image,
		});
		setTimeout(
			() =>
				setPopup({
					show: false,
					type: '',
					message: '',
					additionalMessage: '',
					image: '',
				}),
			3000
		);
	};

	const timedActions = {
		'Enjoy the View': {
			duration: 2000,
			effects: { happiness: +15, energy: -5 },
		},
		'Capture the Moment': {
			duration: 2000,
			effects: { happiness: +15, energy: -5 },
		},
		'Take a Picture': {
			duration: 2000,
			effects: { happiness: +15, energy: -5 },
			onStart: () => showPopup('Takepic'),
		},
		Sightseeing: {
			duration: 2000,
			effects: { happiness: +15, energy: -5 },
			onStart: () => showPopup('Sightseeing'),
		},
		'Observing Borobudur': {
			duration: 2000,
			effects: { happiness: +15, energy: -5 },
		},
		'Fly a Lanttern': {
			duration: 2000,
			effects: { happiness: +15, energy: -5 },
			onStart: () => showPopup('FlyLantern'),
		},
		'Attend a Ceremony': {
			duration: 2000,
			effects: { happiness: +15, energy: -5 },
		},

		'Rest & Eat Snacks': {
			duration: 2000,
			effects: { hunger: +20, energy: +10, hygiene: -2 },
		},
		'Eat Snacks': {
			duration: 2000,
			effects: { hunger: +20, energy: +10, hygiene: -2 },
		},
		'Eat Seafood': {
			duration: 3000,
			effects: { hunger: +25, energy: +15, happiness: +5 },
		},

		'Buy Fishing Rod': {
			duration: 1000,
			effects: { happiness: +10 },
			cost: 150,
			onStart: () => showPopup('BuyFishingRod'),
			cost: 150,
			unlock: 'Fishing Rod',
		},
		'Become Cashier': {
			duration: 2000,
			effects: { happiness: +10, energy: -3 },
			earnings: 1000,
			onStart: () => showPopup('BecomeCashier'),
		},

		'Write Travel Journal': { duration: 2000, effects: { happiness: +10 } },
		'Hiking Journaling': {
			duration: 2000,
			effects: { happiness: +10 },
			onStart: () => showPopup('Journal'),
		},

		'Buy Bucket': {
			duration: 1000,
			effects: { happiness: +10, energy: -3 },
			cost: 100,
			unlock: 'Bucket',
			onStart: () => showPopup('BuyBucket'),
		},
		'Buy Bait': {
			duration: 1000,
			effects: { happiness: +10, energy: -3 },
			cost: 50,
			unlock: 'Bait',
			onStart: () => showPopup('BuyBait'),
		},
		'Buy Sandcastle Bucket': {
			duration: 1000,
			effects: { happiness: +10, energy: -3 },
			cost: 120,
			unlock: 'Sand Bucket',
			onStart: () => showPopup('Sandcastle'),
		},
		'Buy Sandals': {
			duration: 1000,
			effects: { happiness: +10, energy: -3 },
			cost: 200,
			onStart: () => showPopup('Sandal'),
			unlock: 'Sandal',
		},
		'Talk to Fellow Campers': {
			duration: 2000,
			effects: { happiness: +15, energy: -3 },
		},

		'Buy Souvenir': {
			duration: 1000,
			effects: { happiness: +10, energy: -2 },
			cost: 80,
		},
		'Buy Magnifying Glass': {
			duration: 1000,
			effects: { happiness: +15, energy: -5 },
			cost: 250,
			unlock: 'Magnifying Glass',
		},
		'Buy Journal': {
			duration: 1000,
			effects: { happiness: +15, energy: -5 },
			cost: 180,
			unlock: 'Journal',
		},
		'Buy Drink': {
			duration: 1000,
			effects: { happiness: +10, energy: -5 },
			cost: 50,
		},
		'Buy Binoculars': {
			duration: 1000,
			effects: { happiness: +15, energy: -5 },
			cost: 350,
			onStart: () => showPopup('BuyBinoculars'),
			unlock: 'Binoculars',
		},

		Hiking: {
			duration: 3000,
			effects: { energy: -20, happiness: +15, hunger: -10 },
		},
		Fishing: {
			duration: 3000,
			effects: { hunger: -10, happiness: +15, energy: -5 },
			onStart: () => showPopup('Fishing'),
		},
		'Rent a Boat': {
			duration: 3000,
			effects: { happiness: +20, energy: -10 },
			onStart: () => showPopup('Rentboat'),
		},
		'Become a Tour Guide': {
			duration: 3000,
			effects: { happiness: +25, energy: -15 },
			earnings: 5000,
			onStart: () => showPopup('TourGuide'),
		},

		'Collect Firewood': {
			duration: 2000,
			effects: { energy: -15 },
			onStart: () => showPopup('Wood'),
			unlock: 'Wood',
		},
		'Build a Campfire': {
			duration: 2000,
			effects: { energy: -15, happiness: +10 },
		},
		'Set Up Tent': { duration: 2000, effects: { energy: -10, hygiene: -3 } },

		'Cook Food': {
			duration: 3000,
			effects: { hunger: +30, energy: -5 },
			onStart: () => showPopup('Cook'),
		},
		'Observe Nature': {
			duration: 2000,
			effects: { happiness: +20, energy: -5, hygiene: +5 },
		},
		'Learn Coral Ecosystem': {
			duration: 2000,
			effects: { happiness: +20, energy: -5, hygiene: +5 },
			onStart: () => showPopup('ObserveCoral'),
		},
		'Observe Small Marine Life': {
			duration: 2000,
			effects: { happiness: +20, energy: -5, hygiene: +5 },
			onStart: () => showPopup('Crab'),
		},

		'Gather Spring Water': {
			duration: 2000,
			effects: { hygiene: +15, energy: -3 },
		},
		Tanning: {
			duration: 2000,
			effects: { happiness: +10, hygiene: -5 },
			onStart: () => showPopup('Tanning'),
		},
		'Build Sandcastles': {
			duration: 2000,
			effects: { happiness: +12, energy: -5 },
			onStart: () => showPopup('BuildSandcastle'),
		},
		'Seashell Hunt': {
			duration: 2000,
			effects: { happiness: +15, energy: -7 },
			onStart: () => showPopup('Seashell'),
		},
		'Visit Museum': { duration: 2000, effects: { happiness: +8, energy: -5 } },

		'Buy Fauna Book': {
			duration: 2000,
			effects: { happiness: +8, energy: -5 },
			unlock: 'Fauna Book',
		},

		Eat: {
			duration: 3000,
			effects: { hunger: +30, energy: +10, hygiene: -5 },
			onStart: () => showPopup('Eat'),
		},
		Sleep: {
			duration: 4000,
			effects: { energy: +50, hygiene: -10, happiness: +10 },
			onStart: () => showPopup('sleep'),
		},
		Bath: {
			duration: 2000,
			effects: { hygiene: +30 },
			onStart: () => showPopup('bath'),
		},
	};

	useEffect(() => {
		const interval = setInterval(() => {
			setPlayerStatus((prevStatus) =>
				prevStatus.map((stat) => {
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

	const [deathPopup, setDeathPopup] = useState({ show: false, message: '' });
	const [isDead, setIsDead] = useState(false);

	useEffect(() => {
		if (initialDifficulty && initialHearts) {
			setDifficulty(initialDifficulty);
			setHearts(initialHearts);
		}
	}, [initialDifficulty, initialHearts]);

	useEffect(() => {
		console.log('Checking death:', playerStatus, hearts);
		if (!difficulty || isDead) return;

		const dead = playerStatus.some((stat) => stat.value === 0);
		if (!dead) return;

		setIsDead(true);

		if (hearts > 1) {
			const newHearts = hearts - 1;
			setHearts(newHearts);
			setDeathPopup({
				show: true,
				message: `You died!     ❤️ Remaining hearts: ${newHearts}`,
			});
			setTimeout(() => {
				setPlayerStatus(defaultPlayerStatus);
				setIsDead(false);
			}, 2000);
		} else {
			setDeathPopup({
				show: true,
				message: 'You died!    💀 No more hearts left.      Game Over!',
			});
			setTimeout(() => {
				const score = calculateLifeSatisfactionScore({
					stats: playerStatus,
					activities: activityLog,
					items: unlockedItems,
					areas: visitedMaps,
				});

				navigate('/dead', { state: { score } });
			}, 2000);
		}
	}, [playerStatus, hearts, difficulty, isDead, navigate]);

	const startTimedActivity = (activity) => {
		if (activityInProgress) return;

		if (activity.cost && money < activity.cost) {
			showActionPopup('Not enough money!');
			return;
		}

		const duration = activity.duration;
		const steps = 10;
		const intervalTime = duration / steps;
		const deltaPerStep = {};

		if (activity.onStart) {
			activity.onStart();
		}

		Object.entries(activity.effects).forEach(([stat, totalDelta]) => {
			deltaPerStep[stat] = totalDelta / steps;
		});

		let stepCount = 0;
		setCurrentActivity(activity);
		setActivityInProgress(true);

		if (activity.cost) {
			setMoney((prev) => prev - activity.cost);
			showActionPopup(`Purchased for ${rupiah(activity.cost)}`);
		}

		const intervalId = setInterval(() => {
			Object.entries(deltaPerStep).forEach(([key, delta]) => {
				updateStats(key, delta);
			});

			stepCount++;

			if (stepCount >= steps) {
				clearInterval(intervalId);
				activityInterval.current = null;
				setActivityInProgress(false);
				setCurrentActivity(null);

				if (activity.earnings) {
					setMoney((prev) => prev + activity.earnings);
					showActionPopup(`Earned ${rupiah(activity.earnings)}!`);
				}
			}
		}, intervalTime);

		activityInterval.current = intervalId;
	};

	const fastForward = () => {
		if (!currentActivity) return;

		if (activityInterval.current) {
			clearInterval(activityInterval.current);
			activityInterval.current = null;
		}

		setPopup({
			show: false,
			type: '',
			message: '',
			additionalMessage: '',
			image: '',
		});
		setActionPopup({ show: false, message: '' });

		Object.entries(currentActivity.effects).forEach(([key, delta]) => {
			updateStats(key, delta);
		});

		setActivityInProgress(false);
		setCurrentActivity(null);
	};

	const calculateLifeSatisfactionScore = ({ stats, activities, items, areas }) => {
		let score = 0;
		const statTotal = stats.reduce((sum, stat) => sum + stat.value, 0);
		score += (statTotal / 400) * 40;
		const activityCount = activities.length;
		const uniqueActivities = new Set(activities).size;
		score += Math.min(activityCount * 1, 30);
		score += Math.min(uniqueActivities * 2, 20);
		const uniqueItems = new Set(items).size;
		score += Math.min(uniqueItems * 2, 20);
		const areaCount = new Set(areas).size;
		score += Math.min(areaCount * 5, 20);
		return Math.round(score);
	};

	const performActions = (action) => {
		const label = typeof action === 'string' ? action : action.label;
		const timedAction = timedActions[label];

		if (timedAction) {
			if (timedAction.unlock) {
				unlockItem(timedAction.unlock);
			}
			setActivityLog((prev) => [...prev, label]);
			startTimedActivity({ ...timedAction, label });
		}
	};

	//Movement
	const [isShaking, setIsShaking] = useState(false);
	const triggerShake = () => {
		if (isShaking) return;
		setIsShaking(true);
		setTimeout(() => setIsShaking(false), 300);
	};

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
	};
	const actionRequirements = {
		Fishing: ['Fishing Rod', 'Bait', 'Bucket'],
		'Take a Picture': 'Camera',
		'Capture the Moment': 'Camera',
		'Hiking Journaling': 'Journal',
		Hiking: 'Shoe',
		'Observe Nature': 'Binocular',
		'Set Up Tent': ['Tent', 'Peg', 'Rope'],
		'Build A Campfire': ['Wood', 'Matches'],
		'Learn Coral Ecosystem': 'Fauna Book',
		'Observe Small Marine Life': 'Magnifying Glass',
		Tanning: 'Chair',
		'Build Sandcastles': 'Sand Bucket',
		'Rest & Eat Snacks': 'Snack',
		'Seashell Hunt': 'Gloves',
	};

	const filteredActionData = actionData.filter((action) => {
		const label = action.label || action;
		const requiredItem = actionRequirements[label];
		if (!requiredItem) return true;
		if (Array.isArray(requiredItem)) {
			return requiredItem.every((item) => unlockedItems.includes(item));
		}
		return unlockedItems.includes(requiredItem);
	});

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
	const clampY = maxY + 60;

	const mapImages = {
		default: '/images/background/GameDefaultMap.png',
		lake: '/images/background/GameLakeMap.jpg',
		beach: '/images/background/GameBeach.gif',
		mountain: '/images/background/GameMountainMap.jpeg',
		temple: '/images/background/GameTempleMap.jpg',
	};

	if (width >= 1440) {
		if (playerPosition.x > minScrollX) {
			offsetX = Math.max(0, Math.min(playerPosition.x - vwWidth / 2, maxScrollX));
		} else {
			offsetX = 840;
		}

		if (playerPosition.y > minScrollY) {
			offsetY = Math.max(0, Math.min(playerPosition.y - vwHeight / 2, maxScrollY));
		} else {
			offsetY = 500;
		}
	} else if (width >= 1024) {
		if (playerPosition.x > minScrollX) {
			offsetX = Math.max(0, Math.min(playerPosition.x - vwWidth / 2, maxScrollX));
		} else {
			offsetX = 840;
		}

		if (playerPosition.y > minScrollY) {
			offsetY = Math.max(0, Math.min(playerPosition.y - vwHeight / 2, maxScrollY));
		} else {
			offsetY = 500;
		}
	} else if (width >= 768) {
		if (playerPosition.x > minScrollX) {
			offsetX = Math.max(0, Math.min(playerPosition.x - vwWidth / 2, maxScrollX));
		} else {
			offsetX = 840;
		}

		if (playerPosition.y > minScrollY) {
			offsetY = Math.max(0, Math.min(playerPosition.y - vwHeight / 2, maxScrollY));
		} else {
			offsetY = 500;
		}
	} else if (width >= 425) {
		if (playerPosition.x > minScrollX) {
			offsetX = Math.max(0, Math.min(playerPosition.x - vwWidth / 2, maxScrollX));
		} else {
			offsetX = 2500;
		}

		if (playerPosition.y > minScrollY) {
			offsetY = Math.max(0, Math.min(playerPosition.y - vwHeight / 2, maxScrollY));
		} else {
			offsetY = 1500;
		}
	} else if (width >= 375) {
		if (playerPosition.x > minScrollX) {
			offsetX = Math.max(0, Math.min(playerPosition.x - vwWidth / 2, maxScrollX));
		} else {
			offsetX = 2500;
		}

		if (playerPosition.y > minScrollY) {
			offsetY = Math.max(0, Math.min(playerPosition.y - vwHeight / 2, maxScrollY));
		} else {
			offsetY = 1500;
		}
	} else {
		if (playerPosition.x > minScrollX) {
			offsetX = Math.max(0, Math.min(playerPosition.x - vwWidth / 2, maxScrollX));
		} else {
			offsetX = 2500;
		}

		if (playerPosition.y > minScrollY) {
			offsetY = Math.max(0, Math.min(playerPosition.y - vwHeight / 2, maxScrollY));
		} else {
			offsetY = 1500;
		}
	}

	useEffect(() => {
		const storedName = localStorage.getItem('playerName');
		const storedBase = localStorage.getItem('PlayerImageBase');

		console.log('Loaded from localStorage → name:', storedName, 'base:', storedBase);

		if (!storedName || !storedBase) {
			alert('Missing character or name — redirecting to character selection');
			navigate('/');
			return;
		}

		setPlayer({
			name: storedName.trim(),
			base: storedBase,
			direction: 'right',
		});
	}, []);

	function movePlayer(direction) {
		setPlayer((prev) => ({
			...prev,
			direction,
		}));

		setPlayerPosition((prev) => {
			let { x, y } = prev;
			const step = 20;
			let newX = x;
			let newY = y;

			if (direction === 'right') newX += step;
			if (direction === 'left') newX -= step;
			if (direction === 'up') newY -= step;
			if (direction === 'down') newY += step;

			const clampedX = Math.max(minX, Math.min(newX, maxX));
			const clampedY = Math.max(minY, Math.min(newY, clampY));

			if (clampedX !== newX || clampedY !== newY) {
				triggerShake();
			}

			return { x: clampedX, y: clampedY };
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

				setMaxX(4670);
				setMaxY(2700);

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
				playerPosition.x >= 1330 &&
				playerPosition.x <= 1480 &&
				playerPosition.y >= 2340 &&
				playerPosition.y <= 2550
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
				playerPosition.y >= 260 &&
				playerPosition.y <= 300
			) {
				setActions(['Eat', 'Sleep', 'Bath']);
				setLocationText('Welcome Home');
			} else if (
				playerPosition.x >= 2460 &&
				playerPosition.x <= 2660 &&
				playerPosition.y >= 570 &&
				playerPosition.y <= 620
			) {
				setActions(['Buy Bucket', 'Buy Fishing Rod', 'Buy Bait']);
				setLocationText('Welcome to Bites Shop');
			} else if (playerPosition.x === 3220 && playerPosition.y === 1500) {
				setActions(['Rent a Boat', 'Become a Tour Guide', 'Buy Binoculars']);
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
				setLocationText('Welcome to Lake Toba');
			}
		} else if (currentMap === 'mountain') {
			if (Math.sqrt((playerPosition.x - 2460) ** 2 + (playerPosition.y - 80) ** 2) < 80) {
				setActions([
					'Enjoy the View',
					'Capture the Moment',
					'Rest & Eat Snacks',
					'Hiking Journaling',
				]);
				setLocationText('You are at the Mountain Peak');
			} else if (Math.sqrt((playerPosition.x - 2460) ** 2 + (playerPosition.y - 1800) ** 2) < 120) {
				setActions(['Hiking', 'Observe Nature', 'Collect Firewood', 'Gather Spring Water']);
				setLocationText('You are on the Mountain Slope');
			} else if (Math.sqrt((playerPosition.x - 3860) ** 2 + (playerPosition.y - 2480) ** 2) < 120) {
				setActions(['Set Up Tent', 'Cook Food', 'Build a Campfire', 'Talk to Fellow Campers']);
				setLocationText('You are at the Campground');
			} else {
				setActions([]);
				setLocationText('Welcome to the Mountain');
			}
		} else if (currentMap === 'temple') {
			if (
				playerPosition.x >= 1820 &&
				playerPosition.x <= 1940 &&
				playerPosition.y >= 2180 &&
				playerPosition.y <= 2220
			) {
				setActions(['Buy Magnifying Glass', 'Buy Journal', 'Buy Drink']);
				setLocationText(['You are near a shop']);
			} else if (playerPosition.x >= 3940 && playerPosition.x <= 4220 && playerPosition.y === 940) {
				setActions(['Visit Museum', 'Buy Fauna Book']);
				setLocationText(['You are at the temple']);
			} else if (
				playerPosition.x >= 2140 &&
				playerPosition.x <= 2340 &&
				playerPosition.y >= 880 &&
				playerPosition.y <= 920
			) {
				setActions(['Meditate', 'Observing Borobudur', 'Fly a Lanttern', 'Attend a Ceremony']);
			} else {
				setActions([]);
				setLocationText('Welcome to the Borobudur Temple');
			}
		} else if (currentMap === 'beach') {
			if (playerPosition.x >= 1299 && playerPosition.x <= 1380 && playerPosition.y === 1100) {
				setActions(['Buy Sandcastle Bucket', 'Become Cashier', 'Buy Sandals']);
				setLocationText(['You are near a Seaside Shop']);
			} else if (
				playerPosition.x >= 2619 &&
				playerPosition.x <= 4659 &&
				playerPosition.y === 1540
			) {
				setActions(['Take Picture', 'Learn Coral Ecosystem', 'Observe Small Marine Life']);
				setLocationText(['You are at the Beach']);
			} else if (
				playerPosition.x >= 4059 &&
				playerPosition.x <= 4139 &&
				playerPosition.y <= 2020 &&
				playerPosition.y >= 1860
			) {
				setActions(['Tanning', 'Build Sandcastles', 'Seashell Hunt', 'Sightseeing']);
			} else {
				setActions([]);
				setLocationText('Welcome to Kuta Beach');
			}
		}
	}, [playerPosition, currentMap]);

	return (
		<div
			id="bodyBackground"
			className="relative w-screen h-screen px-2 py-2 md:py-4 md:px-4 lg:py-8 lg:px-8 overflow-hidden"
		>
			<GameWelcomePopup
				player={player}
				showWelcomePopup={showWelcomePopup}
				closePopUp={closePopUp}
			/>

			{actionPopup.show && (
				<div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-white text-black px-4 py-2 rounded-lg shadow-lg z-50 animate-fade">
					{actionPopup.message}
				</div>
			)}

			<GameTitleBar
				formattedDate={formattedDate}
				unlockedItems={unlockedItems}
				unlockItem={unlockItem}
			/>

			<GameStatusBar status={playerStatus} />

			<div className="w-9/10 h-13/18 lg:h-14/18 mx-auto grid grid-rows-4 md:grid-cols-4 gap-2">
				<div
					className={`row-span-3 md:row-span-4 md:col-span-3 game-wrapper ${
						isShaking ? 'shake' : ''
					}`}
				>
					<div className="w-fit h-fit m-2 p-2 text-[6px] md:text-[10px] rounded-lg fixed bg-white z-10">
						X: {playerPosition.x}, Y: {playerPosition.y}
					</div>

					<div className="w-fit h-fit m-2 mt-12 p-2 text-[6px] md:text-[10px] rounded-lg fixed bg-white z-10 flex items-center gap-1">
						<img src="/images/symbol/money.png" alt="Coin" className="w-3 h-3 md:w-4 md:h-4" />
						{rupiah}
					</div>

					<div className="m-2 mt-68 p-2 rounded-lg fixed grid grid-cols-3 grid-rows-3 z-10">
						<div className="col-span-3 flex justify-center items-center ">
							<button
								onMouseDown={() => startMoving('up')}
								onMouseUp={stopMoving}
								onMouseLeave={stopMoving}
								onTouchStart={() => startMoving('up')}
								onTouchEnd={stopMoving}
							>
								<img className="w-4 md:w-6 lg:w-8	" src="/images/symbol/top.png" />
							</button>
						</div>

						<div className="flex justify-center items-center -rotate-90">
							<button
								onMouseDown={() => startMoving('left')}
								onMouseUp={stopMoving}
								onMouseLeave={stopMoving}
								onTouchStart={() => startMoving('left')}
								onTouchEnd={stopMoving}
							>
								<img className="w-4 md:w-6 lg:w-8" src="/images/symbol/top.png" />
							</button>
						</div>

						<div></div>

						<div className="flex justify-center items-center rotate-90">
							<button
								onMouseDown={() => startMoving('right')}
								onMouseUp={stopMoving}
								onMouseLeave={stopMoving}
								onTouchStart={() => startMoving('right')}
								onTouchEnd={stopMoving}
							>
								<img className="w-4 md:w-6 lg:w-8" src="/images/symbol/top.png" />
							</button>
						</div>

						<div className="col-span-3 flex justify-center items-center rotate-180">
							<button
								onMouseDown={() => startMoving('down')}
								onMouseUp={stopMoving}
								onMouseLeave={stopMoving}
								onTouchStart={() => startMoving('down')}
								onTouchEnd={stopMoving}
							>
								<img className="w-4 md:w-6 lg:w-8" src="/images/symbol/top.png" />
							</button>
						</div>
					</div>

					<div className="w-full h-full rounded-lg relative overflow-hidden">
						<div
							id="map"
							className="z-5 absolute scale-y-50 scale-x-50 md:scale-y-75 md:scale-x-75"
							style={{
								width: `${mapWidth}px`,
								height: `${mapHeight}px`,
								backgroundImage: `url(${mapImages[currentMap]})`,
								transform: `translate(${-offsetX}px, ${-offsetY}px)`,
								transition: 'transform 0.1s ease-out',
							}}
						>
							<div
								className="text-center"
								style={{
									width: playerSize,
									left: playerPosition.x,
									top: playerPosition.y,
									position: 'fixed',
									objectFit: 'cover',
									opacity: imageLoaded ? 1 : 0,
									transform: imageLoaded ? 'scale(1) translateY(0)' : 'scale(0.5) translateY(1rem)',
									transition: 'opacity 0.7s ease-out, transform 0.7s ease-out, left 0.1s, top 0.1s',
								}}
							>
								<p>{player.name}</p>
								<img
									className="self-center"
									src={`/images/characters/${player.base}_${player.direction}.png`}
									alt="player"
								/>
							</div>
						</div>
					</div>
				</div>

				<GameSideBar
					currentMap={currentMap}
					locationText={locationText}
					formattedTime={formattedTime}
					greeting={greeting}
					actionData={filteredActionData}
					setCurrentMap={setCurrentMap}
					setPlayerPosition={setPlayerPosition}
					setActions={setActions}
					setLocationText={setLocationText}
					performActions={performActions}
					activityInProgress={activityInProgress}
					currentActivity={currentActivity}
					fastForward={fastForward}
				/>
			</div>
			{deathPopup.show && (
				<div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50 backdrop-blur-sm">
					<div className="ml-4 mr-4 bg-white rounded-lg p-6 max-w-xs text-center shadow-lg">
						<p className="text-lg font-semibold mb-2">{deathPopup.message}</p>
						{hearts > 0 && (
							<button
								onClick={() => setDeathPopup({ show: false, message: '' })}
								className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
							>
								Continue
							</button>
						)}
					</div>
				</div>
			)}

			<GamePopup
				show={popup.show}
				imageSrc={popup.image}
				message={popup.message}
				additionalMessage={popup.additionalMessage}
			/>
		</div>
	);
}

export default Game;
