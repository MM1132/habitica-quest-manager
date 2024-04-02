import {
  forceStartQuest,
  inviteMembersToQuest,
} from '../services/api/groups/apiGroupsService';
import { authGuard, backToMainPage } from './endpointUtils';

export const getMainHandler = () => {
  return authGuard(() => {
    return HtmlService.createTemplateFromFile('pages/main')
      .evaluate()
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  });
};

export const getStartHandler = (e: GoogleAppsScript.Events.DoGet) => {
  forceStartQuest(e.parameter.groupId);

  return backToMainPage(
    'The system sent out a signal to force the start of the current quest...'
  );
};

export const getInviteHandler = (e: GoogleAppsScript.Events.DoGet) => {
  const { groupId, questKey } = e.parameter;

  inviteMembersToQuest(groupId, questKey);

  return backToMainPage(
    `The system sent out a signal to invite all group members to the quest '${questKey}'...`
  );
};

export const getTestHandler = () => {
  const email = Session.getActiveUser().getEmail();
  return backToMainPage(`Here is your email: ${email}`);
};

export const getSettingsHandler = () => {
  return authGuard(() => {
    return HtmlService.createTemplateFromFile('pages/settings')
      .evaluate()
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  });
};

export const getPartyQuestsHandler = () => {
  return authGuard(() => {
    return HtmlService.createTemplateFromFile('pages/partyQuests')
      .evaluate()
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  });
};
