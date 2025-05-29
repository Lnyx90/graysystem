import React from "react";

function GameInventory() {
  return (
  <div className="relative flex justify-center gap-2 sm:gap-4 -mt-40 md:gap-6 -mt-10 sm:-mt-12 md:-mt-16 z-10">
  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/30 border border-black shadow-md flex items-center justify-center">
    <img src="" alt="Item 1" className="w-4 h-4 sm:w-6 sm:h-6" />
  </div>
  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/30 border border-black shadow-md flex items-center justify-center">
    <img src="" alt="Item 2" className="w-6 h-6 sm:w-8 sm:h-8" />
  </div>
  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/30 border border-black shadow-md flex items-center justify-center">
    <img src="" alt="Item 3" className="w-4 h-4 sm:w-6 sm:h-6" />
  </div>
</div>

  );
}

export default GameInventory;