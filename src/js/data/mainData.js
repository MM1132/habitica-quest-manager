function getQuestsWithLinks(
  quests,
  currentQuestStatus,
  participationPercentage,
  userData,
  partyData
) {
  const ownedQuestEntries = Object.entries(quests).filter(
    (questEntry) => questEntry[1] > 0
  );

  const questsWithLinks = ownedQuestEntries.map((questEntry) => ({
    name: questEntry[0],
    count: questEntry[1],
    links: {
      ...(currentQuestStatus === 'RESTING' && {
        invite: `${ScriptApp.getService().getUrl()}/invite?questKey=${questEntry[0]}&groupId=${partyData.id}`,
      }),
      ...(currentQuestStatus === 'INVITATIONS_SENT' &&
        participationPercentage >= getQuestStartThreshold() &&
        userData.id === partyData.quest.leader && {
          start: `${ScriptApp.getService().getUrl()}/start?groupId=${partyData.id}`,
        }),
    },
  }));

  return questsWithLinks;
}

function getPartyLeaderActions(
  userData,
  partyData,
  currentQuestStatus,
  participationPercentage
) {
  const partyLeaderActions = {
    ...(currentQuestStatus === 'INVITATIONS_SENT' &&
      participationPercentage >= getQuestStartThreshold() &&
      partyData.leader.id === userData.id && {
        start: `${ScriptApp.getService().getUrl()}/start?groupId=${partyData.id}`,
      }),
  };

  return partyLeaderActions;
}

function getCurrentQuestData() {}

function getMainPageData() {
  try {
    const userData = getUser();

    const partyData = getPartyData();
    const questOwnerProfileName = !partyData.quest.leader
      ? null
      : getUserDataById(partyData.quest.leader).profile.name;

    const participatingMemberCount = Object.values(
      partyData.quest.members
    ).filter((v) => !!v).length;
    const participationPercentage = Math.floor(
      (100 / partyData.memberCount) * participatingMemberCount
    );

    const currentQuestStatus = (() => {
      if (!partyData.quest.key) {
        return 'NO_QUEST';
      }
      if (partyData.quest.active) {
        return 'IN_PROGRESS';
      }
      return 'INVITATIONS_SENT';
    })();

    const quests = getQuestsWithLinks(
      userData.items.quests,
      currentQuestStatus,
      participationPercentage,
      userData,
      partyData
    );

    const partyLeaderActions = getPartyLeaderActions(
      userData,
      partyData,
      currentQuestStatus,
      participationPercentage
    );

    const dataForTemplate = {
      authenticated: getAuthenticated(),
      profileName: userData.profile.name,
      username: userData.auth.local.username,
      quests,
      currentQuest: {
        name: partyData.quest.key,
        ownerProfileName: questOwnerProfileName,
        status: currentQuestStatus,
        participatingMemberCount,
        participationPercentage,
        partyLeaderActions,
      },
      party: {
        name: partyData.name,
        memberCount: partyData.memberCount,
      },
      settings: {
        questStartThreshold: getQuestStartThreshold(),
      },
    };

    return dataForTemplate;
  } catch (e) {
    return {
      authenticated: getAuthenticated(),
      message: `Error: ${e.message}`,
    };
  }
}
