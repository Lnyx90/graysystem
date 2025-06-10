import React from 'react';

const GameDeathPopup = ({ deathPopup, setDeathPopup, hearts, playClickSound }) => {
  if (!deathPopup.show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50 backdrop-blur-sm">
      <div className="ml-4 mr-4 bg-white rounded-lg p-6 max-w-xs text-center shadow-lg">
        <p
          className="text-base font-semibold mb-2"
          dangerouslySetInnerHTML={{ __html: deathPopup.message }}
        ></p>

        {hearts > 0 && (
          <button
            onClick={() => {
              if (playClickSound) playClickSound();
              setDeathPopup({ show: false, message: '' });
            }}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Continue
          </button>
        )}
      </div>
    </div>
  );
};

export default GameDeathPopup;
