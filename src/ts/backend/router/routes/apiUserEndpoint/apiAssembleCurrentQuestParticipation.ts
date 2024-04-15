import { HabiticaParty } from '../../../services/habitica/types/habiticaParty';

export interface CurrentQuestParticipation {
  participantCount: number;
  participationPercentage: number;
}

export const apiAssembleCurrentQuestParticipation = (
  party: HabiticaParty
): CurrentQuestParticipation => {
  const participantCount = Object.values(party.quest.members).filter(
    (v) => !!v
  ).length;

  const participationPercentage = Math.floor(
    (100 / party.memberCount) * participantCount
  );

  return {
    participantCount,
    participationPercentage,
  };
};
