const fs = require('fs');

const QUEST_GENERIC = require('./quests/generic').QUEST_GENERIC;
const QUEST_MASTERCLASSER = require('./quests/masterclasser').QUEST_MASTERCLASSER;
const QUEST_PETS = require('./quests/pets').QUEST_PETS;
const QUEST_POTIONS = require('./quests/potions').QUEST_POTIONS;
const QUEST_SEASONAL = require('./quests/seasonal').QUEST_SEASONAL;
const QUEST_SERIES = require('./quests/series').QUEST_SERIES;
const QUEST_TIME_TRAVEL = require('./quests/timeTravel').QUEST_TIME_TRAVEL;
const QUEST_WORLD = require('./quests/world').QUEST_WORLD;

const allQuests = {
  ...QUEST_GENERIC,
  ...QUEST_MASTERCLASSER,
  ...QUEST_PETS,
  ...QUEST_POTIONS,
  ...QUEST_SEASONAL,
  ...QUEST_SERIES,
  ...QUEST_TIME_TRAVEL,
  ...QUEST_WORLD,
};

const allQuestsFilteredList = Object.entries(allQuests).map(([key, value]) => {
  console.log(key);

  let drop = {
    gp: value.drop.gp,
    exp: value.drop.exp,
    items: value.drop.items,
  }

  return [
    key,
    {
      key,
      name: value.text,
      drop,
    },
  ];
});
const allQuestsFiltered = Object.fromEntries(allQuestsFilteredList);

// Writing to a file

console.log(allQuestsFiltered);

function objectToJS(obj) {
  const props = Object.keys(obj).map(key => {
    const value = obj[key];
    // Assuming value is either a string or a number for simplicity
    return typeof value === 'string' ? `${key}: "${value}"` : `${key}: ${value}`;
  }).join(', ');
  
  return `{ ${props} }`;
}

// Convert the object to a JavaScript object literal string
const jsContent = `var myObj = ${objectToJS(allQuestsFiltered)};`;

fs.writeFile('myObj.js', jsContent, (err) => {
  if (err) throw err;
  console.log('File has been saved.');
});
