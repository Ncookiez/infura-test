import { formatUnits } from 'viem'

export const divideBigInts = (a, b, precision = 4) => {
  if (!a || !b) return 0
  return parseFloat(formatUnits((a * BigInt(10 ** precision)) / b, precision))
}

export const absBigInt = (n) => (n < 0n ? -n : n)
