import {
  apiInviteMembersToQuest,
  apiServeUserData,
  apiStartQuest,
} from './endpoints/apiEndpointHandlers';
import { layoutPageHandler } from './endpoints/endpointHandlers';
import { Router } from './endpoints/router';

const router = new Router();

// Pages
router.get('', layoutPageHandler);

// API
router.post('api/v1/user', apiServeUserData);
router.post('api/v1/start', apiStartQuest);
router.post('api/v1/invite', apiInviteMembersToQuest);

export function doGet(e: GoogleAppsScript.Events.DoGet) {
  return router.handleGet(e);
}

export function doPost(e: GoogleAppsScript.Events.DoPost) {
  return router.handlePost(e);
}
