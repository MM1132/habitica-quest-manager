import {
  QuestStatus,
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
  currentQuestStatus: QuestStatus | null;
}

export const assembleMainPageQuestSection = (
  user: HabiticaUser,
  party: HabiticaParty,
  constants: PROPS_ConstantData,
  settings: AQM_Settings
): MainPageQuestsSection => {
  const quests = apiAssembleAQMQuests(user, party, constants, settings).map(
    (quest) => {
      const translatedQuest = translateQuestByKey(quest.key);

      return {
        ...quest,
        ...translatedQuest,
      };
    }
  );

  const currentQuestStatus = apiAssembleCurrentQuestStatus(party.quest);

  return {
    profileName: user.profile.name,
    quests,
    currentQuestKey: party.quest.key,
    currentQuestStatus,
  };
};
