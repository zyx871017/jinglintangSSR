import { NextPage } from "next";
import styles from './index.module.scss';

const AboutUs: NextPage = () => {
  return <div className={styles.pageContent}>
    <ul className={styles.infoContent}>
      <li>京林堂是北京娱乐养生精品指南网站，主要经营外链广告，周边养生娱乐推荐，信息广告等，是一家权威的，有着丰富经验的网络信息技术公司。</li>
      <li>本站是正规网站，拒绝一切法律禁止的行为，一经发现，提交当地公安部门审核！</li>
      <li>本网站为自由开放注册网站，会员发表内容仅代表个人观点，与本网站立场无关，相关责任请自行承担，注册协议中明示，如有侵权，请联系管理员删除。</li>
      <li>本站杜绝一切色情淫秽违法信息传播，一经核实严肃处理！</li>
      <li>京林堂诚挚寻找商家合作伙伴，进行双赢项目合作。 添加联系</li>
    </ul>
  </div>
}

export default AboutUs;
