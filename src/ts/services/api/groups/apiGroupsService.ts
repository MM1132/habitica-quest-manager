import { HttpMethod, doApiRequest } from '../../../http/doApiRequest';
import { ApiUser } from '../types/apiUser';
import { ApiParty } from './apiParty';

export const getPartyData = () => {
  return doApiRequest<ApiParty>('https://habitica.com/api/v4/groups/party', {
    method: HttpMethod.GET,
  });
};

export const getPartyMembers = (groupId: string) => {
  return doApiRequest<ApiUser[]>(
    `https://habitica.com/api/v4/groups/${groupId}/members?includeAllPublicFields=true`,
    {
      method: HttpMethod.GET,
    }
  );
};

export const inviteMembersToQuest = (groupId: string, questKey: string) => {
  return doApiRequest<any>(
    `https://habitica.com/api/v4/groups/${groupId}/quests/invite/${questKey}`,
    {
      method: HttpMethod.POST,
    }
  );
};

export const forceStartQuest = (qroupId: string) => {
  return doApiRequest<any>(
    `https://habitica.com/api/v4/groups/${qroupId}/quests/force-start`,
    {
      method: HttpMethod.POST,
    }
  );
};
