import { aqm_getUserByLink } from '../../../backend/services/aqm/aqmUserService';
import { props_getAllMembers } from '../../../backend/services/properties/propsMemberService';
import {
  MembersPageMembersSection,
  assembleMembersPageMembersSection,
} from './sections/membersPageMembersSection';

export interface MembersPageData {
  membersSection: MembersPageMembersSection;
}

export const page_getMembersData = (): MembersPageData => {
  const aqmUsers = props_getAllMembers().map(({ link }) => {
    return aqm_getUserByLink(link);
  });

  const membersSection = assembleMembersPageMembersSection(aqmUsers);

  return {
    membersSection,
  };
};
