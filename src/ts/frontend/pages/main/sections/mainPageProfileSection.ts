import { HabiticaParty } from '../../../../backend/services/habitica/types/habiticaParty';
import { HabiticaUser } from '../../../../backend/services/habitica/types/habiticaUser';

export interface MainPageProfileSection {
  profileName: string;
  username: string;
  partyName: string;
}

export const assembleMainPageProfileSection = (
  habiticaUser: HabiticaUser,
  habiticaParty: HabiticaParty
) => ({
  profileName: habiticaUser.profile.name,
  username: habiticaUser.auth.local.username,
  partyName: habiticaParty.name,
});
