function getUser() {
  return doApiRequest('https://habitica.com/api/v4/user', {
    method: 'get',
  });
}

function getPartyData() {
  return doApiRequest('https://habitica.com/api/v4/groups/party', {
    method: 'get',
  });
}

function getUserDataById(userId) {
  return doApiRequest(`https://habitica.com/api/v4/members/${userId}`, {
    method: 'get',
  });
}

function inviteMembersToQuest(groupId, questKey) {
  return doApiRequest(
    `https://habitica.com/api/v4/groups/${groupId}/quests/invite/${questKey}`,
    {
      method: 'post',
    }
  );
}

function forceStartQuest(qroupId) {
  return doApiRequest(
    `https://habitica.com/api/v4/groups/${qroupId}/quests/force-start`,
    {
      method: 'post',
    }
  );
}

// cancel a quest
// https://habitica.com/api/v4/groups/38ffa809-4dbc-44ef-bdab-5a0d8e39633f/quests/cancel
/* 
  {
    "success": true,
    "data": {
        "key": null,
        "active": false,
        "leader": null,
        "progress": {
            "collect": {}
        },
        "members": {}
    },
    "notifications": [
*/

// invite party to quest
// https://habitica.com/api/v4/groups/38ffa809-4dbc-44ef-bdab-5a0d8e39633f/quests/invite/basilist
/* 
  {
    "success": true,
    "data": {
        "progress": {
            "collect": {}
        },
        "key": "basilist",
        "active": false,
        "leader": "90c987f2-cf51-442f-b932-3c4194d56ad6",
        "members": {
            "90c987f2-cf51-442f-b932-3c4194d56ad6": true,
            "03a9578c-e342-4208-abb3-defd9bb9bee9": null,
            "0e384da2-c214-4fc2-8843-aed99a8f2488": null,
            "15a6b570-5152-4a91-bcbd-b49156b500f1": null,
            "2d904822-4fc3-46d7-b112-d7b8ca35600f": null,
            "318dd3e2-90b1-4909-af8f-0c9e2719d27f": null,
            "4b3e90be-3400-4a38-a431-555d177db48a": null,
            "4c4fd8c7-7a32-40e1-a9e8-aeb01999508c": null,
            "4e0e29df-bfd7-453d-ab45-b772109a01a2": null,
            "55a928b8-9e0d-405f-9980-e771f8f2c523": null,
            "5b20861e-b8ee-4941-aeb4-f1fce14bc070": null,
            "681a6c8d-d19a-4c8c-8924-62de41c16af1": null,
            "6ddc2394-f113-4370-a5b3-bc5d1a76749a": null,
            "770b6399-1b85-41ac-aeaf-ed7ddd30f999": null,
            "91fe2a95-71a1-47ea-bd8f-8ae063a70027": null,
            "927cf97c-1eaf-4c2b-98fc-f8b7ecdf9204": null,
            "a3827b5c-e0e7-4919-8112-1e8b5f99eba2": null,
            "ad1bf2b7-5ca0-476e-b2fc-7a5508553200": null,
            "b1b92149-ac46-4729-8acf-615b95e5b948": null,
            "bdb138e5-a25f-4e59-acd6-41df91df5bdf": null,
            "c89645b2-1ba3-486b-b508-38bd6e650a6b": null,
            "dd39bb8b-429c-4448-8dd8-6224541a898e": null,
            "e0656fc7-3361-49de-bae1-be108dcca7e9": null,
            "eb7444e6-6621-4f7d-a6e3-c7ffe4d3a1ec": null,
            "edc35e43-8046-4622-a7d2-74df4644ac55": null
        },
        "extra": {}
    },
    "notifications": [
*/

// force start a quest
// https://habitica.com/api/v4/groups/38ffa809-4dbc-44ef-bdab-5a0d8e39633f/quests/force-start
/* 
  {
    "success": true,
    "data": {
        "progress": {
            "collect": {},
            "hp": 100
        },
        "key": "basilist",
        "active": true,
        "leader": "90c987f2-cf51-442f-b932-3c4194d56ad6",
        "members": {
            "90c987f2-cf51-442f-b932-3c4194d56ad6": true,
            "0e384da2-c214-4fc2-8843-aed99a8f2488": true,
            "318dd3e2-90b1-4909-af8f-0c9e2719d27f": true,
            "55a928b8-9e0d-405f-9980-e771f8f2c523": true,
            "5b20861e-b8ee-4941-aeb4-f1fce14bc070": true,
            "91fe2a95-71a1-47ea-bd8f-8ae063a70027": true
        },
        "extra": {}
    },
    "notifications": [
*/
