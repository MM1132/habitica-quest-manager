import { HttpMethod, doApiRequest } from '../../../http/doApiRequest';
import { ApiUser } from '../types/apiUser';

export const getUser = (): ApiUser => {
  const user = doApiRequest<ApiUser>('https://habitica.com/api/v4/user', {
    method: HttpMethod.GET,
  });

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
