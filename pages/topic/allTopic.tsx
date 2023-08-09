import { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import styles from './index.module.scss';
import { allTopicList, tagList } from "@/constant/allTopicData";
import classNames from "classnames";
import { topicType } from "..";
import Pagination from "@/components/Pagination";

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

const AllTopic: NextPage<IProps> = (props) => {
  const { tagList, total = 212, pageNo = 5 } = props;

  const pageChange = () => { }
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
        </div>
      </div>)}
    </div>
    <Pagination total={total} pageNo={pageNo} onChange={() => {}} />
  </div>;
}

export default AllTopic;
