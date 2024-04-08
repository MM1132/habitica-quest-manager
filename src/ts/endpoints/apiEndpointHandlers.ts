import {
  forceStartQuest,
  inviteMembersToQuest,
} from '../services/api/groups/apiGroupsService';
import { getUser } from '../services/api/user/apiUserService';

export const apiServeUserData = () => {
  const user = getUser();

  return ContentService.createTextOutput(JSON.stringify(user)).setMimeType(
    ContentService.MimeType.JSON
  );
};

export const apiStartQuest = () => {
  const {
    party: { _id: partyId },
  } = getUser();
  const response = forceStartQuest(partyId);

  return ContentService.createTextOutput(JSON.stringify(response)).setMimeType(
    ContentService.MimeType.JSON
  );
};

export const apiInviteMembersToQuest = (e: GoogleAppsScript.Events.DoPost) => {
  const contents = JSON.parse(e.postData.contents);
  const { questKey } = contents;

  const user = getUser();

  const response = inviteMembersToQuest(user.party._id, questKey);

  return ContentService.createTextOutput(JSON.stringify(response)).setMimeType(
    ContentService.MimeType.JSON
  );
};
