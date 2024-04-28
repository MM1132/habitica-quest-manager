import { AQM_User } from '../../../../backend/router/routes/apiUserEndpoint/apiServeUserData';

export interface MembersPageMember {
  profileName: string;
  success: boolean;
  scriptVersion: string;
  questStartThreshold: number;
  id: string;
}

export interface FailedUser {
  profileName: string;
  success: boolean;
}

export interface MembersPageMembersSection {
  members: (MembersPageMember | FailedUser)[];
}

export const assembleMembersPageMembersSection = (
  members: (AQM_User | FailedUser)[]
): MembersPageMembersSection => {
  const assembledMembers = members.map((member) => {
    if ('success' in member && member.success === false) {
      return {
        profileName: member.profileName,
        success: member.success,
      };
    } else {
      const aqmUser = member as AQM_User;

      return {
        profileName: aqmUser.habiticaUser.profile.name,
        success: true,
        scriptVersion: aqmUser.aqmGlobalData.scriptVersion,
        questStartThreshold: aqmUser.aqmSettings.questStartThreshold,
        id: aqmUser.habiticaUser.id,
      };
    }
  });

  return {
    members: assembledMembers,
  };
};
