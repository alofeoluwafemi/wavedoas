import joi from 'joi'
import { ProposalStrategies, ProposalValidator, ProposalWriterCreateInput } from 'proposals/logic/proposalWriter'

export class ProposalStoreValidator implements ProposalValidator {
  async validate(input: ProposalWriterCreateInput, authors: string[]): Promise<void> {
    const schema = joi.object({
      space: joi.string().required(),
      title: joi.string().required(),
      body: joi.string().required(),
      choices: joi.array().min(1),
      from: joi
        .string()
        .required()
        .valid(...authors),
      timestamp: joi.number().required(),
      discussion: joi.string(),
      start: joi.number().required(),
      end: joi.number().required(),
      type: joi.string().valid(...Object.values(ProposalStrategies)),
    })

    await schema.validateAsync(input)
  }
}
