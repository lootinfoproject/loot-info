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
      return detectAdventureGoldClaimed(referralProject, contractInstance, tokenId)
    default:
      return detectClaimedCheckingOwner(referralProject, contractInstance, tokenId)
  }
}

function detectClaimedCheckingOwner(referralProject, contractInstance, tokenId) {
  return contractInstance.methods.ownerOf(tokenId).call().then(() => {
    return { claimed: true, ...referralProject }
  }).catch((_error) => {
    return { claimed: false, ...referralProject }
  })
}

function detectAdventureGoldClaimed(referralProject, contractInstance, tokenId) {
  return contractInstance.methods.seasonClaimedByTokenId(0, tokenId).call().then(() => {
    return { claimed: true, ...referralProject }
  }).catch((_error) => {
    return { claimed: false, ...referralProject }
  })
}
