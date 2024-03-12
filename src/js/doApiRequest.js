// The % of members that are required to have joined a quest for the "start" button to appear
const QUEST_START_THRESHOLD = 80;

// --- DON'T CHANGE, SCRIPT DETAILS ---
const AUTHOR_ID = '90c987f2-cf51-442f-b932-3c4194d56ad6';
const SCRIPT_NAME = `Kanguste's Quest Manager v0.1`;

function doApiRequest(url, params) {
  const USER_ID = PropertiesService.getScriptProperties().getProperty('userId');
  const API_TOKEN = PropertiesService.getScriptProperties().getProperty('apiToken');

  const HEADERS = {
    'x-client': `${AUTHOR_ID}-${SCRIPT_NAME}`,
    'x-api-user': USER_ID,
    'x-api-key': API_TOKEN,
  };

  const options = {
    method: params.method,
    headers: HEADERS,
    muteHttpExceptions: true,
    payload: params.payload,
  };

  const response = UrlFetchApp.fetch(url, options);

  return JSON.parse(response.getContentText());
}
