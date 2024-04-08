export interface MembersPageData {
  members: string[];
}

export const getMembersPageData = (): MembersPageData => {
  return {
    members: ['Alice', 'Bob', 'Charlie'],
  };
};
