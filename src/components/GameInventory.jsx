import React from "react";

function GameInventory() {
  return (
  <div className="relative flex justify-center gap-2 lg:gap-6 lg:-mt-20 lg:mr-78 md:gap-4 md:-mt-20 md:mr-50 sm: mb-100 z-10">
  <div className="w-20 h-20 sm:w-8 sm:h-8 bg-white/30 border border-black shadow-md flex items-center justify-center">
    {/* <img src="" alt="Item 1" className="w-10 h-10 sm:w-6 sm:h-6" /> */}
  </div>
  <div className="w-20 h-20 sm:w-8 sm:h-8 bg-white/30 border border-black shadow-md flex items-center justify-center">
    {/* <img src="" alt="Item 2" className="w-10 h-10 sm:w-8 sm:h-8" /> */}
  </div>
  <div className="w-20 h-20 sm:w-8 sm:h-8 bg-white/30 border border-black shadow-md flex items-center justify-center">
    {/* <img src="" alt="Item 3" className="w-10 h-10 sm:w-6 sm:h-6" /> */}
  </div>
</div>

  );
}

export default GameInventory;