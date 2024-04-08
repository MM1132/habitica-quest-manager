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

  private static getErrorResponse = (message?: string) => {
    return ContentService.createTextOutput(
      JSON.stringify({
        success: false,
        message: message || 'Not found',
      } as ApiError)
    ).setMimeType(ContentService.MimeType.JSON);
  };

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
      return backToMainPage(`Invalid path: '${pathInfo}'`);
    }

    return route(e);
  }

  public handlePost(e: GoogleAppsScript.Events.DoPost): HANDLER_RETURN {
    let { pathInfo } = e;
    pathInfo = pathInfo || '';

    if (pathInfo !== '') {
      return Router.getErrorResponse(
        `Only / paths are allowed for the POST request, your path was '${pathInfo}'`
      );
    }

    const contents = JSON.parse(e.postData.contents);

    // `path` is the reserved keyword in the contents of the POST request
    const route = this.postRoutes[contents.path || ''];

    if (!route) {
      return Router.getErrorResponse(
        "The path in the 'path' key was not found"
      );
    }

    return route(e);
  }
}
