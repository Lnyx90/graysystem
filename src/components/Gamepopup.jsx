import React from 'react';

const GamePopup = ({ show, imageSrc, message, additionalMessage }) => {
  if (!show) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center pointer-events-none'>
      <div className='animate-popup bg-white bg-opacity-90 p-4 rounded-lg border-2 border-blue-300 w-3/5 md:w-1/3 text-center pointer-events-auto'>
        {imageSrc && (
          <img
            src={imageSrc}
            alt='Popup'
            className='w-24 md:w-32 lg:w-48 mx-auto mb-2'
          />
        )}
        <p className='text-[10px] md:text-sm lg:text-base font-bold text-blue-600'>
          {message}
        </p>
        {additionalMessage && (
          <p className='text-[10px] md:text-sm lg:text-base text-gray-700 mt-2'>
            {additionalMessage}
          </p>
        )}
      </div>
    </div>
  );
};

export default GamePopup;
