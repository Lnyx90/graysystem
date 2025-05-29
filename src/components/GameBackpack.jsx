import React, { useState } from "react";
import "../styles/Game.css";

const items = [
  { name: "Food", image: "/images/items/bahanmakanan.png" },
  { name: "Drink", image: "/images/items/botol.png" },
  { name: "Phone", image: "/images/items/hp.png" },
];

function GameBackpack() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0); 

  const scrollLeft = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : items.length - 1));
  };

  const scrollRight = () => {
    setCurrentIndex((prev) => (prev < items.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="relative inline-block">
      <button onClick={() => setIsOpen(true)}>
        <img src="images/items/backpack.png" className="w-6 md:w-12 lg:w-15" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-2 sm:p-4 md:p-6 rounded-xl shadow-xl w-[40vw] sm:w-[40vw] md:w-[28vw] lg:w-[25vw] ">
            <h2 className="text-[10px] md:text-sm lg:text-base font-bold mb-4 text-center text-black">
              Your Inventory
            </h2>

            <div className="flex items-center justify-between">
              <button
                onClick={scrollLeft}
                className="w-1/12 text-gray-500 hover:text-black"
              >
                ◀
              </button>

              <div className="px-1 flex justify-center items-center w-full">
                <div className="flex-shrink-0 w-10/12 text-center bg-gray-100 rounded-xl p-3 transition-all duration-300 ease-in-out">
                  <img
                    src={items[currentIndex].image}
                    alt={items[currentIndex].name}
                    className="w-14 sm:w-16 md:w-20 h-auto mx-auto mb-1"
                  />
                  <span className="text-[3vw] sm:text-[2vw] md:text-[1.3vw] text-black">
                    {items[currentIndex].name}
                  </span>
                </div>
              </div>

              <button
                onClick={scrollRight}
                className="w-1/12 text-gray-500 hover:text-black"
              >
                ▶
              </button>
            </div>

            <div className="mt-4 text-center">
              <button
                onClick={() => setIsOpen(false)}
                className="text-[10px] md:text-sm lg:text-base px-4 py-2 text-white bg-blue-500 hover:bg-blue-700 rounded-lg text-sm sm:text-base"
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