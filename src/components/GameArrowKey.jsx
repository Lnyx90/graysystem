import React from 'react';

const GameArrowKey = ({ startMoving, stopMoving }) => {
  return (
    <div className="m-2 mt-82 md:mt-108 lg:mt-108p-2 rounded-lg fixed grid grid-cols-3 grid-rows-3 z-10">
      <div className="col-span-3 flex justify-center items-center">
        <button
          onMouseDown={() => startMoving('up')}
          onMouseUp={stopMoving}
          onMouseLeave={stopMoving}
          onTouchStart={() => startMoving('up')}
          onTouchEnd={stopMoving}
        >
          <img className="w-4 md:w-6 lg:w-8" src="/images/symbol/top.png" alt="Up" />
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
          <img className="w-4 md:w-6 lg:w-8" src="/images/symbol/top.png" alt="Left" />
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
          <img className="w-4 md:w-6 lg:w-8" src="/images/symbol/top.png" alt="Right" />
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
          <img className="w-4 md:w-6 lg:w-8" src="/images/symbol/top.png" alt="Down" />
        </button>
      </div>
    </div>
  );
};

export default GameArrowKey;
