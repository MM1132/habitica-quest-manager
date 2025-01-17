import { HabiticaPartyQuest } from '../../../services/habitica/types/habiticaParty';

export enum AQM_QuestStatus {
  INVITATIONS_SENT = 'INVITATIONS_SENT',
  IN_PROGRESS = 'IN_PROGRESS',
}

export const apiAssembleCurrentQuestStatus = (
  partyQuest: HabiticaPartyQuest
): AQM_QuestStatus | null => {
  if (!partyQuest.key) {
    return null;
  }

  if (partyQuest.active) {
    return AQM_QuestStatus.IN_PROGRESS;
  }
  return AQM_QuestStatus.INVITATIONS_SENT;
};
