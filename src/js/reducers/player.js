const config = require('../config.json');

const player = (state = config.default.player1.marker, action) => {
    switch (action.type) {
        case 'ADD_MOVE':
            return (state === config.default.player1.marker) ? config.default.player2.marker : config.default.player1.marker;
        case 'RESET':
            return config.default.player1.marker;
        default:
            return state;
    }
};

export default player;