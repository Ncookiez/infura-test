import { createPublicClient, http } from 'viem'
import { optimism } from 'viem/chains'

export const prizePool = {
  chainId: 10,
  address: '0xF35fE10ffd0a9672d0095c435fd8767A7fe29B55',
  drawPeriod: 86_400
}

export const claimer = {
  chainId: prizePool.chainId,
  address: '0x0b5a1dc536D5A67C66D00B337E6b189385BD8438',
  abi: [
    {
      inputs: [
        { internalType: 'uint8', name: '_tier', type: 'uint8' },
        { internalType: 'uint256', name: '_claimCount', type: 'uint256' }
      ],
      name: 'computeFeePerClaim',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function'
    }
  ]
}

export const draw = {
  id: 1,
  numTiers: 4,
  openedAt: 1_713_477_600
}

export const publicClient = createPublicClient({
  chain: optimism,
  transport: http(`https://optimism-sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`)
})
