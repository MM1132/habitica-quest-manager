import { Router } from './backend/router/router';
import {
  apiForceStartQuest,
  apiInviteMembersToQuest,
} from './backend/router/routes/apiEndpointHandlers';
import { apiServeUserData } from './backend/router/routes/apiUserEndpoint/apiServeUserData';
import { apiHandleWebhooks } from './backend/router/routes/apiWebhookEndpoints/apiWebhookEndpoints';
import { layoutPageHandler } from './backend/router/routes/endpointHandlers';

export enum AQM_ENDPOINTS {
  user = 'api/v1/user',
  start = 'api/v1/start',
  invite = 'api/v1/invite',
}

const router = new Router();

// Pages
router.get('', layoutPageHandler);

// API
router.post(AQM_ENDPOINTS.user, apiServeUserData);
router.post(AQM_ENDPOINTS.start, apiForceStartQuest);
router.post(AQM_ENDPOINTS.invite, apiInviteMembersToQuest);
router.post('', apiHandleWebhooks);

export const doGet = (e: GoogleAppsScript.Events.DoGet) => router.handleGet(e);

export const doPost = (e: GoogleAppsScript.Events.DoPost) =>
  router.handlePost(e);
