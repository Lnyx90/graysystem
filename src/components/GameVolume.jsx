import React from 'react';

const GameVolume = () => {
  return (
    <div className="absolute mt-2 left-0 md:left-2 lg:left-2 p-2 rounded-md z-20 w-24 md:w-48 lg:w-48">
      <div className="flex flex-col md:flex-row items-center md:space-x-3 w-full">
        <label
          htmlFor="volumeSlider"
          className="text-xs font-medium text-white hidden md:block"
        >
          Volume
        </label>
        <input
          type="range"
          id="volumeSlider"
          min="0"
          max="1"
          step="0.01"
          defaultValue="0.3"
          className="w-full md:w-auto accent-blue-500 transform rotate-90 md:rotate-0 mr-20 md:mr-0 lg:mr-0"
          style={{ height: '10px', weight: '0px' }}
        />
      </div>
    </div>
  );
};

export default GameVolume;
