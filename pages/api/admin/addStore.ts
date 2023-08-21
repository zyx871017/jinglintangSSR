import { fetchSaveStore } from "@/service/adminManage";
import { NextApiRequest, NextApiResponse } from "next";
import { Cookie } from 'next-cookie';

async function addStore(req: NextApiRequest, res: NextApiResponse) {
  const cookies = Cookie.fromApiRoute(req, res);
  const adid = cookies.get('adid');
  if (adid) {
    const body = req.body;
    const resData: any = await fetchSaveStore(body).catch(e => e);
    if (resData?.code === 200) {
      res.status(200).json({ code: 0, msg: 'success' });
    } else {
      res.status(200).json({ code: -1, msg: resData.msg });
    }
  } else {
    res.status(200).json({ code: 401, msg: '管理员未登录' });
  }
}

export default addStore;
