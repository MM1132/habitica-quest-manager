import { getPartyMembers } from '../../services/api/groups/apiGroupsService';
import { getUserDataById } from '../../services/api/members/apiMembersService';
import { getUser } from '../../services/api/user/apiUserService';

export interface PartyQuest {
  name: string;
  count: number;
}

export interface PartyQuestsData {
  quests: PartyQuest[];
}

export const getPartyQuestsPageData = () => {
  const userData = getUser();
  const partyMembers = getPartyMembers(userData.party._id);

  const memberIds = partyMembers.map(({ id }) => id);

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
