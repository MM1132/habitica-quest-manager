import { getPartyData } from '../../services/api/groups/apiGroupsService';
import { getUserDataById } from '../../services/api/members/apiMembersService';

export interface PartyQuest {
  name: string;
  count: number;
}

export interface PartyQuestsData {
  quests: PartyQuest[];
}

export const getPartyQuestsPageData = () => {
  const {
    quest: { members },
  } = getPartyData();

  const memberIds = Object.keys(members);

  const memberDetailsList = memberIds.map((memberId) =>
    getUserDataById(memberId)
  );

  const quests: Record<string, number> = {};
  memberDetailsList.forEach(({ items: { quests: memberQuests } }) => {
    Object.entries(memberQuests).forEach(([questKey, questCount]) => {
      if (questCount === 0) return;

      if (quests[questKey]) {
        quests[questKey] += questCount;
      } else {
        quests[questKey] = questCount;
      }
    });
  });

  const questsList = Object.entries(quests).map(([name, count]) => ({
    name,
    count,
  }));

  return {
    quests: questsList,
  };
};
