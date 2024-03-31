import { getQuestByName } from '../../quests/questList';
import { getQuestStartThreshold } from '../getProperties';
import { QuestStatus } from '../questType';

export const getQuestsWithLinks = (
  quests: any,
  currentQuestStatus: QuestStatus,
  participationPercentage: any,
  userData: any,
  partyData: any
) => {
  const ownedQuestEntries = Object.entries(quests).filter(
    (questEntry) => (questEntry[1] as number) > 0
  );

  const questsWithLinks = ownedQuestEntries.map((questEntry) => ({
    name: questEntry[0],
    count: questEntry[1],
    data: getQuestByName(questEntry[0]),
    links: {
      ...(currentQuestStatus === QuestStatus.IDLE && {
        invite: `${ScriptApp.getService().getUrl()}/invite?questKey=${questEntry[0]}&groupId=${partyData.id}`,
      }),
      ...(currentQuestStatus === QuestStatus.INVITATIONS_SENT &&
        participationPercentage >= getQuestStartThreshold() &&
        userData.id === partyData.quest.leader && {
          start: `${ScriptApp.getService().getUrl()}/start?groupId=${partyData.id}`,
        }),
    },
  }));

  return questsWithLinks;
};

export const getPartyLeaderActions = (
  userData: any,
  partyData: any,
  currentQuestStatus: QuestStatus,
  participationPercentage: any
) => {
  const partyLeaderActions = {
    ...(currentQuestStatus === QuestStatus.INVITATIONS_SENT &&
      participationPercentage >= getQuestStartThreshold() &&
      partyData.leader.id === userData.id && {
        start: `${ScriptApp.getService().getUrl()}/start?groupId=${partyData.id}`,
      }),
  };

  return partyLeaderActions;
};
