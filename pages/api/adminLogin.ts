import { fetchAdminLogin } from "@/service/login";
import { NextApiRequest, NextApiResponse } from "next";
import { Cookie } from 'next-cookie';

async function adminLoginApi(req: NextApiRequest, res: NextApiResponse) {
  const { username, password } = req.body;
  const resData = await fetchAdminLogin({ account: username, password });
  const { code, data, msg } = resData;
  if (code === 200) {
    const cookies = Cookie.fromApiRoute(req, res);
    const path = "/";
    const expires = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
    cookies.set('adid', data.id, { path, expires, httpOnly: true });
    cookies.set('username', data.account, { path, expires, httpOnly: true });
    res.status(200).json({ code: 0, msg: 'success' });
  } else {
    res.status(200).json({ code: -1, msg });
  }
}

export default adminLoginApi;
