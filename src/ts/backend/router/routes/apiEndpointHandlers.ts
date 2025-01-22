import {
  habitica_forceStart,
  habitica_invite,
} from '../../services/habitica/habiticaGroupService';
import { habitica_getUser } from '../../services/habitica/habiticaUserService';

export const apiForceStartQuest = () => {
  const {
    party: { _id: partyId },
  } = habitica_getUser();
  const response = habitica_forceStart(partyId);

  return ContentService.createTextOutput(JSON.stringify(response)).setMimeType(
    ContentService.MimeType.JSON
  );
};

export const apiInviteMembersToQuest = (e: GoogleAppsScript.Events.DoPost) => {
  const contents = JSON.parse(e.postData.contents);
  const { questKey } = contents;

  const user = habitica_getUser();

  // Fun fact: We don't actually know what Habitica replies
  const response = habitica_invite(user.party._id, questKey);

  return ContentService.createTextOutput(JSON.stringify(response)).setMimeType(
    ContentService.MimeType.JSON
  );
};
