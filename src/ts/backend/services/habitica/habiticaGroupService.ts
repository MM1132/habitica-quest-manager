import { HttpMethod, doHabiticaApiRequest } from '../../http/doApiRequest';
import { HabiticaParty } from './types/habiticaParty';
import { HabiticaUser } from './types/habiticaUser';

export const habitica_getParty = () => {
  return doHabiticaApiRequest<HabiticaParty>(
    'https://habitica.com/api/v4/groups/party',
    {
      method: HttpMethod.GET,
    }
  );
};

export const habitica_getPartyMembers = (groupId: string) => {
  return doHabiticaApiRequest<HabiticaUser[]>(
    `https://habitica.com/api/v4/groups/${groupId}/members?includeAllPublicFields=true`,
    {
      method: HttpMethod.GET,
    }
  );
};

export const habitica_invite = (groupId: string, questKey: string) => {
  return doHabiticaApiRequest<any>(
    `https://habitica.com/api/v4/groups/${groupId}/quests/invite/${questKey}`,
    {
      method: HttpMethod.POST,
    }
  );
};

export const habitica_forceStart = (qroupId: string) => {
  return doHabiticaApiRequest<any>(
    `https://habitica.com/api/v4/groups/${qroupId}/quests/force-start`,
    {
      method: HttpMethod.POST,
    }
  );
};
