import { HttpMethod, doApiRequest } from '../../../http/doApiRequest';
import { ApiUser } from '../types/apiUser';

export const getUserDataById = (userId: string) => {
  return doApiRequest<ApiUser>(
    `https://habitica.com/api/v4/members/${userId}`,
    {
      method: HttpMethod.GET,
    }
  );
};
