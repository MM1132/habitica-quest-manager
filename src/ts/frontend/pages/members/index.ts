import {
  AQM_User,
  getAwesomeQuestManagerUserData,
} from '../../../backend/router/routes/apiUserEndpoint/apiServeUserData';
import { aqm_getUserByLink } from '../../../backend/services/aqm/aqmUserService';
import { props_getAllMembers } from '../../../backend/services/properties/propsMemberService';
import {
  MembersPageMembersSection,
  assembleMembersPageMembersSection,
} from './sections/membersPageMembersSection';
import {
  MembersPageQuestsSection,
  assembleMembersPageQuestSection,
} from './sections/membersPageQuestsSection';

export interface MembersPageData {
  membersSection: MembersPageMembersSection;
  questsSection: MembersPageQuestsSection;
}

export const page_getMembersData = (): MembersPageData => {
  // Get all users we have links for
  const users = props_getAllMembers().map((memberProperty) => {
    try {
      return aqm_getUserByLink(memberProperty.link);
    } catch {
      return {
        id: memberProperty.id,
        profileName: memberProperty.name,
        success: false,
      };
    }
  });

  const membersSection = assembleMembersPageMembersSection(users);

  // Add our own user
  users.push(getAwesomeQuestManagerUserData());

  // Get the quests section only with the users whom request was actually successful
  const questsSection = assembleMembersPageQuestSection(
    users.filter((user) => !('success' in user)) as AQM_User[]
  );

  return {
    membersSection,
    questsSection,
  };
};
