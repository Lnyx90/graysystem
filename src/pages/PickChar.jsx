import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import PickCharAudio from '../hooks/PickCharAudio';
import CharacterSelection from '../components/PickCharCharacterSelection';
import LevelSelection from '../components/PickCharLevelSelection';
import Notification from '../components/PickCharNotification';

import '../styles/PickChar.css';

function PickChar() {
  const characters = ['char1', 'char2', 'char3'];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCharacter, setSelectedCharacter] = useState(characters[0]);
  const [playerName, setPlayerName] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [showLevelSelection, setShowLevelSelection] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const navigate = useNavigate();


  const { bgMusicRef, clickSoundRef, playClickSound } = PickCharAudio();

  useEffect(() => {
    let existingMusic = document.getElementById("bgMusic");

    if (!existingMusic) {
      const newMusic = document.createElement("audio");
      newMusic.id = "bgMusic";
      newMusic.loop = true;
      newMusic.innerHTML = `<source src="images/music/homepage.mp3" type="audio/mpeg">`;

      document.body.appendChild(newMusic);

      let savedTime = parseFloat(localStorage.getItem("musicTime")) || 0;
      newMusic.currentTime = savedTime;

      newMusic.play().catch(err => {
        console.log("Autoplay prevented:", err);
      });

      newMusic.ontimeupdate = () => {
        localStorage.setItem("musicTime", newMusic.currentTime);
      };

      const handleClick = () => {
        if (newMusic.paused) {
          newMusic.play().catch(err => console.log("Manual play failed:", err));
        }
      };
      document.addEventListener("click", handleClick);

      return () => {
        document.removeEventListener("click", handleClick);
        newMusic.pause();
        newMusic.currentTime = 0;
        newMusic.remove();
      };
    }
  }, []);

  const updateCharacter = (newIndex) => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentIndex(newIndex);
      setSelectedCharacter(characters[newIndex]);
      setIsFading(false);
    }, 300);
  };

  const prevCharacter = () => {
    playClickSound();
    const newIndex = (currentIndex - 1 + characters.length) % characters.length;
    updateCharacter(newIndex);
  };

  const nextCharacter = () => {
    playClickSound();
    const newIndex = (currentIndex + 1) % characters.length;
    updateCharacter(newIndex);
  };

  const handleNameChange = (e) => setPlayerName(e.target.value);

  const handleSelectAndNavigate = () => {
    if (!playerName.trim()) {
      playClickSound();
      setNotificationMessage('Please enter your name!');
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 2000);
      return;
    }
    playClickSound();
    setShowLevelSelection(true);
  };

  const handleLevelSelect = (level) => {
    playClickSound();

    localStorage.setItem('PlayerImageBase', selectedCharacter);
    localStorage.setItem('playerName', playerName);
    localStorage.setItem('difficulty', level);

    setNotificationMessage(`Level ${level} selected!`);
    setShowNotification(true);

    setTimeout(() => {
      const existingMusic = document.getElementById("bgMusic");
      if (existingMusic) {
        existingMusic.pause();
        existingMusic.currentTime = 0;
      }

      if (bgMusicRef.current) {
        bgMusicRef.current.pause();
        bgMusicRef.current.currentTime = 0;
      }

      navigate('/game');
    }, 4000); 
  };

  return (
    <div
      className="w-screen h-screen bg-cover bg-center flex items-center justify-center relative"
      style={{
        backgroundImage: "url('/images/background/PickCharBackground.gif')",
      }}
    >
      <audio ref={bgMusicRef} src="/audio/bgm.mp3" loop />
      <audio ref={clickSoundRef} preload='auto'>
				<source src='/images/music/click.mp3' type='audio/mpeg' />
			</audio>

      <div className="flex flex-col items-center text-center px-4 w-full max-w-4xl z-10">
        <h1 className="text-xl sm:text-3xl md:text-5xl text-glow-pickchar text-white leading-tight text-pulse-pickchar mb-6" style={{ fontFamily: "'Press Start 2P', cursive" }}>
          Choose Your <br /> Character
        </h1>

        <CharacterSelection
          characters={characters}
          currentIndex={currentIndex}
          isFading={isFading}
          onPrev={prevCharacter}
          onNext={nextCharacter}
        />

        <input
          type="text"
          value={playerName}
          onChange={handleNameChange}
          placeholder="Enter Your Name"
          className="px-3 sm:px-4 py-2 text-sm sm:text-lg border-2 border-blue-800 rounded-md text-center w-40 sm:w-64 md:w-72 placeholder:text-xs sm:placeholder:text-sm mb-4 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={handleSelectAndNavigate}
          className="px-5 sm:px-8 py-2 sm:py-4 bg-blue-800 text-white text-sm sm:text-xl rounded-full shadow-lg hover:bg-blue-500 transition hover:scale-110"
        >
          Select Character
        </button>

        {showNotification && <Notification message={notificationMessage} />}
      </div>

      {showLevelSelection && (
        <LevelSelection
          onSelect={handleLevelSelect}
          onClose={() => setShowLevelSelection(false)}
        />
      )}
    </div>
  );
}

export default PickChar;
