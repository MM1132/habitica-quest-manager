import { aqm_forceStartQuestByLink } from '../../backend/services/aqm/aqmQuestService';
import {
  habitica_forceStart,
  habitica_getParty,
} from '../../backend/services/habitica/habiticaGroupService';
import { props_getConstantData } from '../../backend/services/properties/propsGlobalDataService';

export const page_forceStartQuest = (link: string) => {
  const constants = props_getConstantData();

  if (link === constants.baseUrl) {
    const party = habitica_getParty();

    return habitica_forceStart(party.id);
  } else {
    return aqm_forceStartQuestByLink(link);
  }
};
