export function detectClaimed(project, referralProject, contractInstance, tokenId) {
  switch (project.title) {
    case 'Loot':
      return detectLootClaimed(referralProject, contractInstance, tokenId)
    default:
      return false
  }
}

export function validateLootProjectToken(token) {
  const bagId = Number(token)

  return token && bagId >= 1 && bagId <= 8000
}


function detectLootClaimed(referralProject, contractInstance, tokenId) {
  switch (referralProject.title) {
    case 'Adventure Gold':
      return detectAdventureGoldClaimed(contractInstance, tokenId)
    default:
      return detectClaimedCheckingOwner(contractInstance, tokenId)
  }
}

function detectClaimedCheckingOwner(contractInstance, tokenId) {
  return contractInstance.methods.ownerOf(tokenId).call().catch((_error) => {
    return false
  })
}

function detectAdventureGoldClaimed(contractInstance, tokenId) {
  return contractInstance.methods.seasonClaimedByTokenId(0, tokenId).call().catch((_error) => {
    return false
  })
}
