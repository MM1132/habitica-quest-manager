import { HttpMethod, doHabiticaApiRequest } from '../../http/doApiRequest';
import { HabiticaUser } from './types/habiticaUser';

export const habitica_getUser = (): HabiticaUser => {
  const user = doHabiticaApiRequest<HabiticaUser>(
    'https://habitica.com/api/v4/user',
    {
      method: HttpMethod.GET,
    }
  );

  return {
    id: user.id,
    auth: {
      local: {
        username: user.auth.local.username,
      },
    },
    profile: {
      name: user.profile.name,
    },
    items: {
      quests: user.items.quests,
    },
    party: {
      _id: user.party._id,
    },
  };
};

export const habitica_getUserById = (userId: string) => {
  return doHabiticaApiRequest<HabiticaUser>(
    `https://habitica.com/api/v4/members/${userId}`,
    {
      method: HttpMethod.GET,
    }
  );
};
