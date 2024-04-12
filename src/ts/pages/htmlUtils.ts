export const include = (filename: string, props?: any) => {
  const template = HtmlService.createTemplateFromFile(filename);

  template.props = props || {};

  return template
    .evaluate()
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    .getContent();
};

export const testFunction = (message: string) => {
  if (message === 'error') {
    throw new Error('Something bad happened');
  }
  return `test: ${message}`;
};
