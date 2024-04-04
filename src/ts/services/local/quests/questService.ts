import { QUEST_GENERIC } from './data/generic';
import { QUEST_MASTERCLASSER } from './data/masterclasser';
import { QUEST_PETS } from './data/pets';
import { QUEST_POTIONS } from './data/potions';
import { QUEST_SEASONAL } from './data/seasonal';
import { QUEST_SERIES } from './data/series';
import { QUEST_TIME_TRAVEL } from './data/timeTravel';
import { QUEST_WORLD } from './data/world';
import { LocalQuest, LocalQuestsData } from './types';

const importedQuestList: LocalQuestsData = {
  ...QUEST_GENERIC,
  ...QUEST_MASTERCLASSER,
  ...QUEST_PETS,
  ...QUEST_POTIONS,
  ...QUEST_SEASONAL,
  ...QUEST_SERIES,
  ...QUEST_TIME_TRAVEL,
  ...QUEST_WORLD,
};

export const getLocalQuestByKey = (name: string): LocalQuest => {
  return importedQuestList[name];
};
