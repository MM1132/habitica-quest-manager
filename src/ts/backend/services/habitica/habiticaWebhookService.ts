import { doHabiticaApiRequest, HttpMethod } from '../../http/doApiRequest';
import { HabiticaWebhook } from './types/webhooks/habiticaWebhook';

export const habitica_getWebhooks = (): HabiticaWebhook[] => {
  return doHabiticaApiRequest<HabiticaWebhook[]>(
    `https://habitica.com/api/v3/user/webhook`,
    {
      method: HttpMethod.GET,
    }
  );
};
