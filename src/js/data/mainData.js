function getQuestsWithLinks(quests, currentQuestStatus, participationPercentage, userData, partyData) {
  const ownedQuestEntries = Object.entries(quests).filter(questEntry => questEntry[1] > 0);

  const questsWithLinks = ownedQuestEntries.map(questEntry => ({
    name: questEntry[0],
    count: questEntry[1],
    links: {
      ...(currentQuestStatus === "RESTING" && {
            invite: `${ScriptApp.getService().getUrl()}/invite?questKey=${questEntry[0]}&groupId=${partyData.id}`
          }
      ),
      ...(currentQuestStatus === "INVITATIONS_SENT" && 
          participationPercentage >= QUEST_START_THRESHOLD &&
          userData.id === partyData.quest.leader && { 
            start: `${ScriptApp.getService().getUrl()}/start?groupId=${partyData.id}`
          }
      ),
    },
  }));

  return questsWithLinks;
}

function getPartyLeaderActions(userData, partyData, currentQuestStatus, participationPercentage) {
  const partyLeaderActions = {
    ...(currentQuestStatus === "INVITATIONS_SENT" && 
        participationPercentage >= QUEST_START_THRESHOLD &&
        partyData.leader.id === userData.id && {
          start: `${ScriptApp.getService().getUrl()}/start?groupId=${partyData.id}`
    }),
    /* test: `${ScriptApp.getService().getUrl()}/test`, */
  };

  return partyLeaderActions;
}

function getCurrentQuestData() {
  
}

function getMainPageData() {
  const userData = getUserData();
  if (!userData) {
    return {
      authenticated: false,
    }
  }

  const partyData = getPartyData();
  const questOwnerProfileName = !partyData.quest.leader ? null : getUserDataById(partyData.quest.leader).profile.name;

  const participatingMemberCount = Object.values(partyData.quest.members).filter(v => !!v).length;
  const participationPercentage = Math.floor(100 / partyData.memberCount * participatingMemberCount);

  const currentQuestStatus = !!partyData.quest.key ? (partyData.quest.active ? "IN_PROGRESS" : "INVITATIONS_SENT") : "NO_QUEST";
  const quests = getQuestsWithLinks(
    userData.items.quests,
    currentQuestStatus,
    participationPercentage,
    userData,
    partyData,
  );

  const partyLeaderActions = getPartyLeaderActions(
    userData,
    partyData,
    currentQuestStatus,
    participationPercentage,
  );

  const dataForTemplate = {
    authenticated: true,
    profileName: userData.profile.name,
    username: userData.auth.local.username,
    quests: quests,
    currentQuest: {
      name: partyData.quest.key,
      ownerProfileName: questOwnerProfileName,
      status: currentQuestStatus,
      participatingMemberCount: participatingMemberCount,
      participationPercentage: participationPercentage,
      partyLeaderActions: partyLeaderActions,
    },
    party: {
      name: partyData.name,
      memberCount: partyData.memberCount,
    },
  };

  return dataForTemplate;
}
