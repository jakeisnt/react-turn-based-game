/** This is where the user describes the game! */
/* eslint-disable */

/* stdlib: helper functions for working with the game! */
// Make a copy of an object or array so you don't mutate it!
const deepcopy = (obj) => JSON.parse(JSON.stringify(obj));

// the definition of the game.
const game = {
  /* Specifies the initial state for the game and each player. */
  initialState: {
    game: () => 0,
    player: () => {
      clickedLast: false;
    },
  },

  /* Specifies the different actions that players can take during the game. */
  actions: {
    // With an action, the user can:
    "+1": (gameState, players, playerId, payload) => ({
      // change the game state,
      gameState: gameState + 1,
      // the player state,
      playerState: players.map(({ id, ...player }) => ({
        ...player,
        id,
        state: { clickedLast: id === playerId },
      })),
      // and determine whether to pass the turn after the action is taken.
      passTurn: true,
      // They aren't required to provide any of these parameters,
      // as if they are not defined they just won't be used.
    }),
    "-1": (gameState, players, playerId, payload) => ({
      // The payload argument contains all of the data passed with the call.
      // Currently, `payload.data` contains all of the arguments passed to the function 'takeAction',
        // so this should be good enough to pass any arbitrary data. I'd recommend the following:
        // function call from client: takeAction("+1", { userId: 123 })
        // retrieve userId here: payload.data[1].userId (0 is going to be the "+1")
        // you could also call takeAction("+1", userId) and you would have the id at payload.data[1],
        // but that may be a bit more difficult to keep track of.
      gameState: gameState + 1,
      // Currently, anything you get from the state object should be
      // provided when returning.
      // If you mess with the playerId, things will get scary.
      playerState: players.map(({ id, ...player }) => ({
        ...player,
        id,
        state: { clickedLast: id === playerId },
      })),
      passTurn: true,
      // Please don't mutate things, either... that wouldn't be very nice.
    }),
  },

  /* Determines when the game ends. */
  endWhen: (gameState, playerStates) => gameState === 10,
  /* Determines the winner(s) at the end of the game. */
  getWinners: (gameState, players) =>
    players.filter(({ state }) => state.clickedLast),
};

export default game;
