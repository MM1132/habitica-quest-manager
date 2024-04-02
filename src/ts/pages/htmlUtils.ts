export const include = (filename: string) => {
  return HtmlService.createTemplateFromFile(filename)
    .evaluate()
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    .getContent();
};
