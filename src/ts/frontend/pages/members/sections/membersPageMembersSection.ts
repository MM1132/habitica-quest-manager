import { AQM_User } from '../../../../backend/router/routes/apiUserEndpoint/apiServeUserData';

export interface MembersPageMember {
  profileName: string;
  scriptVersion: string;
}

export interface MembersPageMembersSection {
  members: MembersPageMember[];
}

export const assembleMembersPageMembersSection = (
  aqmUsers: AQM_User[]
): MembersPageMembersSection => {
  const assembledUsers = aqmUsers.map(
    (user) =>
      ({
        profileName: user.habiticaUser.profile.name,
        scriptVersion: user.aqmGlobalData.scriptVersion,
      }) as MembersPageMember
  );

  return {
    members: assembledUsers,
  };
};
