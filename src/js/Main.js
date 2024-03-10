function doGet(e) {
  switch (e.pathInfo) {
    case "start":
      forceStartQuest(e.parameters.groupId);

      return HtmlService.createHtmlOutput(`
        <p>The system sent out a signal to force the start of the current quest...</p>
        <a href="${ScriptApp.getService().getUrl()}">Click here to return to the main page</a>
      `);
    case "invite":
      const groupId = e.parameters.groupId;
      const questKey = e.parameters.questKey;

      inviteMembersToQuest(groupId, questKey);

      return HtmlService.createHtmlOutput(`
        <p>The system sent out a signal to invite all group members to the quest '${questKey}'...</p>
        <a href="${ScriptApp.getService().getUrl()}">Click here to return to the main page</a>
      `);
    case "test":
      return HtmlService.createHtmlOutput(`
        <p>Welcome to the testing page...</p>
        <a href="${ScriptApp.getService().getUrl()}">Click here to return to the main page</a>
      `);
    /* case "test":
      return HtmlService.createHtmlOutput(`
        <p>Testing the test page thoroughly...</p>
        <form action="${ScriptApp.getService().getUrl()}" method='get' id='back-to-main-page'></form>
        <script>document.getElementById('back-to-main-page').submit();</script>
      `); */
    case "settings":
      // const userId = PropertiesService.getScriptProperties().getProperty("userId");
      // const apiToken = PropertiesService.getScriptProperties().getProperty("apiToken");

      // if (!userId || !apiToken) {
      //   return HtmlService.createTemplateFromFile("src/pages/login/page").evaluate().setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
      // }

      return HtmlService.createTemplateFromFile("src/pages/settings/page").evaluate().setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
    default:
      return HtmlService.createTemplateFromFile("src/pages/main/page").evaluate().setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  }
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
      .getContent();
}
