import { HabiticaPartyQuest } from '../../../services/habitica/types/habiticaParty';

export enum QuestStatus {
  INVITATIONS_SENT = 'INVITATIONS_SENT',
  IN_PROGRESS = 'IN_PROGRESS',
}

export const apiAssembleCurrentQuestStatus = (
  partyQuest: HabiticaPartyQuest
): QuestStatus | null => {
  if (!partyQuest.key) {
    return null;
  }
  if (partyQuest.active) {
    return QuestStatus.IN_PROGRESS;
  }
  return QuestStatus.INVITATIONS_SENT;
};
