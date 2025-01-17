import { props_getConstantData } from '../../../backend/services/properties/propsGlobalDataService';

export const getQuestQueueLabel = (): string => {
  const { scriptName, scriptVersion } = props_getConstantData();

  return `${scriptName}/${scriptVersion}/questQueue`;
};
