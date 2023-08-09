import { NextApiRequest, NextApiResponse } from "next";
import { AppDataSource } from '@/db/index';
import { Topic } from "@/db/entity/Topic";
import { TopicFavorite0 } from "@/db/entity/TopicFavorite0";

async function setFavorite0(req: NextApiRequest, res: NextApiResponse) {
  const { topicId } = req.body;
  // await AppDataSource.initialize();
  // const topicRepo = AppDataSource.getRepository(Topic);
  // const topic = await topicRepo.findOne({ where: { id: topicId } });
  // const topicFavorite0 = new TopicFavorite0();
  // topicFavorite0.addtime = new Date().toISOString();
  // topicFavorite0.topicId = topicId;
  // if (topic) {
  //   topicFavorite0.topic = topic;
  // }
  // await AppDataSource.manager.save(topicFavorite0);
  res.status(200).json({ code: 0, msg: 'success' });
}

export default setFavorite0;
