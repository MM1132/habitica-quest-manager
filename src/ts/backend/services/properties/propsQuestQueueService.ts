import { aqm_inviteMembersToQuestByLink } from '../aqm/aqmQuestService';
import { props_getAllMembers } from './propsMemberService';

export interface PropsQuestQueueQuest {
  questKey: string;
  userId: string;
}

export const props_getQuestQueue = (): PropsQuestQueueQuest[] => {
  const questQueueString =
    PropertiesService.getScriptProperties().getProperty('questQueue') || '[]';

  const questQueueData = JSON.parse(questQueueString) as PropsQuestQueueQuest[];

  return questQueueData;
};

export const props_setQuestQueue = (data: PropsQuestQueueQuest[]) => {
  const questQueueStringData = JSON.stringify(data);

  PropertiesService.getScriptProperties().setProperty(
    'questQueue',
    questQueueStringData
  );
};

export const props_addQuestToQueue = (data: PropsQuestQueueQuest) => {
  const questQueue = props_getQuestQueue();

  questQueue.push(data);

  props_setQuestQueue(questQueue);
};

export const props_deleteQuestQueue = () => {
  PropertiesService.getScriptProperties().deleteProperty('questQueue');
};

export const props_inviteFirstQuestFromQueue = () => {
  const questQueue = props_getQuestQueue();
  const firstQuest = questQueue.shift();
  if (!firstQuest) return;

  const questOwnerMember = props_getAllMembers().find(
    (member) => member.id === firstQuest.userId
  );

  // In case we did not find the member
  if (!questOwnerMember) return;

  // Now we must send out the invitations for the quest
  aqm_inviteMembersToQuestByLink(questOwnerMember.link, firstQuest.questKey);

  // And then set the quest queue once again
  props_setQuestQueue(questQueue);
};
