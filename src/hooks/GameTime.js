import { useEffect, useState } from 'react';

export default function useGameTime(timeSpeedMultiplier = 10) {
  const [gameTime, setGameTime] = useState(new Date());
  const [greeting, setGreeting] = useState('');
  const [formattedDate, setFormattedDate] = useState('');
  const [formattedTime, setFormattedTime] = useState('');

  useEffect(() => {
    const realStartTime = performance.now();
    const gameStartTime = new Date();

    const updateClock = () => {
      const now = performance.now();
      const elapsedReal = now - realStartTime;
      const elapsedGame = elapsedReal * timeSpeedMultiplier;
      const currentGameTime = new Date(gameStartTime.getTime() + elapsedGame);

      setGameTime(currentGameTime);

      const optionsTime = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };

      const optionsDate = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      };

      setFormattedTime(currentGameTime.toLocaleTimeString('en-US', optionsTime));
      setFormattedDate(currentGameTime.toLocaleDateString('en-US', optionsDate));

      const hours = currentGameTime.getHours();
      setGreeting(
        hours < 12
          ? 'Good Morning!'
          : hours < 18
          ? 'Good Afternoon!'
          : 'Good Evening!'
      );

      requestAnimationFrame(updateClock);
    };

    requestAnimationFrame(updateClock);
  }, [timeSpeedMultiplier]);

  return { gameTime, formattedTime, formattedDate, greeting };
}