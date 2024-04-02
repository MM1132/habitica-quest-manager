export interface ApiParty {
  id: string;
  leader: {
    id: string;
  };
  quest: {
    leader: string | null;
    members: {
      [key: string]: boolean;
    };
    key: string | null;
    active: boolean;
  };
  memberCount: number;
  name: string;
}
