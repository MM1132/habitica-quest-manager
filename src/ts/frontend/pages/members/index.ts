import {
  AQM_User,
  getAwesomeQuestManagerUserData,
} from '../../../backend/router/routes/apiUserEndpoint/apiServeUserData';
import { aqm_getUserByLink } from '../../../backend/services/aqm/aqmUserService';
import { habitica_getParty } from '../../../backend/services/habitica/habiticaGroupService';
import { habitica_getUser } from '../../../backend/services/habitica/habiticaUserService';
import { habitica_getWebhooks } from '../../../backend/services/habitica/habiticaWebhookService';
import { HabiticaWebhookType } from '../../../backend/services/habitica/types/webhooks/commons';
import { props_getConstantData } from '../../../backend/services/properties/propsGlobalDataService';
import { props_getAllMembers } from '../../../backend/services/properties/propsMemberService';
import { props_getQuestQueue } from '../../../backend/services/properties/propsQuestQueueService';
import {
  MembersPageMembersSection,
  assembleMembersPageMembersSection,
} from './sections/membersPageMembersSection';
import {
  MembersPageQuestsSection,
  assembleMembersPageQuestSection,
} from './sections/membersPageQuestsSection';

export interface MembersPageData {
  membersSection: MembersPageMembersSection;
  questsSection: MembersPageQuestsSection;
}

export const page_getMembersData = (): MembersPageData => {
  const webhooks = habitica_getWebhooks();
  const { baseUrl } = props_getConstantData();
  const user = habitica_getUser();
  const party = habitica_getParty(user.party._id);
  const questQueue = props_getQuestQueue();

  // Get all users we have links for
  const users = props_getAllMembers().map((memberProperty) => {
    try {
      return aqm_getUserByLink(memberProperty.link);
    } catch {
      return {
        id: memberProperty.id,
        profileName: memberProperty.name,
        success: false,
      };
    }
  });

  const membersSection = assembleMembersPageMembersSection(users);

  // Add our own user
  users.push(getAwesomeQuestManagerUserData());

  const isPartyLeader = party.leader.id === user.id;

  // We are able to add to the queue if the quest queue is active
  // and if we are the party leader
  const ableToAddToQueue =
    webhooks.some(
      (webhook) =>
        webhook.url === baseUrl &&
        webhook.type === HabiticaWebhookType.QUEST_ACTIVITY
    ) && isPartyLeader;

  // Get the quests section only with the users whom request was actually successful
  const questsSection = assembleMembersPageQuestSection(
    users.filter((user) => !('success' in user)) as AQM_User[],
    questQueue,
    ableToAddToQueue
  );

  return {
    membersSection,
    questsSection,
  };
};
