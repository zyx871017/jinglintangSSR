import { NextPage } from "next";
import styles from './index.module.scss';
import CommentItem from "@/components/CommentItem";
import Pagination from "@/components/Pagination";
import { fetchTopicCommentList } from "@/service/topicDetail";

export async function getServerSideProps(ctx: any) {
  const query = ctx.query
  let pageNo = 1;
  if (!isNaN(Number(query.pageNo))) {
    pageNo = Number(query.pageNo);
  }
  const res: any = await fetchTopicCommentList({ pageNo, pageSize: 10 });
  const { records, total } = JSON.parse(JSON.stringify(res.data));
  return {
    props: {
      commentList: records,
      total,
      pageNo
    }
  }
}

interface IProps {
  commentList: any[];
  total: number;
  pageNo: number;
}

const CommentList: NextPage<IProps> = (props) => {
  const { commentList, total, pageNo } = props;
  return <div className={styles.pageContent}>
    <div className={styles.commentContent}>
      <div className={styles.titleContent}>
        <span className={styles.title}>网友评价</span>
      </div>
      <div className={styles.commentList}>
        {commentList.map(comment => <CommentItem key={comment.commentContentVo.id} comment={comment} />)}
      </div>
    </div>
    <Pagination query={{}} baseUrl="/commentList" total={total} pageNo={pageNo} onChange={() => { }} />
  </div>
}

export default CommentList;
