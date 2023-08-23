import { NextPage } from "next";
import styles from './index.module.scss';

const Advert: NextPage = () => {
  return <div className={styles.pageContent}>
    <ul className={styles.infoContent}>
      <li>京林堂拥有稳定的谷歌搜索引擎排名，打破传统推广方式，我们拥有全新化多样化的推广方式。</li>
      <li>让您花不到一套服务的价格一本万利。</li>
      <li>服务周到及时，提交问题1小时内必有回复。工作时间为早9点——晚24点。</li>
      <li>工作时间内可解决或修改一切合理的商户问题。</li>
      <li>京林堂团队遵循以人为本诚信至上，您有问题我解决！让您安心放心创收。</li>
      <li>京林堂您值得信赖的推广团队。</li>
      <li>有意者请联系我们，联系请备注来意</li>
      <li>QQ：3584893191<em />   WX：kuiluo871017</li>
    </ul>
  </div>
}

export default Advert;
