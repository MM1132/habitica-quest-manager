export interface HabiticaUser {
  id: string;
  auth: {
    local: {
      username: string;
    };
  };
  profile: {
    name: string;
  };
  items: {
    quests: {
      [key: string]: number;
    };
  };
  party: {
    _id: string;
  };
}
