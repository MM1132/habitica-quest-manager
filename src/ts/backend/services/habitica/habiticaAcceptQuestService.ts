import { doHabiticaApiRequest, HttpMethod } from '../../http/doApiRequest';

export const habiticaAcceptQuest = () => {
  return doHabiticaApiRequest(
    'https://habitica.com/api/v3/groups/party/quests/accept',
    {
      method: HttpMethod.POST,
    }
  );
};
