

import React from 'react';

function GameSideBar(props) {

  const {
    currentMap,
    locationText,
    formattedTime,
    greeting,
    actionData,
    setCurrentMap,
    setPlayerPosition,
    setActions,
    setLocationText,
    performActions,
    activityInProgress,
    currentActivity,
    fastForward
  } = props;

  function handleBackToMainMap() {
    setCurrentMap('default');
    setPlayerPosition({ x: 2500, y: 1500 });
    setActions([]);
    setLocationText("You're Lost!");
  }

  return (
    <div className="md:row-span-4 p-1 text-center rounded-lg bg-white">
      <div className="grid grid-cols-2 gap-4 md:space-y-0 md:flex md:flex-col flex-wrap md:gap-y-2">
        <div className="flex flex-col gap-1 md:gap-2 lg:gap-3">
          <div className="text-[6px] md:text-sm lg:text-base">
            {currentMap === 'default' ? "You're Lost!" : locationText}
          </div>

          <div className="flex items-center justify-center">
            <img
              src="/images/symbol/time.png"
              className="w-6 md:w-8"
              alt="Time Icon"
            />
            <span className="text-[6px] md:text-[10px] lg:text-[15px]">
              {formattedTime}
            </span>
          </div>

          <span className="text-[6px] md:text-sm lg:text-base">{greeting}</span>

          {currentMap !== 'default' && (
            <div>
              <button
                onClick={handleBackToMainMap}
                className="h-fit w-fit p-2 text-white text-[7px] md:text-sm lg:text-base rounded-lg bg-red-500 hover:bg-red-700"
              >
                Back
              </button>
            </div>
          )}
        </div>

        {currentMap === 'home' && (
          <button
            onClick={() => {
              setCurrentMap('lake');
              setPlayerPosition({ x: 1050, y: 200 });
              setActions([]);
              setLocationText('Welcome to Lake Toba');
            }}
            className="w-full mt-2 bg-green-500 hover:bg-green-700 text-white rounded-lg py-2 text-xs sm:text-sm"
          >
            Back to Lake Map
          </button>
        )}

        <div className="flex flex-col gap-2">
          {actionData.length === 0 ? (
            <div className="text-gray-600 text-[6px] md:text-sm lg:text-base">
              No actions available here
            </div>
          ) : (
            actionData.map((action) => (
              <div key={action.id} className="flex justify-between items-center">
                <button
                  onClick={() => performActions(action.label || action)}
                  className="h-fit w-9/10 p-1 mx-auto text-white text-[7px] md:text-xs lg:text-base rounded-lg bg-blue-500 hover:bg-blue-700"
                >
                  {action.label}
                </button>
              </div>
            ))
          )}

       
          {activityInProgress && (
            <div className="text-center mt-2">
              <div className="text-xs md:text-sm font-semibold mb-1 animate-pulse">
                Doing: {currentActivity?.label}
              </div>
              <button
                onClick={fastForward}
                className="px-3 py-1 text-xs bg-red-500 hover:bg-red-700 text-white rounded-md"
              >
                Fast Forward
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default GameSideBar;
