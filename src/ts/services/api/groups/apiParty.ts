export interface PartyQuest {
  leader: string | null;
  members: {
    [key: string]: boolean;
  };
  key: string | null;
  active: boolean;
}

export interface ApiParty {
  id: string;
  leader: {
    id: string;
  };
  quest: PartyQuest;
  memberCount: number;
  name: string;
}
