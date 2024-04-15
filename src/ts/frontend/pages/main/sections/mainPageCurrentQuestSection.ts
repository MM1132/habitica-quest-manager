import {
  QuestStatus,
  apiAssembleCurrentQuestStatus,
} from '../../../../backend/router/routes/apiUserEndpoint/apiAssembleCurrentQuest';
import { apiAssembleCurrentQuestParticipation } from '../../../../backend/router/routes/apiUserEndpoint/apiAssembleCurrentQuestParticipation';
import {
  AQM_QuestLinks,
  apiAssembleAQMQuestLinks,
} from '../../../../backend/router/routes/apiUserEndpoint/apiAssembleUserQuests';
import { HabiticaParty } from '../../../../backend/services/habitica/types/habiticaParty';
import { HabiticaUser } from '../../../../backend/services/habitica/types/habiticaUser';
import { PROPS_ConstantData } from '../../../../backend/services/properties/propsGlobalDataService';
import { AQM_Settings } from '../../../../backend/services/properties/propsSettingsService';
import { translateQuestByKey } from '../../../quests/questService';
import { TranslatedQuest } from '../../../quests/types';

export interface MainPageCurrentQuestSection extends TranslatedQuest {
  leaderProfileName: string;
  status: QuestStatus;
  participantCount: number;
  participationPercentage: number;
  partyMemberCount: number;
  _links: AQM_QuestLinks;
}

export const assembleMainPageCurrentQuestSection = (
  user: HabiticaUser,
  party: HabiticaParty,
  constants: PROPS_ConstantData,
  settings: AQM_Settings,
  currentQuestLeaderUser: HabiticaUser | null
): MainPageCurrentQuestSection | null => {
  const status = apiAssembleCurrentQuestStatus(party.quest);

  if (!status) {
    return null;
  }

  const questKey = party.quest.key as string;

  const participationData = apiAssembleCurrentQuestParticipation(party);

  const _links = apiAssembleAQMQuestLinks(
    user,
    party,
    constants,
    settings,
    questKey
  );

  const translatedQuest = translateQuestByKey(questKey);

  return {
    leaderProfileName: currentQuestLeaderUser!.profile.name,
    status,
    participantCount: participationData.participantCount,
    participationPercentage: participationData.participationPercentage,
    partyMemberCount: party.memberCount,
    _links,
    ...translatedQuest,
  };
};
