import { props_removeMember } from '../../backend/services/properties/propsMemberService';

export const page_removeMember = (password: string, memberId: string) => {
  props_removeMember(password, memberId);
};
