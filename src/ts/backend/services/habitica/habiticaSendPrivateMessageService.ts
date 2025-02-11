import { doHabiticaApiRequest, HttpMethod } from '../../http/doApiRequest';

export interface HabiticaSendPrivateMessageRequest {
  message: string;
  toUserId: string;
}

export const habitica_sendPrivateMessage = (
  data: HabiticaSendPrivateMessageRequest
) => {
  return doHabiticaApiRequest(
    'https://habitica.com/api/v3/members/send-private-message',
    {
      method: HttpMethod.POST,
      payload: data,
    }
  );
};
