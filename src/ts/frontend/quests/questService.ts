import { QUEST_GENERIC } from './data/generic';
import { QUEST_MASTERCLASSER } from './data/masterclasser';
import { QUEST_PETS } from './data/pets';
import { QUEST_POTIONS } from './data/potions';
import { QUEST_SEASONAL } from './data/seasonal';
import { QUEST_SERIES } from './data/series';
import { QUEST_TIME_TRAVEL } from './data/timeTravel';
import { QUEST_WORLD } from './data/world';
import { TranslatedQuest, TranslatedQuestsData } from './types';

const translatedQuests: TranslatedQuestsData = {
  ...QUEST_GENERIC,
  ...QUEST_MASTERCLASSER,
  ...QUEST_PETS,
  ...QUEST_POTIONS,
  ...QUEST_SEASONAL,
  ...QUEST_SERIES,
  ...QUEST_TIME_TRAVEL,
  ...QUEST_WORLD,
};

export const translateQuestByKey = (name: string): TranslatedQuest => {
  const translatedQuest = translatedQuests[name];

  if (!translatedQuest) {
    return {
      text: `${name} (missing translation)`,
      drop: {
        gp: 0,
        exp: 0,
        items: [],
      },
    };
  }

  return {
    text: translatedQuest.text,
    drop: {
      gp: translatedQuest.drop.gp,
      exp: translatedQuest.drop.exp,
      items: translatedQuest.drop.items || [],
    },
  };
};
