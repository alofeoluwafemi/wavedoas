import { recoverTypedSignature } from '@metamask/eth-sig-util'
import { wavesAddress2eth } from '@waves/node-api-js'
import { stringToBytes, verifySignature } from '@waves/ts-lib-crypto'
import { SignatureOptions, SignatureVerifier, SignedMessageMode } from 'spaces/adapters/signatureVerifier'
import { NodeEnvironment } from '../../spaces/logic/spaceCreator'

export class MetamaskSignatureVerifier extends SignatureVerifier {
  public mode: SignedMessageMode = SignedMessageMode.METAMASK

  static makeFromOptions(signatureOptions: SignatureOptions) {
    return new this(signatureOptions)
  }

  async verify(): Promise<boolean> {
    // @ts-ignore
    const recovered = recoverTypedSignature({ data: this.data(), signature: this.signature, version: 'V4' })

    return recovered === wavesAddress2eth(this.signer)
  }

  private data(): any {
    const char = NodeEnvironment.isProduction() ? 'W' : 'T'
    return {
      types: {
        EIP712Domain: [
          {
            name: 'chainId',
            type: 'uint256',
          },
        ],
        Message: [
          {
            name: 'text',
            type: 'string',
          },
        ],
      },
      domain: {
        chainId: char.charCodeAt(0),
      },
      primaryType: 'Message',
      message: {
        text: this.message,
      },
    }
  }
}

export class WaveSignatureVerifier extends SignatureVerifier {
  async verify(): Promise<boolean> {
    const uint8Array = stringToBytes(this.message)
    // @ts-ignore
    return verifySignature(this.signer, [255, 255, 255, 1, ...uint8Array], this.signature)
  }

  static makeFromOptions(signatureOptions: SignatureOptions) {
    return new this(signatureOptions)
  }
}
