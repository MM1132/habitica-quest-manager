import { Router } from './backend/router/router';
import {
  apiForceStartQuest,
  apiInviteMembersToQuest,
} from './backend/router/routes/apiEndpointHandlers';
import { apiServeUserData } from './backend/router/routes/apiUserEndpoint/apiServeUserData';
import { layoutPageHandler } from './backend/router/routes/endpointHandlers';

// --- DON'T CHANGE, SCRIPT DETAILS ---
export const AUTHOR_ID = '90c987f2-cf51-442f-b932-3c4194d56ad6';
export const SCRIPT_NAME = 'Awesome Quest Manager';
export const SCRIPT_VERSION = 'v1.4 alpha';

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

export const doGet = (e: GoogleAppsScript.Events.DoGet) => router.handleGet(e);

export const doPost = (e: GoogleAppsScript.Events.DoPost) =>
  router.handlePost(e);
