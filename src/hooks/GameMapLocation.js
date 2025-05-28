// mapLogic.js

export const getActionData = (actions) => {
	if (!actions || actions.length === 0) {
		return [];
	}

	return actions.map((action, index) => ({
		label: action,
		key: index,
	}));
};

export const goBackToMainMap = (
	setCurrentMap,
	setPosition,
	setActions,
	setLocationText
) => {
	setCurrentMap('default');
	setPosition({ x: 1000, y: 750 });
	setActions([]);
	setLocationText("You're Lost!");
};
