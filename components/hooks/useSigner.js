import { Signer } from '@waves/signer'
import { ProviderWeb } from '@waves.exchange/provider-web'
import { nodeInteraction } from '@waves/waves-transactions'
import { ProviderKeeper } from '@waves/provider-keeper'
import React, { useState, useEffect } from 'react'

function useSigner() {
  const [signer, setSigner] = useState()
  const [provider, setProvider] = useState()
  const [user, setUser] = useState()

  const login = async function () {
    setUser(await signer.login())
  }

  useEffect(() => {
    const nodeUrl = 'https://nodes-testnet.wavesnodes.com'
    const signer = new Signer({ NODE_URL: nodeUrl })

    let provider = new ProviderWeb('https://testnet.waves.exchange/signer/')

    console.log(window.KeeperWallet)
    if (window.WavesKeeper) {
      provider = new ProviderKeeper()
    }

    signer.setProvider(provider)

    setSigner(signer)
    setProvider(provider)
  }, [])

  return [user, signer, provider, setUser, login]
}

export default useSigner
