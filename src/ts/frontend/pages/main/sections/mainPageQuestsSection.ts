import {
  AQM_QuestStatus,
  apiAssembleCurrentQuestStatus,
} from '../../../../backend/router/routes/apiUserEndpoint/apiAssembleCurrentQuest';
import {
  AQM_Quest,
  apiAssembleAQMQuests,
} from '../../../../backend/router/routes/apiUserEndpoint/apiAssembleUserQuests';
import { HabiticaParty } from '../../../../backend/services/habitica/types/habiticaParty';
import { HabiticaUser } from '../../../../backend/services/habitica/types/habiticaUser';
import { PROPS_ConstantData } from '../../../../backend/services/properties/propsGlobalDataService';
import { AQM_Settings } from '../../../../backend/services/properties/propsSettingsService';
import { translateQuestByKey } from '../../../quests/questService';
import { TranslatedQuest } from '../../../quests/types';

interface TranslatedAQM_Quest extends AQM_Quest, TranslatedQuest {}

export interface MainPageQuestsSection {
  profileName: string;
  quests: TranslatedAQM_Quest[];
  currentQuestKey: string | null;
  currentQuestStatus: AQM_QuestStatus | null;
}

export const assembleMainPageQuestSection = (
  user: HabiticaUser,
  party: HabiticaParty,
  constants: PROPS_ConstantData,
  settings: AQM_Settings
): MainPageQuestsSection => {
  const quests: (AQM_Quest & TranslatedQuest)[] = apiAssembleAQMQuests(
    user,
    party,
    constants,
    settings
  )
    .map((quest) => {
      const translatedQuest = translateQuestByKey(quest.key);

      return {
        ...quest,
        ...translatedQuest,
      };
    })
    .sort((questA, questB) => {
      const questAValue = questA.drop.exp + questA.drop.gp;
      const questBValue = questB.drop.exp + questB.drop.gp;

      return questBValue - questAValue;
    });

  const currentQuestStatus = apiAssembleCurrentQuestStatus(party.quest);

  return {
    profileName: user.profile.name,
    quests,
    currentQuestKey: party.quest.key,
    currentQuestStatus,
  };
};
