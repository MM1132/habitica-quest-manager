import { AQM_ENDPOINTS } from '../../../index';
import { HttpMethod, doRequest } from '../../http/doApiRequest';

export const aqm_forceStartQuestByLink = (link: string) => {
  const response = doRequest(link, {
    method: HttpMethod.POST,
    payload: {
      path: AQM_ENDPOINTS.start,
    },
  });

  return response;
};

export const aqm_inviteMembersToQuestByLink = (
  link: string,
  questKey: string
) => {
  const response = doRequest(link, {
    method: HttpMethod.POST,
    payload: {
      path: AQM_ENDPOINTS.invite,
      questKey,
    },
  });

  return response;
};
