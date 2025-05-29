export default function CharacterSelection({ characters, currentIndex, isFading, onPrev, onNext }) {
  return (
    <div className="flex items-center space-x-4 sm:space-x-6 mb-6">
      <button
        onClick={onPrev}
        className="px-3 sm:px-6 py-2 sm:py-3 bg-blue-800 text-white text-sm sm:text-lg rounded-full shadow-lg hover:bg-blue-600 transition hover:scale-110"
      >
        ❮
      </button>

      <img
        src={`/images/characters/${characters[currentIndex]}_right.png`}
        alt="Character"
        className={`w-24 sm:w-32 md:w-40 h-auto floating character-float ${
          isFading ? 'opacity-0 transition-opacity duration-300' : 'opacity-100'
        }`}
      />

      <button
        onClick={onNext}
        className="px-3 sm:px-6 py-2 sm:py-3 bg-blue-800 text-white text-sm sm:text-lg rounded-full shadow-lg hover:bg-blue-600 transition hover:scale-110"
      >
        ❯
      </button>
    </div>
  );
}
