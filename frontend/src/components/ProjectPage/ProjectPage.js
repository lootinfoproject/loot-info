export function detectClaimed(project, derivativeProject, contractInstance, tokenId) {
  switch (project.title) {
    case 'Loot':
      return detectLootClaimed(derivativeProject, contractInstance, tokenId)
    default:
      return false
  }
}

export function validateLootProjectToken(token) {
  const bagId = Number(token)

  return token && bagId >= 1 && bagId <= 8000
}


function detectLootClaimed(derivativeProject, contractInstance, tokenId) {
  switch (derivativeProject.title) {
    case 'Adventure Gold':
      return detectAdventureGoldClaimed(derivativeProject, contractInstance, tokenId)
    default:
      return detectClaimedCheckingOwner(derivativeProject, contractInstance, tokenId)
  }
}

function detectClaimedCheckingOwner(derivativeProject, contractInstance, tokenId) {
  return contractInstance.methods.ownerOf(tokenId).call().then(() => {
    return { claimed: true, ...derivativeProject }
  }).catch((_error) => {
    return { claimed: false, ...derivativeProject }
  })
}

function detectAdventureGoldClaimed(derivativeProject, contractInstance, tokenId) {
  return contractInstance.methods.seasonClaimedByTokenId(0, tokenId).call().then(() => {
    return { claimed: true, ...derivativeProject }
  }).catch((_error) => {
    return { claimed: false, ...derivativeProject }
  })
}
