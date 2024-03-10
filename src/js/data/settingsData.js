const setSettingsPageData = (userId, apiToken) => {
    PropertiesService.getScriptProperties().setProperty("userId", userId);
    PropertiesService.getScriptProperties().setProperty("apiToken", apiToken);
}
