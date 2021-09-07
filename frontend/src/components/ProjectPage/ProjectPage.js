export function detectClaimed(project, projectContract, contractInstance, tokenId) {
  switch (project.title) {
    case 'Loot':
      return detectLootClaimed(projectContract, contractInstance, tokenId)
    default:
      return false
  }
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
  return contractInstance.methods.ownerOf(tokenId).call()
}

function detectAdventureGoldClaimed(contractInstance, tokenId) {
  return contractInstance.methods.seasonClaimedByTokenId(0, tokenId).call()
}
