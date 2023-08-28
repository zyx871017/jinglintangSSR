import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import logoImage from '@/public/jinglintang.jpg';
import styles from './index.module.scss';
import request from '@/service/fetch';

const Navbar = () => {
  const { pathname, replace, reload } = useRouter();
  const [search, setSearch] = useState('');
  const [username, setUsername] = useState('');
  const navList = [
    { href: '/', title: '首页' },
    { href: '/topic/allTopic', title: '所有商家' },
    { href: '/coupon', title: '优惠' },
    { href: '/joinUs', title: '加入' },
    { href: '/commentList', title: '评论' }
  ]

  const getUsername = async () => {
    const res: any = await request.get('/api/getUsername');
    if (res.code === 0) {
      setUsername(res.data);
    }
  }

  useEffect(() => {
    getUsername();
  }, [pathname]);

  const handleLogin = () => {
    replace(`/login?redir=${pathname}`)
  }

  const handleLogout = async () => {
    const res: any = await request.get('/api/logout');
    document.cookie = '';
    if (res.code === 0) {
      reload();
    }
  }
  return <header className={styles.navbar}>
    <div className={styles.usernameContent}>
      {username ? <>
        <span className={styles.username}>{username}</span>
        <span onClick={handleLogout} className={styles.userButton}>登出</span>
      </> : <>
        <span className={styles.username}>未登入</span>
        <span onClick={handleLogin} className={styles.userButton}>登入</span>
      </>}
    </div>
    <div className={styles.navContent}>
      <Link href="/" className={styles.logoContent}>
        <Image width={44} height={44} src={logoImage} alt="" />
      </Link>
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
