import { AQM_QuestStatus } from '../../../../backend/router/routes/apiUserEndpoint/apiAssembleCurrentQuest';
import { AQM_Quest } from '../../../../backend/router/routes/apiUserEndpoint/apiAssembleUserQuests';
import { AQM_User } from '../../../../backend/router/routes/apiUserEndpoint/apiServeUserData';
import { PropsQuestQueueQuest } from '../../../../backend/services/properties/propsQuestQueueService';
import { AQM_ENDPOINTS } from '../../../../index';
import { translateQuestByKey } from '../../../quests/questService';
import { TranslatedQuest } from '../../../quests/types';

/*
[
  {
    key: "basilist",
    count: 122,
    text: "The greatest Basilsit!",
    drop: {
      gp: 20,
      exp: 50,
    },
    _links: [
      {
        text: "Invite as Mihhail",
        action: "api/v1/invite",
        href: "https://script.google.com/macros/s/abcd1234/exec",
      },
      {
        text: "Invite as Robert",
        action: "api/v1/invite",
        href: "https://script.google.com/macros/s/abcd1234/exec",
      }
    ]
  },
  {

  }
]
*/

enum QuestActionType {
  start = 'start',
  invite = 'invite',
  queue = 'queue',
}

interface QuestActionLink {
  text: string; // The text shown in the action button
  buttonId: string; // A unique ID to identify the button
  action: QuestActionType; // What type of action will be done
  data?: any; // Any data that should be passed into the action function
  /*
  {
    "key": "questbasilist",
    "href": "https://something.aasd"
  }
  */
}

interface MembersPageQuest extends TranslatedQuest {
  key: string;
  count: number;
  status: AQM_QuestStatus | null;
  _actions: QuestActionLink[];
}

export interface MembersPageQuestsSection {
  quests: MembersPageQuest[];
}

// OLD ONE:
// userId: aqmUser.habiticaUser.id,
// text: `Start as ${aqmUser.habiticaUser.profile.name}`,
// action: AQM_ENDPOINTS.start,
// href: linkValue,
const createInviteLink = (
  aqmQuest: AQM_Quest,
  aqmUser: AQM_User,
  linkValue: string
): QuestActionLink => ({
  action: QuestActionType.invite,
  buttonId: `invite-${aqmQuest.key}-${aqmUser.habiticaUser.id}`,
  data: linkValue,
  text: `Invite as ${aqmUser.habiticaUser.profile.name}`,
});

const createStartLink = (
  aqmQuest: AQM_Quest,
  aqmUser: AQM_User,
  linkValue: string
): QuestActionLink => ({
  action: QuestActionType.start,
  buttonId: `start-${aqmQuest.key}-${aqmUser.habiticaUser.id}`,
  data: linkValue,
  text: `Start as ${aqmUser.habiticaUser.profile.name}`,
});

export const assembleMembersPageQuestSection = (
  aqmUsers: AQM_User[],
  questQueue: PropsQuestQueueQuest[],
  ableToAddToQueue: boolean
): MembersPageQuestsSection => {
  const questsNoDuplicates: Record<string, MembersPageQuest> = {};

  // You loop through all the users
  aqmUsers.forEach((aqmUser) => {
    // And then you loop through all the quests of that user
    aqmUser.aqmQuests.forEach((aqmQuest) => {
      // If the quest already exists in the quests
      // simply increase the count
      if (aqmQuest.key in questsNoDuplicates) {
        questsNoDuplicates[aqmQuest.key].count += aqmQuest.count;

        // Here we are adding the links of that user
        Object.entries(aqmQuest._links).forEach(([linkKey, linkValue]) => {
          if (linkKey === AQM_ENDPOINTS.invite) {
            questsNoDuplicates[aqmQuest.key]._actions.push(
              createInviteLink(aqmQuest, aqmUser, linkValue)
            );
          } else if (linkKey === AQM_ENDPOINTS.start) {
            questsNoDuplicates[aqmQuest.key]._actions.push(
              createStartLink(aqmQuest, aqmUser, linkValue)
            );
          }
        });
      } else {
        const _links = Object.entries(aqmQuest._links).map(
          ([linkKey, linkValue]) => {
            if (linkKey === AQM_ENDPOINTS.invite) {
              return createInviteLink(aqmQuest, aqmUser, linkValue);
            } else if (linkKey === AQM_ENDPOINTS.start) {
              return createStartLink(aqmQuest, aqmUser, linkValue);
            }
          }
        ) as QuestActionLink[];

        const translatedQuest = translateQuestByKey(aqmQuest.key);

        questsNoDuplicates[aqmQuest.key] = {
          key: aqmQuest.key,
          count: aqmQuest.count,
          status: aqmQuest.status,
          _actions: _links,
          ...translatedQuest,
        };
      }
    });
  });

  // Add the Queue links
  if (ableToAddToQueue) {
    // Looping through all the quests to determine which quests need the queue links
    Object.keys(questsNoDuplicates).forEach((questKey) => {
      // Loop through all the users to give each user a chance to have their button there
      aqmUsers.forEach((aqmUser) => {
        // 1. How many quests of this `questKey` does the user already have in the queue
        const questCountInQueue = questQueue.filter(
          (quest) =>
            quest.questKey === questKey &&
            quest.userId === aqmUser.habiticaUser.id
        ).length;

        // 2. How many quests with the same `questKey` does the user have in their inventory
        const questInInventory = aqmUser.aqmQuests.find(
          (quest) => quest.key === questKey
        );
        if (!questInInventory) return;
        let questCountInInventory = questInInventory.count;
        if (questInInventory.status) {
          questCountInInventory--;
        }

        // 3. And if they have more quests in their inventory than in the queue, display the button
        if (questCountInInventory > questCountInQueue) {
          questsNoDuplicates[questKey]._actions.push({
            action: QuestActionType.queue,
            buttonId: `queue-${questKey}-${aqmUser.habiticaUser.id}`,
            data: aqmUser.habiticaUser.id,
            text: `Queue as ${aqmUser.habiticaUser.profile.name}`,
          });
        }
      });
    });
  }

  const sortedQuests = Object.values(questsNoDuplicates)
    .map((quest) => quest)
    .sort((questA, questB) => {
      const questAValue = questA.drop.exp + questA.drop.gp;
      const questBValue = questB.drop.exp + questB.drop.gp;

      return questBValue - questAValue;
    });

  return {
    quests: sortedQuests,
  };
};
