import { ApiError } from '../http/doApiRequest';
import { backToMainPage } from './endpointUtils';

type HANDLER_RETURN =
  | GoogleAppsScript.HTML.HtmlOutput
  | GoogleAppsScript.Content.TextOutput;

type GET_HANDLER = (e: GoogleAppsScript.Events.DoGet) => HANDLER_RETURN;
type POST_HANDLER = (e: GoogleAppsScript.Events.DoPost) => HANDLER_RETURN;

export class Router {
  getRoutes: Record<string, GET_HANDLER> = {};
  postRoutes: Record<string, POST_HANDLER> = {};

  constructor() {}

  public get(path: string, handler: GET_HANDLER) {
    this.getRoutes[path] = handler;
  }

  public post(path: string, handler: POST_HANDLER) {
    this.postRoutes[path] = handler;
  }

  public handleGet(e: GoogleAppsScript.Events.DoGet): HANDLER_RETURN {
    let { pathInfo } = e;
    pathInfo = pathInfo || '';

    const route = this.getRoutes[pathInfo];

    if (!route) {
      if (pathInfo.startsWith('api/v1')) {
        return ContentService.createTextOutput(
          JSON.stringify({
            success: false,
            message: 'Not found',
          } as ApiError)
        ).setMimeType(ContentService.MimeType.JSON);
      }

      return backToMainPage(`Invalid path: '${pathInfo}'`);
    }

    return route(e);
  }

  public handlePost(e: GoogleAppsScript.Events.DoPost): HANDLER_RETURN {
    let { pathInfo } = e;
    pathInfo = pathInfo || '';

    const route = this.postRoutes[pathInfo];

    if (!route) {
      return ContentService.createTextOutput(
        JSON.stringify({
          success: false,
          message: 'Not found',
        } as ApiError)
      ).setMimeType(ContentService.MimeType.JSON);
    }

    return route(e);
  }
}
