const GamePopup = ({ show, imageSrc, message, additionalMessage }) => {
  if (!show) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center pointer-events-none'>
      <div className='animate-popup bg-white bg-opacity-90 p-4 rounded-lg shadow-xl border-2 border-blue-300 max-w-xs text-center pointer-events-auto'>
        {imageSrc && (
          <img
            src={imageSrc}
            alt='Popup'
            className='w-48 h-48 mx-auto mb-2'
          />
        )}
        <p className='text-lg font-bold text-blue-600'>
          {message}
        </p>
        {additionalMessage && (
          <p className='text-sm text-gray-700'>
            {additionalMessage}
          </p>
        )}
      </div>
    </div>
  );
};

export default GamePopup;