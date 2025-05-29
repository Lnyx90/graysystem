import React, { useState } from 'react';
import '../styles/Game.css';

const items = [
	{ name: 'Food', image: '/images/items/bahanmakanan.png' },
	{ name: 'Bottle', image: '/images/items/botol.png' },
	{ name: 'Phone', image: '/images/items/hp.png' },
	{ name: 'Binocular', image: '/images/items/binokular.png' },
	{ name: 'Fauna Book', image: '/images/items/bukuhewan.png' },
	{ name: 'Journal', image: '/images/items/bukutulis.png' },
	{ name: 'Towel', image: '/images/items/handuk.png' },
	{ name: 'Magnifying Glass', image: '/images/items/kacapembesar.png' },
	{ name: 'Camera', image: '/images/items/kamera.png' },
	{ name: 'Wood', image: '/images/items/kayubakar.png' },
	{ name: 'Stove', image: '/images/items/kompor.png' },
	{ name: 'Matches', image: '/images/items/korek.png' },
	{ name: 'Chair', image: '/images/items/kursisantai.png' },
	{ name: 'Snack', image: '/images/items/makanan.png' },
	{ name: 'Drink', image: '/images/items/minum.png' },
	{ name: 'Fishing Rod', image: '/images/items/pancing.png' },
	{ name: 'Peg', image: '/images/items/pasak.png' },
	{ name: 'Knife', image: '/images/items/pisau.png' },
	{ name: 'Sandal', image: '/images/items/sandal.png' },
	{ name: 'SandBucket', image: '/images/items/sandcastle.png' },
	{ name: 'Gloves', image: '/images/items/sarungtangan.png' },
	{ name: 'Scroll', image: '/images/items/scroll.png' },
	{ name: 'Shoes', image: '/images/items/sepatuhiking.png' },
	{ name: 'Rope', image: '/images/items/tali.png' },
	{ name: 'Tent', image: '/images/items/tenda.png' },
	{ name: 'Bait', image: '/images/items/umpan.png' },
	{ name: 'Bucket', image: '/images/items/wadah.png' },
];

function GameBackpack({ unlockedItems }) {
	const [isOpen, setIsOpen] = useState(false);
	const [currentIndex, setCurrentIndex] = useState(0);

	const scrollLeft = () => {
		setCurrentIndex((prev) => (prev > 0 ? prev - 1 : items.length - 1));
	};

	const scrollRight = () => {
		setCurrentIndex((prev) => (prev < items.length - 1 ? prev + 1 : 0));
	};

	const currentItem = items[currentIndex];
	const isUnlocked = unlockedItems.includes(currentItem.name);
	

	return (
		<div className='relative inline-block'>
			<button onClick={() => setIsOpen(true)}>
				<img src='images/items/backpack.png' className='w-6 md:w-12 lg:w-15' />
			</button>

			{isOpen && (
				<div className='fixed inset-0 flex items-center justify-center z-50'>
					<div className='bg-white p-2 sm:p-4 md:p-6 rounded-xl shadow-xl w-[40vw] sm:w-[40vw] md:w-[28vw] lg:w-[25vw]'>
						<h2 className='text-[10px] md:text-sm lg:text-base font-bold mb-4 text-center text-black'>
							Your Inventory
						</h2>

						<div className='flex items-center justify-between'>
							<button
								onClick={scrollLeft}
								className='w-1/12 text-gray-500 hover:text-black'
							>
								◀
							</button>

							<div className='px-1 flex justify-center items-center w-full'>
								<div
									className={`flex-shrink-0 w-10/12 text-center bg-gray-100 rounded-xl p-3 transition-all duration-300 ease-in-out ${
										isUnlocked ? '' : 'opacity-40'
									}`}
								>
									<img
										src={currentItem.image}
										alt={currentItem.name}
										className='w-14 sm:w-16 md:w-20 h-auto mx-auto mb-1'
									/>
									<span className='text-[3vw] sm:text-[2vw] md:text-[1.3vw] text-black'>
										{currentItem.name}
									</span>
									{!isUnlocked && (
										<div className='text-[2vw] sm:text-[1.5vw] text-red-500 mt-1'>
											Locked
										</div>
									)}
								</div>
							</div>

							<button
								onClick={scrollRight}
								className='w-1/12 text-gray-500 hover:text-black'
							>
								▶
							</button>
						</div>

						<div className='mt-4 text-center'>
							<button
								onClick={() => setIsOpen(false)}
								className='text-[10px] md:text-sm lg:text-base px-4 py-2 text-white bg-blue-500 hover:bg-blue-700 rounded-lg'
							>
								Close
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default GameBackpack;
