import { claimer, draw, publicClient } from './config.js'
import { getBlockAtTimestamp, getDrawTimestamps } from './timestamps.js'

export const getClaimFeesOverTime = async () => {
  const drawTimestamps = getDrawTimestamps()
  console.log(`🍪 ~ drawTimestamps:`, drawTimestamps)

  const blockNumbers = []
  await Promise.allSettled(
    drawTimestamps.map((timestamp) => async () => {
      const block = await getBlockAtTimestamp(publicClient, timestamp)
      blockNumbers.push(block.number)
    })
  )
  blockNumbers.sort((a, b) => Number(a) - Number(b))
  console.log(`🍪 ~ blockNumbers:`, blockNumbers)

  const claimFees = []
  await Promise.allSettled(
    blockNumbers.map((blockNumber) => async () => {
      const claimFee = await publicClient.readContract({
        address: claimer.address,
        abi: claimer.abi,
        functionName: 'computeFeePerClaim',
        args: [draw.numTiers - 2, 1n],
        blockNumber
      })
      claimFees.push({ blockNumber, claimFee })
    })
  )
  console.log(`🍪 ~ claimFees:`, claimFees)
}
