import { getPartyData } from '../../services/api/groups/apiGroupsService';
import { ApiParty } from '../../services/api/groups/apiParty';
import { ApiUser } from '../../services/api/types/apiUser';
import { getUser } from '../../services/api/user/apiUserService';
import {
  QuestManagerSettings,
  getQuestManagerSettings,
} from '../../services/properties/settingsPropertyService';
import {
  CurrentQuest,
  QuestWithLinks,
  assembleQuestWithLinks,
} from './mainQuestAssembler';

interface MainPageData {
  user: ApiUser;
  party: ApiParty;
  settings: QuestManagerSettings;
  quests: QuestWithLinks[];
  currentQuest: CurrentQuest | null;
}

export const getMainPageData = (): MainPageData => {
  const userData = getUser();
  const partyData = getPartyData();

  const assembledQuests = assembleQuestWithLinks(userData, partyData);

  return {
    user: userData,
    party: partyData,
    settings: getQuestManagerSettings(),
    quests: assembledQuests.quests,
    currentQuest: assembledQuests.currentQuest,
  };
};
