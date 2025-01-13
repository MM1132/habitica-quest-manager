import { HttpMethod, doHabiticaApiRequest } from '../../http/doApiRequest';
import { HabiticaParty } from './types/habiticaParty';
import { HabiticaUser } from './types/habiticaUser';

export const habitica_getParty = (groupId: string) => {
  return doHabiticaApiRequest<HabiticaParty>(
    `https://habitica.com/api/v3/groups/${groupId}`,
    {
      method: HttpMethod.GET,
    }
  );
};

export const habitica_getPartyMembers = (groupId: string) => {
  return doHabiticaApiRequest<HabiticaUser[]>(
    `https://habitica.com/api/v3/groups/${groupId}/members?includeAllPublicFields=true`,
    {
      method: HttpMethod.GET,
    }
  );
};

export const habitica_invite = (groupId: string, questKey: string) => {
  return doHabiticaApiRequest<any>(
    `https://habitica.com/api/v3/groups/${groupId}/quests/invite/${questKey}`,
    {
      method: HttpMethod.POST,
    }
  );
};

export const habitica_forceStart = (qroupId: string) => {
  return doHabiticaApiRequest<any>(
    `https://habitica.com/api/v3/groups/${qroupId}/quests/force-start`,
    {
      method: HttpMethod.POST,
    }
  );
};
