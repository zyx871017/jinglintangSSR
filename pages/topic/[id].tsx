import { NextPage } from "next";
import Image from "next/image";
import { Image as AntImage } from 'antd';
import { LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons";
import { useState } from "react";
import Link from "next/link";
import CommentItem from "@/components/CommentItem";
import Head from "next/head";
import styles from './index.module.scss';
import hotImage from '@/public/hotImage.jpeg';
import { Button, Input, Rate } from "antd";
import request from "@/service/fetch";
import { fetchTopicCommentList } from "@/service/topicDetail";

export async function getServerSideProps(ctx: any) {
  const id = Number(ctx.query.id);
  const data = await request.post(`http://${process.env.SERVICE_HOST}/jlt-api-web/topic/detail`, { id });
  const { content } = data.data;
  const contentList = content?.split('<p><span>') || [];
  const detailList: string[] = [];
  contentList.forEach((str: string) => {
    const replaceStr = str.replace(/<\/span><\/p>/, '');
    const splitList = replaceStr?.split('：&nbsp;') || [];
    splitList.forEach((s: string) => detailList.push(s));
  });
  const topicDetail = {
    ...data.data,
    images: [data.data.imgUrl]
  }
  detailList.forEach((str: string, i: number) => {
    if (str === '地址') {
      topicDetail.addressDetail = detailList[i + 1];
    } else if (str === '电话') {
      topicDetail.phone = detailList[i + 1];
    } else if (str === '微信') {
      topicDetail.weixin = detailList[i + 1];
    } else if (str === 'QQ') {
      topicDetail.qq = detailList[i + 1];
    } else if (str === '营业时间') {
      topicDetail.openingHours = detailList[i + 1];
    } else if (str === '商户简介：') {
      topicDetail.summary = detailList[i + 1].split('<p>')[0];
    }
  });
  const commentListData = await fetchTopicCommentList({ topicId: id, pageSize: 10, pageNo: 1 });
  const commentList = commentListData.data.records;
  return {
    props: {
      topicDetail,
      commentList: JSON.parse(JSON.stringify(commentList)),
      id
    }
  }
}

interface IProps {
  id: number;
  topicDetail: {
    title: string;
    score: number
    commentCount: number;
    addressDetail: string;
    telephone: string;
    wechat: string;
    qq: string;
    summary: string;
    openingHours: string;
    images: string[];
  };
  commentList: any[];
}

const TopicDetail: NextPage<IProps> = (props: any) => {
  const { id, topicDetail, commentList } = props;
  const [imgIndex, setImgIndex] = useState(0);
  const [commentRate, setCommentRate] = useState(4.5);
  const [commentName, setCommentName] = useState('');
  const [commentText, setCommentText] = useState('');

  const publishComment = () => {

  }

  return <>
    <Head>
      <title>{topicDetail.title}-北京-京林堂养生会所</title>
      <meta name="keywords" content="北京会所,北京spa会所,北京养生会所,北京体验,北京娱乐休闲,北京点评,京林堂,北京京林堂" />
      <meta name="description" content={`${topicDetail.summary}-北京-京林堂养生会所`} />
    </Head>
    <div className={styles.pageContent}>
      <div className={styles.infoContent}>
        <div className={styles.leftContent}>
          <div className={styles.titleContent}>{topicDetail.title}</div>
          <div className={styles.infoRow}>
            <span className={styles.infoRate}>{topicDetail.score}分</span>
            <span className={styles.infoComment}>{topicDetail.commentTotal}条评价</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.baseInfo}>营业时间:{topicDetail.openingHour}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.baseInfo}>地址:{topicDetail.address}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.baseInfo}>电话:{topicDetail.telephone}</span>
            <span className={styles.baseInfo}>微信:{topicDetail.wechat}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.baseInfo}>QQ:{topicDetail.qq}</span>
          </div>
          <div className={styles.divider}></div>
          <div className={styles.detailContent}>
            <span className={styles.baseInfo}>商家简介:{topicDetail.description}</span>
          </div>
        </div>
        <div className={styles.rightContent}>
          <AntImage preview={false} alt="" src={topicDetail.imgUrl} width={320} height={210} />
          <LeftCircleOutlined className={styles.leftButton} />
          <RightCircleOutlined className={styles.rightButton} />
          <div className={styles.indexContent}>{imgIndex + 1} / {topicDetail.images.length}</div>
        </div>
      </div>
      <div className={styles.commentContent}>
        <div className={styles.titleContent}>
          <span className={styles.title}>网友评价</span>
          <span className={styles.commentCount}>({topicDetail.commentTotal})</span>
          <Link href={`/commentList/${id}`} className={styles.writeComment}>写评价</Link>
        </div>
        <div className={styles.commentList}>
          {commentList.map((comment: any) => <CommentItem key={comment.id} comment={comment} />)}
          <div className={styles.moreRow}>
            <Link href={`/commentList/${id}`} className={styles.moreButton}>更多评价({topicDetail.commentTotal})</Link>
          </div>
        </div>
      </div>
      <div className={styles.userComment}>
        <div className={styles.leftContent}>
          <div className={styles.commentAvatar}>
            <Image width={60} height={60} alt="" src={hotImage}></Image>
          </div>
        </div>
        <div className={styles.rightContent}>
          <Input className={styles.commentUser} onChange={e => setCommentName(e.target.value)} placeholder="匿名访客" />
          <Rate className={styles.rate} value={commentRate} onChange={setCommentRate} />
          <Input.TextArea onChange={e => setCommentText(e.target.value)} />
          <Button onClick={publishComment} className={styles.publishButton}>发表</Button>
        </div>
      </div>
    </div>
  </>
}

export default TopicDetail;
