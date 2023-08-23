import { NextPage } from "next";
import styles from './index.module.scss';

const Advert: NextPage = () => {
  return <div className={styles.pageContent}>
    <ul className={styles.infoContent}>
      <li>有商务合作意向可与我们联系，联系请备注来意</li>
      <li>客服QQ：3584893191<em />    WX：kuiluo871017</li>
    </ul>
  </div>
}

export default Advert;
