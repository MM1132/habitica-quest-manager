export interface HabiticaPartyQuest {
  leader: string | null;
  members: {
    [key: string]: boolean;
  };
  key: string | null;
  active: boolean;
}

export interface HabiticaParty {
  id: string;
  leader: {
    id: string;
  };
  quest: HabiticaPartyQuest;
  memberCount: number;
  name: string;
}
