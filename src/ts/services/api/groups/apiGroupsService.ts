import { HttpMethod, doApiRequest } from '../../../http/doApiRequest';
import { ApiParty } from './apiParty';

export const getPartyData = () => {
  return doApiRequest<ApiParty>('https://habitica.com/api/v4/groups/party', {
    method: HttpMethod.GET,
  });
};

export const inviteMembersToQuest = (groupId: string, questKey: string) => {
  return doApiRequest(
    `https://habitica.com/api/v4/groups/${groupId}/quests/invite/${questKey}`,
    {
      method: HttpMethod.POST,
    }
  );
};

export const forceStartQuest = (qroupId: string) => {
  return doApiRequest(
    `https://habitica.com/api/v4/groups/${qroupId}/quests/force-start`,
    {
      method: HttpMethod.POST,
    }
  );
};
