import { ApiParty, PartyQuest } from '../../services/api/groups/apiParty';
import { getUserDataById } from '../../services/api/members/apiMembersService';
import { ApiUser } from '../../services/api/types/apiUser';
import { getLocalQuestByKey } from '../../services/local/quests/questService';
import { LocalQuest } from '../../services/local/quests/types';
import { getQuestStartThreshold } from '../../services/properties/settingsPropertyService';
import { QuestStatus } from './questTypes';

export interface CurrentQuestLinks {
  start?: boolean;
}

export interface QuestLinks {
  invite?: boolean;
  start?: boolean;
}

export interface CustomQuestData {
  key: string;
  count: number;
}

export interface CurrentQuest extends LocalQuest {
  key: string;
  status: QuestStatus;
  leaderProfileName: string;
  leaderId: string;
  memberCount: number;
  participation: number;
  links: CurrentQuestLinks;
}

export interface QuestWithLinks extends LocalQuest, CustomQuestData {
  links: QuestLinks;
}

const getQuestStatus = (partyQuest: PartyQuest): QuestStatus | null => {
  if (!partyQuest.key) {
    return null;
  }
  if (partyQuest.active) {
    return QuestStatus.IN_PROGRESS;
  }
  return QuestStatus.INVITATIONS_SENT;
};

export const assembleCurrentQuest = (
  partyData: ApiParty,
  userId: string
): CurrentQuest | null => {
  const status = getQuestStatus(partyData.quest);
  if (!status) {
    return null;
  }

  const localQuestData = getLocalQuestByKey(partyData.quest.key!);

  const questLeader = getUserDataById(partyData.quest.leader!);

  const memberCount = Object.values(partyData.quest.members).filter(
    (v) => !!v
  ).length;

  const participation = Math.floor((100 / partyData.memberCount) * memberCount);

  const currentQuestLinks: CurrentQuestLinks = {
    ...(status === QuestStatus.INVITATIONS_SENT &&
      participation >= getQuestStartThreshold() &&
      (userId === questLeader.id || userId === partyData.leader.id) && {
        start: true,
      }),
  };

  return {
    key: partyData.quest.key!,
    status,
    leaderProfileName: questLeader.profile.name,
    leaderId: partyData.quest.leader!,
    memberCount,
    participation,
    links: currentQuestLinks,
    ...localQuestData,
  };
};

export interface AssembledQuests {
  quests: QuestWithLinks[];
  currentQuest: CurrentQuest | null;
}

export const assembleQuestWithLinks = (
  user: ApiUser,
  party: ApiParty
): AssembledQuests => {
  const currentQuest = assembleCurrentQuest(party, user.id);

  const questsWithLinks: QuestWithLinks[] = Object.entries(user.items.quests)
    .filter(([_, questCount]) => questCount > 0)
    .map(([questKey, questCount]) => {
      const localQuestData = getLocalQuestByKey(questKey);

      const customData: CustomQuestData = {
        key: questKey,
        count: questCount,
      };

      const links: QuestLinks = {
        ...(!currentQuest && {
          invite: true,
        }),
        ...(currentQuest?.status === QuestStatus.INVITATIONS_SENT &&
          currentQuest.participation >= getQuestStartThreshold() &&
          user.id === currentQuest.leaderId &&
          currentQuest.key === questKey && {
            start: true,
          }),
      };

      return {
        ...localQuestData,
        ...customData,
        links,
      };
    })
    .sort((a, b) => {
      const aValue = a.drop.exp + a.drop.gp;
      const bValue = b.drop.exp + b.drop.gp;

      return bValue - aValue;
    });

  return {
    quests: questsWithLinks,
    currentQuest,
  };
};
