import { contentJsonString } from './en/content';
import { questsContentJsonString } from './en/questsContent';

const translations = {
  ...JSON.parse(questsContentJsonString),
  ...JSON.parse(contentJsonString),
};

export const t = (key: string, _parameters?: any): string => {
  return translations[key] || key;
};
