import { forceStartQuest, inviteMembersToQuest } from './apiRequests';
import { getAuthenticated } from './data/getProperties';

function backToMainPage(message: string) {
  return HtmlService.createHtmlOutput(`
    <p>${message}</p>
    <a href="${ScriptApp.getService().getUrl()}">Click here to return to the main page</a>
  `);
}

function authGuard(endpoint: () => any) {
  const authenticated = getAuthenticated();

  if (!authenticated) {
    return HtmlService.createTemplateFromFile('pages/setup')
      .evaluate()
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  }

  return endpoint();
}

export function doGet(e: GoogleAppsScript.Events.DoGet) {
  switch (e.pathInfo) {
    /* ACTIONS */
    case 'start': {
      forceStartQuest(e.parameter.groupId);

      return backToMainPage(
        'The system sent out a signal to force the start of the current quest...'
      );
    }
    case 'invite': {
      const { groupId, questKey } = e.parameter;

      inviteMembersToQuest(groupId, questKey);

      return backToMainPage(
        `The system sent out a signal to invite all group members to the quest '${questKey}'...`
      );
    }
    /* PAGES */
    case 'test': {
      const email = Session.getActiveUser().getEmail();
      return backToMainPage(`Here is your email: ${email}`);
    }
    case 'settings': {
      return authGuard(() => {
        return HtmlService.createTemplateFromFile('pages/settings')
          .evaluate()
          .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
      });
    }
    default: {
      return authGuard(() => {
        return HtmlService.createTemplateFromFile('pages/main')
          .evaluate()
          .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
      });
    }
  }
}
