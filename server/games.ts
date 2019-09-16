import events from 'events';

export const emitter = new events.EventEmitter();
import uuid from 'uuid/v4';

const games = [];

export const getAllGames = () => games;

export const getGame = (id) => {

  return games.find(f => f.id == id);
};

export const createGame = (req) => {
  var newGame = req.body;
  newGame.description = (newGame.description || "").slice(0, 500);
  newGame.name = (newGame.name || "").slice(0, 100);

  games.push({
    ...newGame,
    id: uuid(),
  });

  emitter.emit('game', games);

  return newGame;
};