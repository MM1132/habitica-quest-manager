import { getPartyData, getUser, getUserDataById } from '../apiRequests';
import { getAuthenticated, getQuestStartThreshold } from './getProperties';
import { QuestStatus } from './questType';

const getQuestsWithLinks = (
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

const getPartyLeaderActions = (
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

interface MainDataAuth {
  authenticated: boolean;
  profileName: string;
  username: string;
  quests: any;
  currentQuest: {
    name: string;
    ownerProfileName: string;
    status: QuestStatus;
    participatingMemberCount: number;
    participationPercentage: number;
    partyLeaderActions: any;
  };
  party: {
    name: string;
    memberCount: number;
  };
  settings: {
    questStartThreshold: number;
  };
}

interface MainDataNoAuth {
  authenticated: boolean;
  message: string;
}

export const getMainPageData = (): MainDataAuth | MainDataNoAuth => {
  try {
    const userData = getUser();

    const partyData = getPartyData();
    const questOwnerProfileName = !partyData.quest.leader
      ? null
      : getUserDataById(partyData.quest.leader).profile.name;

    const participatingMemberCount = Object.values(
      partyData.quest.members
    ).filter((v) => !!v).length;
    const participationPercentage = Math.floor(
      (100 / partyData.memberCount) * participatingMemberCount
    );

    const currentQuestStatus = (() => {
      if (!partyData.quest.key) {
        return QuestStatus.IDLE;
      }
      if (partyData.quest.active) {
        return QuestStatus.IN_PROGRESS;
      }
      return QuestStatus.INVITATIONS_SENT;
    })();

    const quests = getQuestsWithLinks(
      userData.items.quests,
      currentQuestStatus,
      participationPercentage,
      userData,
      partyData
    );

    const partyLeaderActions = getPartyLeaderActions(
      userData,
      partyData,
      currentQuestStatus,
      participationPercentage
    );

    const dataForTemplate = {
      authenticated: getAuthenticated(),
      profileName: userData.profile.name,
      username: userData.auth.local.username,
      quests,
      currentQuest: {
        name: partyData.quest.key,
        ownerProfileName: questOwnerProfileName,
        status: currentQuestStatus,
        participatingMemberCount,
        participationPercentage,
        partyLeaderActions,
      },
      party: {
        name: partyData.name,
        memberCount: partyData.memberCount,
      },
      settings: {
        questStartThreshold: getQuestStartThreshold(),
      },
    };

    return dataForTemplate;
  } catch (e: any) {
    return {
      authenticated: getAuthenticated(),
      message: `Error: ${e.message}`,
    };
  }
};
