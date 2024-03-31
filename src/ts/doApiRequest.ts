// --- DON'T CHANGE, SCRIPT DETAILS ---
const AUTHOR_ID = '90c987f2-cf51-442f-b932-3c4194d56ad6';
export const SCRIPT_NAME = `Quest Manager v1.2`;

type HttpMethod = 'get' | 'delete' | 'patch' | 'post' | 'put';

export interface ApiRequestParams {
  method: HttpMethod;
  payload?: any;
}

export const doApiRequest = (url: string, params: ApiRequestParams) => {
  const USER_ID =
    PropertiesService.getScriptProperties().getProperty('userId') || '';
  const API_TOKEN =
    PropertiesService.getScriptProperties().getProperty('apiToken') || '';

  const HEADERS = {
    'x-client': `${AUTHOR_ID}-Quest Manager`,
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
  const parsedJson = JSON.parse(response.getContentText());

  if (parsedJson.success === false) {
    PropertiesService.getScriptProperties().setProperty(
      'authenticated',
      'false'
    );
    throw parsedJson;
  }

  return parsedJson.data;
};
