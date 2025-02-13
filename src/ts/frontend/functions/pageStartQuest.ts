import { aqm_forceStartQuestByLink } from '../../backend/services/aqm/aqmQuestService';
import { habitica_forceStart } from '../../backend/services/habitica/habiticaGroupService';
import { habitica_getUser } from '../../backend/services/habitica/habiticaUserService';
import { props_getConstantData } from '../../backend/services/properties/propsGlobalDataService';

export const page_forceStartQuest = (link: string) => {
  const constants = props_getConstantData();

  if (link === constants.baseUrl) {
    const user = habitica_getUser();

    return habitica_forceStart(user.party._id);
  } else {
    return aqm_forceStartQuestByLink(link);
  }
};
