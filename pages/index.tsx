import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import { RightOutlined } from '@ant-design/icons';
import { Image as AntImage } from 'antd';
import Banner from '@/components/Banner';
import styles from './index.module.scss';
import { useStore } from '@/store';
import hotIcon from '@/public/hot.png';
import mastIcon from '@/public/mast.png';
import request from '@/service/fetch';
import { fallImage } from '@/constant';

export type topicType = {
  id: number;
  title: string;
  score: number;
  address: string;
  commentTotal: number;
  imgUrl: string;
}

interface IProps {
  hotTopicList: topicType[];
  mastTopicList: topicType[];
  recommendList: topicType[];
}

export async function getServerSideProps() {
  const url = `http://${process.env.SERVICE_HOST}/jlt-api-web/`;
  const data = await request.get(url);
  const { hot: hotTopicList, recommend: mastTopicList, bottom: recommendList } = data.data;
  return {
    props: {
      hotTopicList,
      mastTopicList,
      recommendList
    }
  };
}

export default function Home(props: IProps) {
  const { hotTopicList, mastTopicList, recommendList: [mainTopic, ...otherTopicList] } = props;
  const store = useStore();
  useEffect(() => {
    store.user.setUserInfo({ nickname: 'test' });
  }, []);
  const data = [{
    title: '测试',
    image: 'https://s3.ap-southeast-1.amazonaws.com/jinglintang.club.fun.images/public/2023/08/24/138551692866304.jpg'
  }]

  return (
    <div className={styles.mainContent}>
      <Banner data={data} />
      <div className={styles.rowCard}>
        <div className={styles.hotCard}>
          <div className={styles.titleContent}>
            <div className={styles.leftContent}>
              <Image src={hotIcon} className={styles.cardIcon} alt="" />
              <span>热门推荐</span>
            </div>
            <div className={styles.rightContent}>
              <Link className={styles.moreLink} href="/topic/allTopic">全部商家</Link>
              <RightOutlined className={styles.moreIcon} />
            </div>
          </div>
          <div className={styles.cardContent}>
            {hotTopicList.map(topic => <Link href={`/topic/${topic.id}`} className={styles.topicContent} key={topic.id}>
              <div className={styles.topicImage}>
                <AntImage preview={false} fallback={fallImage} width={170} height={120} src={topic.imgUrl} alt=""></AntImage>
              </div>
              <div className={styles.topicInfoContent}>
                <div className={styles.title}>{topic.title}</div>
                <div className={styles.infoRow}>
                  <span className={styles.infoRate}>{topic.score}分</span>
                  <span className={styles.infoComment}>{topic.commentTotal}条评价</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.address}>{topic.address}</span>
                </div>
              </div>
            </Link>)}
          </div>
        </div>
        <div className={styles.hotCard}>
          <div className={styles.titleContent}>
            <div className={styles.leftContent}>
              <Image src={mastIcon} className={styles.cardIcon} alt="" />
              <span>站长推荐</span>
            </div>
            <div className={styles.rightContent}>
              <Link className={styles.moreLink} href="/topic/allTopic">全部商家</Link>
              <RightOutlined className={styles.moreIcon} />
            </div>
          </div>
          <div className={styles.cardContent}>
            {mastTopicList.map(topic => <Link href={`/topic/${topic.id}`} className={styles.topicContent} key={topic.id}>
              <div className={styles.topicImage}>
                <AntImage preview={false} fallback={fallImage} width={170} height={120} src={topic.imgUrl} alt=""></AntImage>
              </div>
              <div className={styles.topicInfoContent}>
                <div className={styles.title}>{topic.title}</div>
                <div className={styles.infoRow}>
                  <span className={styles.infoRate}>{topic.score}分</span>
                  <span className={styles.infoComment}>{topic.commentTotal}条评价</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.address}>{topic.address}</span>
                </div>
              </div>
            </Link>)}
          </div>
        </div>
      </div>
      <div className={styles.recommendCard}>
        <div className={styles.titleContent}>
          <div className={styles.leftContent}>
            <Image src={hotIcon} className={styles.cardIcon} alt="" />
            <span>热门推荐</span>
          </div>
          <div className={styles.rightContent}>
            <Link className={styles.moreLink} href="/topic/allTopic">全部商家</Link>
            <RightOutlined className={styles.moreIcon} />
          </div>
        </div>
        <div className={styles.topicContent}>
          <Link href={`/topic/${mainTopic.id}`} className={styles.mainCard}>
            <div className={styles.mainCardImage}>
              <AntImage preview={false} fallback={fallImage} width={440} height={340} src={mainTopic.imgUrl} alt="" ></AntImage>
            </div>
            <div className={styles.mainCardInfo}>
              <div className={styles.mainCardTitle}>{mainTopic.title}</div>
              <div className={styles.mainInfoRow}>
                <span className={styles.mainInfoRate}>{mainTopic.score}分</span>
                <span className={styles.mainInfoComment}>{mainTopic.commentTotal}条评价</span>
              </div>
              <div className={styles.mainInfoRow}>
                <span className={styles.mainAddress}>{mainTopic.address}</span>
              </div>
            </div>
          </Link>
          <div className={styles.otherTopicContent}>
            {otherTopicList.map(topic => <Link href={`/topic/${topic.id}`} key={topic.id} className={styles.otherCard}>
              <div className={styles.otherCardImage}>
                <AntImage preview={false} fallback={fallImage} width={220} height={165} src={topic.imgUrl} alt="" ></AntImage>
              </div>
              <div className={styles.otherCardInfo}>
                <div className={styles.otherCardTitle}>{topic.title}</div>
                <div className={styles.otherInfoRow}>
                  <span className={styles.otherInfoRate}>{topic.score}分</span>
                  <span className={styles.otherInfoComment}>{topic.commentTotal}条评价</span>
                </div>
                <div className={styles.otherInfoRow}>
                  <span className={styles.otherAddress}>{topic.address}</span>
                </div>
              </div>
            </Link>)}
          </div>
        </div>
      </div>
    </div>
  )
}
