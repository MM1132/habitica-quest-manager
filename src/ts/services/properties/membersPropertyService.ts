import { HttpMethod, doApiRequest } from '../../http/doApiRequest';
import { ApiUser } from '../api/types/apiUser';

export interface MemberProperty {
  id: string;
  name: string;
  link: string;
}

export const addNewMember = (password: string, link: string) => {
  const savedPassword =
    PropertiesService.getScriptProperties().getProperty('password');

  if (savedPassword !== password) {
    throw new Error('Invalid password');
  }

  const membersProperty =
    PropertiesService.getScriptProperties().getProperty('members');

  const members: MemberProperty[] = membersProperty
    ? JSON.parse(membersProperty)
    : [];

  const response = UrlFetchApp.fetch(link, {
    method: HttpMethod.GET,
  });
  return response.getContentText();

  try {
    const userResponse = doApiRequest<ApiUser>(`${link}/api/v1/user`, {
      method: HttpMethod.GET,
    });

    const existingMember = members.find(
      (member) => member.id === userResponse.id
    );
    if (existingMember) {
      throw new Error('Member already in list');
    }

    members.push({
      id: userResponse.id,
      name: userResponse.profile.name,
      link,
    });

    PropertiesService.getScriptProperties().setProperty(
      'members',
      JSON.stringify(members)
    );
  } catch (e: any) {
    throw new Error(e.message);
  }
};
