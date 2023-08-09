import { NextPage } from "next";
import Link from "next/link";
import Image from 'next/image';
import classNames from "classnames";
import Pagination from "@/components/Pagination";
import { tagList } from "@/constant/allTopicData";
import { allTopicList } from "@/constant/couponData";
import { topicType } from "..";
import styles from './index.module.scss';

export async function getServerSideProps(ctx: any) {
  const query = ctx.query
  let pageNo = 1;
  if (!isNaN(Number(query.pageNo))) {
    pageNo = Number(query.pageNo);
  }
  return {
    props: {
      tagList,
      allTopicList,
      pageNo
    }
  }
}

interface IProps {
  tagList: { id: number, title: string }[];
  allTopicList: topicType[];
  total: number;
  pageNo: number;
}

const Coupon: NextPage<IProps> = (props: IProps) => {
  const { tagList, total = 212, pageNo = 5 } = props;
  return <div className={styles.pageContent}>
    <div className={styles.filterContent}>
      <div className={classNames(styles.filterTag, styles.active)}>不限</div>
      {tagList.map(tag => <div className={styles.filterTag} key={tag.id}>{tag.title}</div>)}
    </div>
    <div className={styles.listContent}>
      {allTopicList.map(topic => <div key={topic.id} className={styles.topicContent}>
        <div className={styles.imageContent}>
          <Link href={`/topic/${topic.id}`}>
            <Image width={175} height={130} alt="" src={topic.image}></Image>
          </Link>
        </div>
        <div className={styles.rightContent}>
          <Link href={`/topic/${topic.id}`}>
            <div className={styles.topicTitle}>{topic.title}</div>
          </Link>
          <div className={styles.infoRow}>
            <span className={styles.infoRate}>{topic.rate}分</span>
            <Link href={`/topic/${topic.id}`}>
              <span className={styles.infoComment}>{topic.commentCount}条评价</span>
            </Link>
          </div>
          <div className={styles.infoRow}>
            <Link href={`/topic/${topic.id}`}>
              <span className={styles.infoAddress}>{topic.address}</span>
            </Link>
          </div>
          <div className={styles.infoRow}>
            <Link href={`/topic/${topic.id}`}>
              <span className={styles.coupon}>优惠:{topic.coupon}</span>
            </Link>
          </div>
          <div className={styles.infoRow}>
            <Link href={`/topic/${topic.id}`}>
              <span className={styles.couponTime}>优惠截止日期:{topic.couponTime}</span>
            </Link>
          </div>
        </div>
      </div>)}
    </div>
    <Pagination total={total} pageNo={pageNo} onChange={() => { }} />
  </div>
}

export default Coupon;
