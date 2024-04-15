import { AQM_User } from '../../../../backend/router/routes/apiUserEndpoint/apiServeUserData';
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

interface MembersPageQuestLink {
  userId: string;
  text: string;
  action: AQM_ENDPOINTS;
  href: string;
}

interface MembersPageQuest extends TranslatedQuest {
  key: string;
  count: number;
  _links: MembersPageQuestLink[];
}

export interface MembersPageQuestsSection {
  quests: MembersPageQuest[];
}

export const assembleMembersPageQuestSection = (
  aqmUsers: AQM_User[]
): MembersPageQuestsSection => {
  const questsNoDuplicates: Record<string, MembersPageQuest> = {};

  aqmUsers.forEach((aqmUser) => {
    aqmUser.aqmQuests.forEach((aqmQuest) => {
      if (aqmQuest.key in questsNoDuplicates) {
        questsNoDuplicates[aqmQuest.key].count += aqmQuest.count;

        Object.entries(aqmQuest._links).forEach(([linkKey, linkValue]) => {
          if (linkKey === AQM_ENDPOINTS.invite) {
            questsNoDuplicates[aqmQuest.key]._links.push({
              userId: aqmUser.habiticaUser.id,
              text: `Invite as ${aqmUser.habiticaUser.profile.name}`,
              action: AQM_ENDPOINTS.invite,
              href: linkValue,
            });
          } else if (linkKey === AQM_ENDPOINTS.start) {
            questsNoDuplicates[aqmQuest.key]._links.push({
              userId: aqmUser.habiticaUser.id,
              text: `Start as ${aqmUser.habiticaUser.profile.name}`,
              action: AQM_ENDPOINTS.start,
              href: linkValue,
            });
          }
        });
      } else {
        const _links = Object.entries(aqmQuest._links).map(
          ([linkKey, linkValue]) => {
            if (linkKey === AQM_ENDPOINTS.invite) {
              return {
                userId: aqmUser.habiticaUser.id,
                text: `Invite as ${aqmUser.habiticaUser.profile.name}`,
                action: AQM_ENDPOINTS.invite,
                href: linkValue,
              };
            } else if (linkKey === AQM_ENDPOINTS.start) {
              return {
                userId: aqmUser.habiticaUser.id,
                text: `Start as ${aqmUser.habiticaUser.profile.name}`,
                action: AQM_ENDPOINTS.start,
                href: linkValue,
              };
            }
          }
        ) as MembersPageQuestLink[];

        const translatedQuest = translateQuestByKey(aqmQuest.key);

        questsNoDuplicates[aqmQuest.key] = {
          key: aqmQuest.key,
          count: aqmQuest.count,
          _links,
          ...translatedQuest,
        };
      }
    });
  });

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
