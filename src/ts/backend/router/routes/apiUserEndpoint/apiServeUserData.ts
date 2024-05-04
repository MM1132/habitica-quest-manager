import { habitica_getParty } from '../../../services/habitica/habiticaGroupService';
import { habitica_getUser } from '../../../services/habitica/habiticaUserService';
import { HabiticaParty } from '../../../services/habitica/types/habiticaParty';
import { HabiticaUser } from '../../../services/habitica/types/habiticaUser';
import {
  PROPS_ConstantData,
  props_getConstantData,
} from '../../../services/properties/propsGlobalDataService';
import {
  AQM_Settings,
  props_getQuestManagerSettings,
} from '../../../services/properties/propsSettingsService';
import { AQM_Quest, apiAssembleAQMQuests } from './apiAssembleUserQuests';

export interface AQM_User {
  aqmSettings: AQM_Settings;
  aqmGlobalData: PROPS_ConstantData;
  habiticaUser: HabiticaUser;
  habiticaParty: HabiticaParty;
  aqmQuests: AQM_Quest[];
}

export const getAwesomeQuestManagerUserData = (): AQM_User => {
  const aqmSettings = props_getQuestManagerSettings();
  const aqmGlobalData = props_getConstantData();

  const habiticaUser = habitica_getUser();
  const habiticaParty = habitica_getParty();

  const aqmQuests = apiAssembleAQMQuests(
    habiticaUser,
    habiticaParty,
    aqmGlobalData,
    aqmSettings
  );

  return {
    aqmSettings,
    aqmGlobalData,
    habiticaUser,
    habiticaParty,
    aqmQuests,
  };
};

export const apiServeUserData = () => {
  try {
    const returnedObject = {
      success: true,
      data: getAwesomeQuestManagerUserData(),
    };

    return ContentService.createTextOutput(
      JSON.stringify(returnedObject)
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (e: any) {
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, message: e.message })
    ).setMimeType(ContentService.MimeType.JSON);
  }
};
