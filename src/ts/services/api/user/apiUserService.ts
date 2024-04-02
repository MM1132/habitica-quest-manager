import { HttpMethod, doApiRequest } from '../../../http/doApiRequest';
import { ApiUser } from '../types/apiUser';

export const getUser = () => {
  return doApiRequest<ApiUser>('https://habitica.com/api/v4/user', {
    method: HttpMethod.GET,
  });
};
