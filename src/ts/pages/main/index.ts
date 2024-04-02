import { getPartyData } from '../../services/api/groups/apiGroupsService';
import { getUserDataById } from '../../services/api/members/apiMembersService';
import { getUser } from '../../services/api/user/apiUserService';
import { Quest, getQuestByName } from '../../services/local/questService';
import { getAuthenticated } from '../../services/properties/authPropertyService';
import { getQuestStartThreshold } from '../../services/properties/settingsPropertyService';
import {
  PartyLeaderActions,
  getPartyLeaderActions,
} from './getPartyLeaderActions';
import { QuestWithLinks, getQuestsWithLinks } from './getQuestsWithLinks';
import { QuestStatus } from './questTypes';

interface MainDataAuth {
  authenticated: boolean;
  profileName: string;
  username: string;
  quests: QuestWithLinks[];
  currentQuest: {
    name: string | null;
    data: Quest | null;
    ownerProfileName: string | null;
    status: QuestStatus;
    participatingMemberCount: number;
    participationPercentage: number;
    partyLeaderActions: PartyLeaderActions;
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
        data:
          partyData.quest.key !== null
            ? getQuestByName(partyData.quest.key)
            : null,
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
