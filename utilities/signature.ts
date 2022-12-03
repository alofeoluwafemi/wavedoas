import { MetamaskSignatureVerifier, WaveSignatureVerifier } from 'web3/waves/signatureVerifier'
import { SignatureVerifier, SignatureVerifierOptions, SignedMessageMode } from 'spaces/adapters/signatureVerifier'

export function makeVerifierFromInput(options: SignatureVerifierOptions): SignatureVerifier {
  return options.mode === SignedMessageMode.METAMASK
    ? new MetamaskSignatureVerifier(options)
    : new WaveSignatureVerifier(options)
}
