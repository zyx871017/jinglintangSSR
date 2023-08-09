import { NextPage } from "next";
import downIcon from '@/public/down.png';
import styles from './index.module.scss';
import { commentList, topicDetail, topicList } from "@/constant/topicDetailData";
import { topicType } from "..";
import Image from "next/image";
import { LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons";
import { useState } from "react";
import Link from "next/link";
import CommentItem from "@/components/CommentItem";
import Head from "next/head";

export async function getServerSideProps(ctx: any) {
  const id = Number(ctx.query.id);
  return {
    props: {
      topicList,
      topicDetail,
      commentList,
      id
    }
  }
}

interface IProps {
  id: number;
  topicList: topicType[];
  topicDetail: {
    title: string;
    rate: number
    commentCount: number;
    addressDetail: string;
    phone: string;
    weixin: string;
    qq: string;
    summary: string;
    openingHours: string;
    images: string[];
  };
  commentList: any[];
}

const TopicDetail: NextPage<IProps> = (props) => {
  const { id, topicDetail, commentList } = props;
  const [imgIndex, setImgIndex] = useState(0);

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
            <span className={styles.infoRate}>{topicDetail.rate}分</span>
            <span className={styles.infoComment}>{topicDetail.commentCount}条评价</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.baseInfo}>营业时间:{topicDetail.openingHours}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.baseInfo}>地址:{topicDetail.addressDetail}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.baseInfo}>电话:{topicDetail.phone}</span>
            <span className={styles.baseInfo}>微信:{topicDetail.weixin}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.baseInfo}>QQ:{topicDetail.qq}</span>
          </div>
          <div className={styles.divider}></div>
          <div className={styles.detailContent}>
            <span className={styles.baseInfo}>商家简介:{topicDetail.summary}</span>
          </div>
        </div>
        <div className={styles.rightContent}>
          <Image alt="" src={topicDetail.images[imgIndex]} width={320} height={210} />
          <LeftCircleOutlined className={styles.leftButton} />
          <RightCircleOutlined className={styles.rightButton} />
          <div className={styles.indexContent}>{imgIndex + 1} / {topicDetail.images.length}</div>
        </div>
      </div>
      <div className={styles.commentContent}>
        <div className={styles.titleContent}>
          <span className={styles.title}>网友评价</span>
          <span className={styles.commentCount}>({topicDetail.commentCount})</span>
        </div>
        <div className={styles.commentList}>
          {commentList.map(comment => <CommentItem key={comment.id} comment={comment} />)}
          <div className={styles.moreRow}>
            <Link href={`/commentList/${id}`} className={styles.moreButton}>更多评价({topicDetail.commentCount})</Link>
          </div>
        </div>
      </div>
    </div>
  </>
}

export default TopicDetail;
