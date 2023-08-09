import Link from 'next/link';
import styles from './index.module.scss';
import classNames from 'classnames';


interface IProps {
  onChange: Function;
  total: number;
  pageNo: number;
  baseUrl?: string;
}

const Pagination = (props: IProps) => {
  const pageSize = 10;
  const { pageNo, total, baseUrl = '/topic/allTopic' } = props;
  const totalPage = Math.ceil(total / pageSize);

  const renderLastButton = () => {
    if (pageNo === 1) {
      return null;
    } else {
      return <Link
        className={styles.pageButton}
        href={`${baseUrl}?pageNo=${pageNo - 1}`}
      >上一页</Link>
    }
  }

  const renderNextButton = () => {
    if (pageNo === totalPage) {
      return null;
    } else {
      return <Link
        className={styles.pageButton}
        href={`${baseUrl}?pageNo=${pageNo + 1}`}
      >下一页</Link>
    }
  }

  const renderLeftDot = () => {
    if (totalPage < 7 || pageNo < 5) {
      return null;
    }
    return <span style={{ marginLeft: 6 }}>...</span>;
  }

  const renderRightDot = () => {
    if (totalPage < 7 || pageNo > totalPage - 4) {
      return null;
    }
    return <span style={{ marginLeft: 6 }}>...</span>;
  }

  const getMiddleNumber = () => {
    const result = [];
    if (totalPage === 1) {
      result.push(1);
    } else if (totalPage < 8 && totalPage > 1) {
      for (let i = 2; i < totalPage - 1; i++) {
        result.push(i);
      }
    } else if (pageNo < 4) {
      for (let i = 2; i <= 5; i++) {
        result.push(i);
      }
    } else if (pageNo > totalPage - 3) {
      for (let i = totalPage - 4; i < totalPage; i++) {
        result.push(i);
      }
    } else {
      for (let i = pageNo - 2; i <= pageNo + 2; i++) {
        result.push(i);
      }
    }

    return result;
  }

  const middleNoList = getMiddleNumber();
  return <div className={styles.pageContent}>
    {renderLastButton()}
    <Link className={classNames({ [styles.pageButton]: true, [styles.active]: pageNo === 1 })} href="">1</Link>
    {renderLeftDot()}
    {middleNoList.map(no => <Link
      key={no}
      className={classNames({
        [styles.pageButton]: true,
        [styles.active]: pageNo === no
      })}
      href={`${baseUrl}?pageNo=${no}`}
    >{no}</Link>)}
    {renderRightDot()}
    <Link
      className={classNames({
        [styles.pageButton]: true,
        [styles.active]: pageNo === totalPage
      })}
      href={`${baseUrl}?pageNo=${totalPage}`}>{totalPage}</Link>
    {renderNextButton()}
  </div>
}

export default Pagination;
