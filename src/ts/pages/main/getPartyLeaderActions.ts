import { ApiParty } from '../../services/api/groups/apiParty';
import { ApiUser } from '../../services/api/types/apiUser';
import { getQuestStartThreshold } from '../../services/properties/settingsPropertyService';
import { QuestStatus } from './questTypes';

export interface PartyLeaderActions {
  start?: string;
}

export const getPartyLeaderActions = (
  userData: ApiUser,
  partyData: ApiParty,
  currentQuestStatus: QuestStatus,
  participationPercentage: number
): PartyLeaderActions => {
  const partyLeaderActions = {
    ...(currentQuestStatus === QuestStatus.INVITATIONS_SENT &&
      participationPercentage >= getQuestStartThreshold() &&
      partyData.leader.id === userData.id && {
        start: `${ScriptApp.getService().getUrl()}/start?groupId=${partyData.id}`,
      }),
  };

  return partyLeaderActions;
};
