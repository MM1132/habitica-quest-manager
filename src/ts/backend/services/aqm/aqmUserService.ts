import { HttpMethod, doRequest } from '../../http/doApiRequest';
import { AQM_User } from '../../router/routes/apiUserEndpoint/apiServeUserData';

export const aqm_getUserByLink = (link: string) => {
  const userResponse = doRequest<AQM_User>(link, {
    method: HttpMethod.POST,
    payload: {
      path: 'api/v1/user',
    },
  });

  return userResponse;
};
