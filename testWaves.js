const { issue, broadcast } = require('@waves/waves-transactions')
const { Signer } = require('@waves/signer')
const { ProviderKeeper } = require('@waves/provider-keeper')

function createToken() {
  const nodeUrl = 'https://nodes-testnet.wavesnodes.com' // Testnet node
  const seed = process.env.SEED_PHRASE

  // Issue transaction: specify token params

  const myToken = {
    name: 'Spring 200',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    quantity: 100000, // Real amount (1000) multiplied by 10^decimals (100); set 1 for NFT
    reissuable: true, // Set false for NFT
    decimals: 2, // Set 0 for NFT
    chainId: 'T', // Testnet; set 'W' for Mainnet
  }

  const issueTx = issue(myToken, seed) // Create and sign Issue transaction

  broadcast(issueTx, nodeUrl)
    .then((resp) => console.log(resp))
    .catch((e) => {
      console.log(e)
    })
}
