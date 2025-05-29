const Status = {
player: [
  { id: 'hunger', value: 50, color: 'bg-red-500' },
  { id: 'energy', value: 50, color: 'bg-yellow-300' },
  { id: 'hygiene', value: 50, color: 'bg-blue-400' },
  { id: 'happiness', value: 50, color: 'bg-pink-400' },
],

	performAction: function(action) {
	switch (action) {
	
    case 'Enjoy the View':
    case 'Capture the Moment':
    case 'Take a Picture':
    case 'Sightseeing':
    case 'Observing Borobudur':
    case 'Fly a Lantern':
    case 'Attend a Ceremony':
      updateStat('happiness', +15);
      updateStat('energy', -5); 
      break;

 
    case 'Rest & Eat Snacks':
    case 'Eat Snacks':
      updateStat('hunger', -20);
      updateStat('energy', +10);
      updateStat('hygiene', -2); 
      break;

    case 'Eat Seafood':
      updateStat('hunger', -25);
      updateStat('energy', +15);
      updateStat('happiness', +5);
      break;

    case 'Drink Coffee':
      updateStat('energy', +25);
      updateStat('hunger', -5);
      break;

    case 'Drink Tropical Juice':
      updateStat('energy', +20);
      updateStat('hygiene', +2); 
      break;


    case 'Write Travel Journal':
    case 'Hiking Journaling':
      updateStat('happiness', +10);
      break;

    case 'Chit Chat':
    case 'Talk to Fellow Campers':
      updateStat('happiness', +15);
      updateStat('energy', -3);
      break;

    case 'Buy Souvenir':
      updateStat('happiness', +10);
      updateStat('energy', -2);
      break;

    case 'Rent a Traditional Outfit':
      updateStat('happiness', +15);
      updateStat('energy', -5);
      break;


    case 'Hiking':
      updateStat('energy', -20);
      updateStat('happiness', +15);
      updateStat('hunger', +10); 
      break;

    case 'Fishing':
      updateStat('hunger', -15);
      updateStat('happiness', +10);
      updateStat('energy', -10);
      break;

    case 'Collect Firewood':
      updateStat('energy', -15);
      break;

    case 'Build Campfire':
    case 'Build a Campfire':
      updateStat('energy', -15);
      updateStat('happiness', +10); 
      break;

    case 'Set Up Tent':
      updateStat('energy', -10);
      updateStat('hygiene', -3); 
      break;

    case 'Cook Food':
      updateStat('hunger', -30);
      updateStat('energy', -5);
      break;

    
    case 'Observe Nature':
    case 'Learn Coral Ecosystem':
    case 'Observe Small Marine Life':
      updateStat('happiness', +20);
      updateStat('energy', -5);
      updateStat('hygiene', +5);
      break;

    case 'Gather Spring Water':
      updateStat('hygiene', +15);
      updateStat('energy', -3);
      break;

  
    case 'Tanning':
      updateStat('happiness', +10);
      updateStat('hygiene', -5);
      break;

    case 'Build Sandcastles':
      updateStat('happiness', +12);
      updateStat('energy', -5);
      break;

    case 'Seashell Hunt':
      updateStat('happiness', +15);
      updateStat('energy', -7);
      break;

    case 'Visit Museum':
      updateStat('happiness', +8);
      updateStat('energy', -5);
      break;

    default:
      break;
  }
}

};

export default Status;
