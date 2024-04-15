export const include = (filename: string, props?: any) => {
  const template = HtmlService.createTemplateFromFile(filename);

  template.props = props || null;

  return template
    .evaluate()
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    .getContent();
};
