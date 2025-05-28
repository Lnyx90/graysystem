import React from "react";

function GameInventory() {
  return (
    <div className="item flex justify-center gap-4 mt-6 z-10">
    <div className="w-10 h-10 bg-white/30 border border-black shadow-md flex items-center justify-center">
        <img src="" alt="Item 1" className="w-6 h-6" />
    </div>
    <div className="w-10 h-40 bg-white/30 border border-black shadow-md flex items-center justify-center">
        <img src="" alt="Item 2" className="w-8 h-8" />
    </div>
    <div className="w-10 h-10 bg-white/30 border border-black shadow-md flex items-center justify-center">
        <img src="" alt="Item 3" className="w-6 h-6" />
    </div>
    </div>
  );
}

export default GameInventory;