import React from 'react';

const GameMinimap = ({
  isOpen,
  onOpen,
  onClose,
  mapImages,
  currentMap,
  player,
  playerPosition,
  mapWidth,
  mapHeight,
}) => {
  return (
    <>
      <button
        onClick={onOpen}
        className="w-fit h-fit left-[75%] md:left-[62%] lg:left-[63%] xl:left-[66%] rounded-lg fixed z-10 gap-1 p-2 hover:scale-105 transition"
      >
        <img src="/images/symbol/map.png" alt="Map Icon" className="w-15 md:w-18 lg:w-20" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 backdrop-blur-sm flex items-center justify-center">
          <div className="relative rounded-lg p-4 max-w-3xl w-[90%]">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white hover:text-red-600 text-xl z-10"
            >
              &times;
            </button>

            <div className="relative w-full h-auto">
              <img
                src={mapImages[currentMap]}
                alt="Full Map"
                className="w-full h-auto rounded-md object-contain"
              />

              <img
                src={`/images/characters/${player.base}_${player.direction}.png`}
                alt="Player Marker"
                className="absolute w-2 md:w-4 lg:w-5"
                style={{
                  left: `${(playerPosition.x / mapWidth) * 100}%`,
                  top: `${(playerPosition.y / mapHeight) * 100}%`,
                  transform: 'translate(-50%, -50%)',
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GameMinimap;
