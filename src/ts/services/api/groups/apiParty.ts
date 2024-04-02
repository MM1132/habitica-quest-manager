export interface ApiParty {
  id: string;
  leader: {
    id: string;
  };
  quest: {
    leader: string | null;
    members: string[];
    key: string | null;
    active: boolean;
  };
  memberCount: number;
  name: string;
}
