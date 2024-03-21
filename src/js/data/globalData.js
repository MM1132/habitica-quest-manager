// Get the data that every page should have access to
// For example: the name of the script

const getGlobalPageData = () => {
  return {
    scriptName: SCRIPT_NAME,
    mainPageUrl: `${ScriptApp.getService().getUrl()}`,
    settingsPageUrl: `${ScriptApp.getService().getUrl()}/settings`,
    setupPageUrl: `${ScriptApp.getService().getUrl()}/setup`,
  };
};
