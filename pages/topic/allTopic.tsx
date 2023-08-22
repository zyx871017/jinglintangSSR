import { NextPage } from "next";
import Link from "next/link";
import { Image as AntImage } from "antd";
import styles from './index.module.scss';
import classNames from "classnames";
import { topicType } from "..";
import Pagination from "@/components/Pagination";
import { fetchTagList } from "@/service/topicDetail";
import request from "@/service/fetch";
import { fallImage } from "@/constant";

export async function getServerSideProps(ctx: any) {
  const query = ctx.query;
  const tagQuery: number = query.tag ? Number(query.tag) : 0;
  const tagListData = await fetchTagList();
  const tagList = tagListData.data;
  const currentTag = tagList.find((tag: any) => tag.id === tagQuery);
  let pageNo = 1;
  if (!isNaN(Number(query.pageNo))) {
    pageNo = Number(query.pageNo);
  }
  const params = {
    isStaff: false,
    pageNo,
    pageSize: 10,
    tagId: currentTag?.id || ''
  };
  const data = await request.post(`http://${process.env.SERVICE_HOST}/jlt-api-web/topic/page`, params);
  const { records, total, current } = data.data;
  return {
    props: {
      tagList: tagListData.data,
      allTopicList: records,
      total,
      pageNo: current,
      tagStr: currentTag?.name || '不限',
      tagId: currentTag?.id || ''
    }
  }
}

interface IProps {
  tagList: { id: number, name: string }[];
  allTopicList: topicType[];
  total: number;
  pageNo: number;
  tagStr: string;
  tagId: string;
}

const AllTopic: NextPage<IProps> = (props: any) => {
  const { tagList, total = 212, pageNo = 5, tagId, allTopicList } = props;

  return <div className={styles.pageContent}>
    <div className={styles.filterContent}>
      <Link href="/topic/allTopic" className={classNames({ [styles.filterTag]: true, [styles.active]: !tagId })}>不限</Link>
      {tagList.map((tag: any) => <Link href={`/topic/allTopic?tag=${tag.id}`} className={classNames({ [styles.filterTag]: true, [styles.active]: tag.id === Number(tagId) })} key={tag.id}>{tag.name}</Link>)}
    </div>
    <div className={styles.listContent}>
      {allTopicList.map((topic: any) => <div key={topic.id} className={styles.topicContent}>
        <div className={styles.imageContent}>
          <Link href={`/topic/${topic.id}`}>
            <AntImage fallback={fallImage} preview={false} width={175} height={130} alt="" src={topic.imgUrl || ''}></AntImage>
          </Link>
        </div>
        <div className={styles.rightContent}>
          <Link href={`/topic/${topic.id}`}>
            <div className={styles.topicTitle}>{topic.title}</div>
          </Link>
          <div className={styles.infoRow}>
            <span className={styles.infoRate}>{topic.score}分</span>
            <Link href={`/topic/${topic.id}`}>
              <span className={styles.infoComment}>{topic.commentTotal}条评价</span>
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
    <Pagination query={{ tag: tagId }} total={total} pageNo={pageNo} onChange={() => { }} />
  </div>;
}

export default AllTopic;
