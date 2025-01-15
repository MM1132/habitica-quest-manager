export const props_setQuestQueueToggle = (setting: boolean) => {
  PropertiesService.getScriptProperties().setProperty(
    'questQueueToggle',
    `${setting}`
  );
};
