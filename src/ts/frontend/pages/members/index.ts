import { getAwesomeQuestManagerUserData } from '../../../backend/router/routes/apiUserEndpoint/apiServeUserData';
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
  const aqmUsers = props_getAllMembers().map(({ link }) => {
    return aqm_getUserByLink(link);
  });

  const membersSection = assembleMembersPageMembersSection(aqmUsers);

  aqmUsers.push(getAwesomeQuestManagerUserData());
  const questsSection = assembleMembersPageQuestSection(aqmUsers);

  return {
    membersSection,
    questsSection,
  };
};
