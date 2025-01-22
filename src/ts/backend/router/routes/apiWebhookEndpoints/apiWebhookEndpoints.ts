import { isQuestFinishedWebhookTurnedOn } from '../../../../frontend/pages/questQueue/index';
import { habiticaAcceptQuest } from '../../../services/habitica/habiticaAcceptQuestService';
import { habitica_getWebhooks } from '../../../services/habitica/habiticaWebhookService';
import { props_getConstantData } from '../../../services/properties/propsGlobalDataService';
import { props_inviteFirstQuestFromQueue } from '../../../services/properties/propsQuestQueueService';

export const apiHandleWebhooks = (e: GoogleAppsScript.Events.DoPost) => {
  const dataContents = JSON.parse(e.postData.contents);
  const { type } = dataContents;

  const { baseUrl } = props_getConstantData();
  const webhooks = habitica_getWebhooks();

  switch (type) {
    case 'questInvited':
      habiticaAcceptQuest();
      break;
    case 'questFinished':
      if (isQuestFinishedWebhookTurnedOn(webhooks, baseUrl)) {
        props_inviteFirstQuestFromQueue();
      }
  }

  return HtmlService.createHtmlOutput();
};
