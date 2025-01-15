import { props_getConstantData } from '../services/properties/propsGlobalDataService';

export enum HttpMethod {
  GET = 'get',
  DELETE = 'delete',
  PATCH = 'patch',
  POST = 'post',
  PUT = 'put',
}

export interface RequestParams {
  method: HttpMethod;
  payload?: any;
}

export interface ApiRequestOptions extends RequestParams {
  headers?: Record<string, string>;
  muteHttpExceptions?: boolean;
}

export interface ApiError {
  success: boolean;
  message: string;
}

export const doRequest = <RETURN_TYPE>(
  url: string,
  options: ApiRequestOptions
): RETURN_TYPE => {
  options.payload = options.payload
    ? JSON.stringify(options.payload)
    : undefined;

  const response = UrlFetchApp.fetch(url, options);
  const parsedJson = JSON.parse(response.getContentText());

  if (parsedJson.success === false) {
    throw parsedJson as ApiError;
  }
  return parsedJson.data;
};

export const doHabiticaApiRequest = <RETURN_TYPE>(
  url: string,
  params: RequestParams
): RETURN_TYPE => {
  const { authorId, scriptName, userId } = props_getConstantData();

  const API_TOKEN =
    PropertiesService.getScriptProperties().getProperty('apiToken') || '';

  const HEADERS = {
    'x-client': `${authorId}-${scriptName}`,
    'x-api-user': userId,
    'x-api-key': API_TOKEN,
  };

  const options = {
    method: params.method,
    payload: params.payload,
    headers: HEADERS,
    muteHttpExceptions: true,
  };

  return doRequest(url, options);
};
