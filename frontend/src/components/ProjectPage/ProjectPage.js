export function detectClaimed(project, projectContract, contractInstance, tokenId) {
  switch (project.title) {
    case 'Loot':
      return detectLootClaimed(projectContract, contractInstance, tokenId)
    default:
      return false
  }
}

export function validateLootProjectToken(token) {
  const bagId = Number(token)

  return token && bagId >= 1 && bagId <= 8000
}


function detectLootClaimed(projectContract, contractInstance, tokenId) {
  switch (projectContract.title) {
    case 'Realms (for Adventurers)':
      return detectRealmsClaimed(contractInstance, tokenId)
    case 'Adventure Gold':
      return detectAdventureGoldClaimed(contractInstance, tokenId)
    default:
      return false
  }
}

function detectRealmsClaimed(contractInstance, tokenId) {
  return contractInstance.methods.ownerOf(tokenId).call().catch((_error) => {
    return false
  })
}

function detectAdventureGoldClaimed(contractInstance, tokenId) {
  return contractInstance.methods.seasonClaimedByTokenId(0, tokenId).call().catch((_error) => {
    return false
  })
}
