import { useState } from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import moment from 'moment';
import boyImage from '@/public/boy-1.png';
import styles from './index.module.scss';
import downIcon from '@/public/down.png';
interface IProps {
  comment: any
}

const CommentItem = (props: IProps) => {
  const { comment } = props;
  const [opening, setOpening] = useState<boolean>(false);
  const textCollapseChange = () => {
    setOpening(!opening);
  }
  return <div key={comment.id} className={styles.commentItem}>
    <div className={styles.commentAvatar}>
      <Image width={60} height={60} alt="" src={comment.userAvatar || boyImage}></Image>
    </div>
    <div className={styles.rightContent}>
      <div className={styles.username}>{comment.userListVo.userName}</div>
      <div className={styles.infoRate}>{comment.rate || 4.3}分</div>
      <p className={classNames({
        [styles.commentText]: true,
        [styles.textOpening]: opening
      })}>{comment.commentContentVo.content}</p>
      <div onClick={textCollapseChange} className={styles.collapseButton}>
        {opening ? '收起评价' : '展开评价'}
        <Image className={classNames({
          [styles.downIcon]: true,
          [styles.iconOpening]: opening
        })} alt="" src={downIcon}></Image>
      </div>
      {comment.images && comment.images.length ? <div className={styles.imageList}>
        {comment.images?.map((img: string, i: number) => <Image className={styles.commentImage} key={i} alt="" src={img}></Image>)}
      </div> : null}
      <div className={styles.commentTime}>{moment(comment.commentContentVo.postTime).format('YYYY-MM-DD HH:mm:ss')}</div>
    </div>
  </div>
}

export default CommentItem;
