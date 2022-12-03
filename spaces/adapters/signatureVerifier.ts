import { MetamaskSignatureVerifier, WaveSignatureVerifier } from 'web3/waves/signatureVerifier'

export enum SignedMessageMode {
  METAMASK = 'METAMASK',
  WAVE = 'WAVE',
}

export type SignatureOptions = {
  signer: string
  message: string
  signature: string
  mode: SignedMessageMode
}

export abstract class SignatureVerifier {
  private _message: string
  private readonly _signature: string
  private readonly _signer: string
  public mode: SignedMessageMode = SignedMessageMode.WAVE

  get message(): string {
    return this._message
  }

  get signature(): string {
    return this._signature
  }

  get signer(): string {
    return this._signer
  }

  public constructor(options: SignatureOptions) {
    this._message = options.message
    this._signature = options.signature
    this._signer = options.signer
  }

  abstract verify(): Promise<boolean>

  verifyObjectMessage(message: object): Promise<boolean> {
    this._message = JSON.stringify(message)
    return this.verify()
  }

  getOptions(): SignatureOptions {
    return {
      message: this.message,
      mode: this.mode,
      signature: this.signature,
      signer: this.signer,
    }
  }
}

export function makeVerifierFromInput(signatureOptions: SignatureOptions): SignatureVerifier {
  return signatureOptions.mode === SignedMessageMode.METAMASK
    ? new MetamaskSignatureVerifier(signatureOptions)
    : new WaveSignatureVerifier(signatureOptions)
}
