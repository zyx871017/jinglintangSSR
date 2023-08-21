import { NextApiRequest, NextApiResponse } from "next";

async function upload(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ data: '', code: 0, msg: 'success' });
}

export default upload;
