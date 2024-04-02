export interface ApiUser {
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
}
