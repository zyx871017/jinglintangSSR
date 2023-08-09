import { NextApiRequest, NextApiResponse } from "next";
import { AppDataSource } from '@/db/index';
import { Topic } from "@/db/entity/Topic";

async function getArticleList(req: NextApiRequest, res: NextApiResponse) {
  // await AppDataSource.initialize();
  // const topicRepo = AppDataSource.getRepository(Topic);
  // const articleList = await topicRepo
  //   .createQueryBuilder('Topic')
  //   .leftJoinAndSelect('Topic.tag', 'Tag')
  //   .where('Topic.tagId=Tag.id').getMany();
  res.status(200).json({ code: 0, data: [], msg: 'success' });
}

export default getArticleList;
