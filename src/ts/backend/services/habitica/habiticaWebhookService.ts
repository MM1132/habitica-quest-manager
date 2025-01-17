import { doHabiticaApiRequest, HttpMethod } from '../../http/doApiRequest';
import { HabiticaWebhookType } from './types/webhooks/commons';
import { HabiticaWebhook } from './types/webhooks/habiticaWebhook';
import { HabiticaWebhookOptions } from './types/webhooks/habiticaWebhookOptions';

export interface HabiticaSetWebhookRequest {
  url: string;
  label: string;
  type: HabiticaWebhookType;
  options: HabiticaWebhookOptions;
}

export const habitica_getWebhooks = (): HabiticaWebhook[] => {
  return doHabiticaApiRequest<HabiticaWebhook[]>(
    `https://habitica.com/api/v3/user/webhook`,
    {
      method: HttpMethod.GET,
    }
  );
};

export const habitica_setWebhook = (
  data: HabiticaSetWebhookRequest
): HabiticaWebhook => {
  return doHabiticaApiRequest<HabiticaWebhook>(
    'https://habitica.com/api/v3/user/webhook',
    {
      method: HttpMethod.POST,
      payload: data,
    }
  );
};

export const habitica_deleteWebhook = (
  webhookId: string
): HabiticaWebhook[] => {
  return doHabiticaApiRequest(
    `https://habitica.com/api/v3/user/webhook/${webhookId}`,
    {
      method: HttpMethod.DELETE,
    }
  );
};
