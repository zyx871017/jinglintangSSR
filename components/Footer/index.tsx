import styles from './index.module.scss';
import Link from 'next/link';

const Footer = () => {
  return <div className={styles.footerContent}>
    <div className={styles.footerNav}>
      <Link className={styles.navLink} href="/aboutUs">关于我们</Link>
      <i className={styles.linkDivider}></i>
      <Link className={styles.navLink} href="/advert">广告服务</Link>
      <i className={styles.linkDivider}></i>
      <Link className={styles.navLink} href="/connectUs">联系我们</Link>
      <i className={styles.linkDivider}></i>
      <Link className={styles.navLink} href="/cooperate">业务合作</Link>
    </div>
    <i className={styles.navDivider}></i>
    <div className={styles.footerText}>免责申明：会员言论仅代表个人观点，本站不承担由此引起的法律责任</div>
    <div className={styles.footerText}>不良信息监督举报邮箱及电话：1271889202@qq.com</div>
  </div>
}

export default Footer;
