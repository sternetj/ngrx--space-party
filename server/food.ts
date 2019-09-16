import events from 'events';

export const emitter = new events.EventEmitter();
import uuid from 'uuid/v4';

const food = [{
  id: uuid(),
  name: 'Nachos',
  description: 'Nachos smothered in cheese and jalepenos!',
  obtained: true,
  count: 1,
  users: [{
    name: 'Sally Smith',
    logo: '//ssl.gstatic.com/docs/common/profile/bat_lg.png'
  }]
}, {
  id: uuid(),
  name: 'Paper Plates',
  description: 'Need something to put all this food on.',
  obtained: false,
  count: 5,
  users: [{
    name: 'Craig Robinson',
    logo: '//ssl.gstatic.com/docs/common/profile/frog_lg.png'
  }, {
    name: 'Adam Scott',
    logo: '//ssl.gstatic.com/docs/common/profile/panda_lg.png'
  }]
}, {
  id: uuid(),
  name: '2-Liters of Soda',
  description: 'Coca-Cola, Sprite, Diet Coke, Dr. Pepper, Barq\'s Root Beer, and Mountain Dew',
  obtained: false,
  count: 6,
  users: [{
    name: 'Chris Kirkpatrick',
    logo: '//ssl.gstatic.com/docs/common/profile/quagga_lg.png'
  }, {
    name: 'Jennifer Johnson',
    logo: '//ssl.gstatic.com/docs/common/profile/kraken_lg.png'
  }, {
    name: 'Margaret Graves',
    logo: '//ssl.gstatic.com/docs/common/profile/dolphin_lg.png'
  }, {
    name: 'Sophie Holder',
    logo: '//ssl.gstatic.com/docs/common/profile/squirrel_lg.png'
  }]
}];

const setObtained = (food) => {
  if (food.count === (food.users || []).length) {
    food.obtained = true;
  }

  return food;
}


export const getAllFood = () => food;

export const getFood = (id: string) => {
  return food.find(f => f.id == id);
};

export const addFood = (req) => {
  const newFood = setObtained(req.body.food);
  newFood.count = Math.min(15, Math.max(1, newFood.count || 1));
  newFood.description = (newFood.description || "").slice(0, 500);
  newFood.name = (newFood.name || "").slice(0, 100);

  food.push({
    ...newFood,
    id: uuid(),
  });

  emitter.emit('food', { food, user: req.body.user });

  return (newFood);
};

export const updateFood = (req) => {

  const currentIndex = food.findIndex(f => f.id == req.body.id);

  if (currentIndex === -1) {
    return;
  }

  food.splice(currentIndex, 1, setObtained(req.body));

  console.log(food)

  emitter.emit('food', food);

  return (food);
};

export const deleteFood = (id: string) => {

  const currentIndex = food.findIndex(f => f.id == id);

  if (currentIndex === -1) {
    return;
  }

  food.splice(currentIndex, 1);

  emitter.emit('food', food);
};
