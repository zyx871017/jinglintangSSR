import { NextApiRequest, NextApiResponse } from "next";
import { Cookie } from 'next-cookie';

async function logoutApi(req: NextApiRequest, res: NextApiResponse) {
  const cookies = Cookie.fromApiRoute(req, res);
  cookies.remove('username', { maxAge: 0 });
  cookies.remove('uid', { maxAge: 0 });
  res.status(200).json({ code: 0, msg: 'success' });
}

export default logoutApi;
