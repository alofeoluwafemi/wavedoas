import { Signer } from '@waves/signer'
import { ProviderWeb } from '@waves.exchange/provider-web'
import { nodeInteraction } from '@waves/waves-transactions'
import React, { useState, useEffect } from 'react'

function useSigner() {
  const [signer, setSigner] = useState()
  const [provider, setProvider] = useState()
  const [user, setUser] = useState()

  const login = async function () {
    try {
      const user = await signer.login()
      setUser(user)
    } catch (e) {
      console.error('Login rejected')
    }
  }

  useEffect(() => {
    const nodeUrl = 'https://nodes-testnet.wavesnodes.com'
    const signer = new Signer({ NODE_URL: nodeUrl })
    const provider = new ProviderWeb('https://testnet.waves.exchange/signer/')

    signer.setProvider(provider)

    setSigner(signer)
    setProvider(provider)
  }, [])

  return [signer, provider, user, login]
}

export default useSigner