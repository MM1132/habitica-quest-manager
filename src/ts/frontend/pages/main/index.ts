import { habitica_getParty } from '../../../backend/services/habitica/habiticaGroupService';
import {
  habitica_getUser,
  habitica_getUserById,
} from '../../../backend/services/habitica/habiticaUserService';
import { HabiticaUser } from '../../../backend/services/habitica/types/habiticaUser';
import { props_getConstantData } from '../../../backend/services/properties/propsGlobalDataService';
import {
  props_getQuestManagerSettings,
  props_getQuestStartThreshold,
} from '../../../backend/services/properties/propsSettingsService';
import {
  MainPageCurrentQuestSection,
  assembleMainPageCurrentQuestSection,
} from './sections/mainPageCurrentQuestSection';
import {
  MainPageProfileSection,
  assembleMainPageProfileSection,
} from './sections/mainPageProfileSection';
import {
  MainPageQuestsSection,
  assembleMainPageQuestSection,
} from './sections/mainPageQuestsSection';
import { MainPageSettingsSection } from './sections/mainPageSettingsSection';

interface MainPageData {
  profileSection: MainPageProfileSection;
  settingsSection: MainPageSettingsSection;
  currentQuestSection: MainPageCurrentQuestSection | null;
  questsSection: MainPageQuestsSection;
}

export const page_getMainData = (): MainPageData => {
  const user = habitica_getUser();
  const party = habitica_getParty();
  const constants = props_getConstantData();
  const settings = props_getQuestManagerSettings();
  const currentQuestLeaderUser: HabiticaUser | null = party.quest.leader
    ? habitica_getUserById(party.quest.leader)
    : null;

  const currentQuestSection = assembleMainPageCurrentQuestSection(
    user,
    party,
    constants,
    settings,
    currentQuestLeaderUser
  );

  const questsSection = assembleMainPageQuestSection(
    user,
    party,
    constants,
    settings
  );

  return {
    profileSection: assembleMainPageProfileSection(user, party),
    settingsSection: { questStartThreshold: props_getQuestStartThreshold() },
    currentQuestSection,
    questsSection,
  };
};
