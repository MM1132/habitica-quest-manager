import { AUTHOR_ID, SCRIPT_NAME } from '../services/local/constants';

export enum HttpMethod {
  GET = 'get',
  DELETE = 'delete',
  PATCH = 'patch',
  POST = 'post',
  PUT = 'put',
}

export interface ApiRequestParams {
  method: HttpMethod;
  payload?: any;
}

export interface ApiError {
  success: boolean;
  message: string;
}

export const doApiRequest = <RETURN_TYPE>(
  url: string,
  params: ApiRequestParams
): RETURN_TYPE => {
  const USER_ID =
    PropertiesService.getScriptProperties().getProperty('userId') || '';
  const API_TOKEN =
    PropertiesService.getScriptProperties().getProperty('apiToken') || '';

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
  const parsedJson = JSON.parse(response.getContentText());

  if (parsedJson.success === false) {
    PropertiesService.getScriptProperties().setProperty(
      'authenticated',
      'false'
    );
    throw parsedJson as ApiError;
  }

  return parsedJson.data;
};
