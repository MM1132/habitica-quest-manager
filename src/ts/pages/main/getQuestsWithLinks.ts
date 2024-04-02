import { ApiParty } from '../../services/api/groups/apiParty';
import { ApiUser } from '../../services/api/types/apiUser';
import { Quest, getQuestByName } from '../../services/local/questService';
import { getQuestStartThreshold } from '../../services/properties/settingsPropertyService';
import { QuestStatus } from './questTypes';

export interface QuestWithLinks {
  name: string;
  count: number;
  data: Quest;
  links: {
    invite?: string;
    start?: string;
  };
}

export const getQuestsWithLinks = (
  quests: { [key: string]: number },
  currentQuestStatus: QuestStatus,
  participationPercentage: number,
  userData: ApiUser,
  partyData: ApiParty
): QuestWithLinks[] => {
  const ownedQuestEntries = Object.entries(quests).filter(
    ([_, questCount]) => questCount > 0
  );

  const questsWithLinks: QuestWithLinks[] = ownedQuestEntries.map(
    ([questKey, questCount]) => ({
      name: questKey,
      count: questCount,
      data: getQuestByName(questKey),
      links: {
        ...(currentQuestStatus === QuestStatus.IDLE && {
          invite: `${ScriptApp.getService().getUrl()}/invite?questKey=${questKey}&groupId=${partyData.id}`,
        }),
        ...(currentQuestStatus === QuestStatus.INVITATIONS_SENT &&
          participationPercentage >= getQuestStartThreshold() &&
          userData.id === partyData.quest.leader && {
            start: `${ScriptApp.getService().getUrl()}/start?groupId=${partyData.id}`,
          }),
      },
    })
  );

  const sortedQuestsWithLinks = questsWithLinks.sort((a, b) => {
    const questAValue = a.data.drop.exp + a.data.drop.gp;
    const questBValue = b.data.drop.exp + b.data.drop.gp;

    return questBValue - questAValue;
  });

  return sortedQuestsWithLinks;
};
