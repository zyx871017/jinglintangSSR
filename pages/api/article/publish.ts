import { NextApiRequest, NextApiResponse } from 'next';

async function publish(req: NextApiRequest, res: NextApiResponse) {
  const { title, content } = req.body;
}
