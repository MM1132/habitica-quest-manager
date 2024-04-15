import { aqm_getUserByLink } from '../aqm/aqmUserService';
import { getUserId } from './propsSetupService';

export interface LocalMember {
  id: string;
  name: string;
  link: string;
}

export type MembersProperty = LocalMember[];

export const props_addNewMember = (password: string, link: string) => {
  const savedPassword =
    PropertiesService.getScriptProperties().getProperty('password');

  if (savedPassword !== password) {
    throw new Error('Invalid password');
  }

  const membersProperty =
    PropertiesService.getScriptProperties().getProperty('members');

  const members: MembersProperty = membersProperty
    ? JSON.parse(membersProperty)
    : [];

  try {
    const { habiticaUser } = aqm_getUserByLink(link);

    if (habiticaUser.id === getUserId()) {
      throw new Error(
        'You cannot add yourself to the list of members. Your own quests are already included by default. '
      );
    }

    const existingMember = members.find(
      (member) => member.id === habiticaUser.id
    );
    if (existingMember) {
      throw new Error('Member already in list');
    }

    members.push({
      id: habiticaUser.id,
      name: habiticaUser.profile.name,
      link,
    });

    PropertiesService.getScriptProperties().setProperty(
      'members',
      JSON.stringify(members)
    );

    return members;
  } catch (e: any) {
    throw new Error(e.message);
  }
};

export const getAllMembers = () => {
  const membersProperty =
    PropertiesService.getScriptProperties().getProperty('members');

  const members: MembersProperty = membersProperty
    ? JSON.parse(membersProperty)
    : [];

  return members;
};
