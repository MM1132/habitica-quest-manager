import { aqm_inviteMembersToQuestByLink } from '../../backend/services/aqm/aqmQuestService';
import { habitica_invite } from '../../backend/services/habitica/habiticaGroupService';
import { habitica_getUser } from '../../backend/services/habitica/habiticaUserService';
import { props_getConstantData } from '../../backend/services/properties/propsGlobalDataService';

export const page_inviteMembersToQuest = (link: string, questKey: string) => {
  const constants = props_getConstantData();

  if (link === constants.baseUrl) {
    const user = habitica_getUser();

    return habitica_invite(user.party._id, questKey);
  } else {
    return aqm_inviteMembersToQuestByLink(link, questKey);
  }
};
