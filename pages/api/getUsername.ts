import { NextApiRequest, NextApiResponse } from "next";
import { Cookie } from 'next-cookie';

async function getUsernameApi(req: NextApiRequest, res: NextApiResponse) {
  const cookies = Cookie.fromApiRoute(req, res);
  const uid = cookies.get('uid');
  const username = cookies.get('username');
  res.status(200).json({ code: 0, data: uid ? username : '', msg: 'success' });
}

export default getUsernameApi;
