import { AQM_ENDPOINTS } from '../../../../index';
import {
  HabiticaParty,
  HabiticaPartyQuest,
} from '../../../services/habitica/types/habiticaParty';
import { HabiticaUser } from '../../../services/habitica/types/habiticaUser';
import { PROPS_ConstantData } from '../../../services/properties/propsGlobalDataService';
import { AQM_Settings } from '../../../services/properties/propsSettingsService';
import {
  AQM_QuestStatus,
  apiAssembleCurrentQuestStatus,
} from './apiAssembleCurrentQuest';
import { apiAssembleCurrentQuestParticipation } from './apiAssembleCurrentQuestParticipation';

export enum AQM_QuestAction {
  start = AQM_ENDPOINTS.start,
  invite = AQM_ENDPOINTS.invite,
}

export type AQM_QuestLinks = Record<AQM_QuestAction, string>;

export interface AQM_Quest {
  key: string;
  count: number;
  status: AQM_QuestStatus | null;
  _links: AQM_QuestLinks;
}

// Add quest ID to this function so that is will work for getting the links for any quest we need.
export const apiAssembleAQMQuestLinks = (
  user: HabiticaUser,
  party: HabiticaParty,
  constantData: PROPS_ConstantData,
  settings: AQM_Settings,
  questKey: string
): AQM_QuestLinks => {
  const currentQuestStatus = apiAssembleCurrentQuestStatus(party.quest);

  const _links = {} as AQM_QuestLinks;

  if (!currentQuestStatus) {
    _links[AQM_QuestAction.invite] = constantData.baseUrl;
  } else if (
    currentQuestStatus === AQM_QuestStatus.INVITATIONS_SENT &&
    (user.id === party.quest.leader || user.id === party.leader.id)
  ) {
    const participationData = apiAssembleCurrentQuestParticipation(party);

    if (
      participationData.participationPercentage >= settings.questStartThreshold
    ) {
      if (party.quest.key === questKey) {
        _links[AQM_ENDPOINTS.start] = constantData.baseUrl;
      }
    }
  }

  return _links;
};

export const apiAssembleQuestStatus = (
  partyQuest: HabiticaPartyQuest,
  questKey: string
): AQM_QuestStatus | null => {
  if (!partyQuest.key || partyQuest.key !== questKey) {
    return null;
  }

  if (partyQuest.active) {
    return AQM_QuestStatus.IN_PROGRESS;
  }
  return AQM_QuestStatus.INVITATIONS_SENT;
};

export const apiAssembleAQMQuests = (
  user: HabiticaUser,
  party: HabiticaParty,
  constantData: PROPS_ConstantData,
  settings: AQM_Settings
): AQM_Quest[] => {
  const assembledQuests = Object.entries(user.items.quests)
    .filter(([_, questCount]) => questCount > 0)
    .map(([questKey, questCount]) => {
      const _links = apiAssembleAQMQuestLinks(
        user,
        party,
        constantData,
        settings,
        questKey
      );

      return {
        key: questKey,
        count: questCount,
        status: apiAssembleQuestStatus(party.quest, questKey),
        _links,
      };
    });

  return assembledQuests;
};
