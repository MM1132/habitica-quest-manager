import { ApiParty, PartyQuest } from '../../services/api/groups/apiParty';
import { getUserDataById } from '../../services/api/members/apiMembersService';
import { ApiUser } from '../../services/api/types/apiUser';
import { getLocalQuestByKey } from '../../services/local/quests/questService';
import { LocalQuest } from '../../services/local/quests/types';
import { getQuestStartThreshold } from '../../services/properties/settingsPropertyService';
import { QuestStatus } from './questTypes';

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
}

export interface QuestLinks {
  invite?: string;
  start?: string;
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
  partyData: ApiParty
): CurrentQuest | null => {
  const status = getQuestStatus(partyData.quest);
  if (!status) {
    return null;
  }

  const localQuestData = getLocalQuestByKey(partyData.quest.key!);

  const ownerProfileName = getUserDataById(partyData.quest.leader!).profile
    .name;

  const memberCount = Object.values(partyData.quest.members).filter(
    (v) => !!v
  ).length;

  const participation = Math.floor((100 / partyData.memberCount) * memberCount);

  return {
    key: partyData.quest.key!,
    status,
    leaderProfileName: ownerProfileName,
    leaderId: partyData.quest.leader!,
    memberCount,
    participation,
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
  const currentQuest = assembleCurrentQuest(party);

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
          invite: `${ScriptApp.getService().getUrl()}/invite?questKey=${questKey}&groupId=${party.id}`,
        }),
        ...(currentQuest?.status === QuestStatus.INVITATIONS_SENT &&
          currentQuest.participation >= getQuestStartThreshold() &&
          user.id === currentQuest.leaderId &&
          currentQuest.key === questKey && {
            start: `${ScriptApp.getService().getUrl()}/start?groupId=${party.id}`,
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
