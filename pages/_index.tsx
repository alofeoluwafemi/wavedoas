import Image from 'next/image'
import styles from 'styles/Home.module.css'
import { ProviderKeeper } from '@waves/provider-keeper'
import { Signer } from '@waves/signer'
import { useState } from 'react'
import axios from 'axios'

export default function Home({ space }: { space: object }) {
  console.log(space, 2)
  const [address, setAddress] = useState<string>('')
  const [msg, setMsg] = useState<string>('')
  const testSign = async (value: object) => {
    const signer = new Signer({
      // Specify URL of the node on Testnet
      NODE_URL: 'https://nodes-testnet.wavesnodes.com',
    })
    const provider = new ProviderKeeper()

    await signer.setProvider(provider)

    const userData = await signer.login()
    const signature = await signer.signMessage(JSON.stringify(value))

    setMsg(signature)
    setAddress(userData.publicKey)

    console.log(signature, userData.publicKey)

    return true
  }
  testShow()

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <button
          onClick={() => testSign({ name: 'Test Dao', controller: '2rJ1AQ2M8tW5tdEyhBG55XFgg7NwuHvYVDCSScWVV7y6' })}
        >
          Sign message
        </button>
        Signed message: <input type="text" defaultValue={msg} />
        Address: <input type="text" defaultValue={address} />
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
        <p className={styles.description}>
          Get started by editing <code className={styles.code}>pages/index.tsx</code>
        </p>
        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a href="https://github.com/vercel/next.js/tree/canary/examples" className={styles.card}>
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>Instantly deploy your Next.js site to a public URL with Vercel.</p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

async function testIpfs() {
  const response = await axios({
    method: 'get',
    url: `https://gateway.pinata.cloud/ipfs/${'QmVFHSuYDXD4s7nhhuTAp4douyinatb1r5qJpJjo99Lp11'}`,
  })
  console.log(response.data)
}

async function testShow() {
  const res = await fetch(`http://localhost:3000/api/spaces/show?slug=test-dao`)
  const space = await res.json()
  console.log(space)
}
