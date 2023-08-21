import { useState } from "react";
import { NextPage } from "next";
import { Button, Input, message } from "antd";
import cryptoJs from 'crypto-js';
import { useRouter } from "next/router";
import styles from './index.module.scss';
import request from "@/service/fetch";

const AdminLogin: NextPage = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const confirmLogin = async () => {
    const parsedPwd = cryptoJs.SHA256(password).toString();
    const res: any = await request.post('/api/adminLogin', { username, password: parsedPwd });
    if (res.code === 0) {
      const redir: any = router.query?.redir;
      if (redir) {
        router.replace(redir);
      } else {
        router.replace('/');
      }
    } else {
      message.error(res.msg);
    }
  }
  return <div className={styles.pageContent}>
    <div className={styles.loginTitle}>用户名</div>
    <Input onChange={e => setUsername(e.target.value)} className={styles.loginInput} placeholder="请输入用户名"></Input>
    <div className={styles.loginTitle}>密码</div>
    <Input.Password onChange={e => setPassword(e.target.value)} className={styles.loginInput} placeholder="请输入密码"></Input.Password>
    <Button onClick={confirmLogin} className={styles.loginButton}>登录</Button>
  </div>
};

export default AdminLogin;
