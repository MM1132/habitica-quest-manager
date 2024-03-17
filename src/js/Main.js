/* case "test":
return HtmlService.createHtmlOutput(`
  <p>Testing the test page thoroughly...</p>
  <form action="${ScriptApp.getService().getUrl()}" method='get' id='back-to-main-page'></form>
  <script>document.getElementById('back-to-main-page').submit();</script>
`); */

// const userId = PropertiesService.getScriptProperties().getProperty("userId");
// const apiToken = PropertiesService.getScriptProperties().getProperty("apiToken");

// if (!userId || !apiToken) {
//   return HtmlService.createTemplateFromFile("pages/login/page").evaluate().setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
// }

function backToMainPage(message) {
  return HtmlService.createHtmlOutput(`
    <p>${message}</p>
    <a href="${ScriptApp.getService().getUrl()}">Click here to return to the main page</a>
  `);
}

function authGuard(endpoint) {
  const isSetupComplete =
    PropertiesService.getScriptProperties().getProperty('isSetupComplete');

  if (!isSetupComplete) {
    return HtmlService.createTemplateFromFile('pages/setup')
      .evaluate()
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  }

  return endpoint();
}

function doGet(e) {
  switch (e.pathInfo) {
    /* ACTIONS */
    case 'start': {
      forceStartQuest(e.parameters.groupId);

      return backToMainPage(
        'The system sent out a signal to force the start of the current quest...'
      );
    }
    case 'invite': {
      const { groupId, questKey } = e.parameters;

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
