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
  private readonly _message: string
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

  protected constructor(options: SignatureOptions) {
    this._message = options.message
    this._signature = options.signature
    this._signer = options.signer
  }

  abstract verify(): Promise<boolean>
}
