import { useEffect, useRef } from 'react';

export default function PickCharAudio() {
  const bgMusicRef = useRef(null);
  const clickSoundRef = useRef(null);

  useEffect(() => {
    const savedTime = localStorage.getItem('music') || 0;

    if (bgMusicRef.current) {
      bgMusicRef.current.currentTime = savedTime;
    }

    return () => {
      if (bgMusicRef.current) {
        localStorage.setItem('music', bgMusicRef.current.currentTime);
      }
    };
  }, []);

  useEffect(() => {
    const unlockAudio = () => {
      if (clickSoundRef.current) {
        clickSoundRef.current
          .play()
          .then(() => {
            clickSoundRef.current.pause();
            clickSoundRef.current.currentTime = 0;
          })
          .catch(() => {});
      }
      document.removeEventListener("click", unlockAudio);
    };

    document.addEventListener("click", unlockAudio);
  }, []);

  const playClickSound = () => {
    if (clickSoundRef.current) {
      clickSoundRef.current.currentTime = 0;
      clickSoundRef.current
        .play()
        .catch((err) => {
          console.warn("Click sound play failed:", err);
        });
    }
  };

  return { bgMusicRef, clickSoundRef, playClickSound };
}
