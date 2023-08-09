import { useState } from 'react';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from './index.module.scss';

const Navbar = () => {
  const { pathname } = useRouter();
  const [search, setSearch] = useState('');
  const navList = [
    { href: '/', title: '首页' },
    { href: '/topic/allTopic', title: '所有商家' },
    { href: '/coupon', title: '优惠' },
    { href: '/joinUs', title: '加入' },
    { href: '/commentList', title: '评论' }
  ]
  return <header className={styles.navbar}>
    <div className={styles.navContent}>
      <div className={styles.logoContent}>京林堂</div>
      <div className={styles.searchContent}>
        <input
          value={search}
          className={styles.searchInput}
          type="text"
          placeholder="搜索商家"
          onChange={e => setSearch(e.target.value)}
        />
        <Link href={search ? `/searchTopic?search=${search}` : '/topic/allTopic'} className={styles.searchButton} >搜索</Link>
      </div>
      <div className={styles.publishContent}>
        <Link href="/storePublish" className={styles.publishButton}>免费发布信息</Link>
      </div>
    </div>
    <div className={styles.navMenuContent}>
      <div className={styles.navMenu}>
        {navList.map((nav, i) => <Link
          key={i}
          href={nav.href}
          className={classNames({
            [styles.navButton]: true,
            [styles.active]: nav.href === pathname
          })}
        >{nav.title}</Link>)}
      </div>
    </div>
  </header>;
}

export default Navbar;
