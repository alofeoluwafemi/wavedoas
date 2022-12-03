export async function loadFilesByHash(hash: string) {
  const response = await fetch(`https://gateway.pinata.cloud/ipfs/${hash}`)
  return await response.json()
}
