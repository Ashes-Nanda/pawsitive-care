import { testGeminiConnection } from '../../utils/geminiService'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await testGeminiConnection()
    res.status(200).json({ success: true, response })
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ success: false, error: error.message })
    } else {
      res.status(500).json({ success: false, error: 'An unknown error occurred' })
    }
  }
}