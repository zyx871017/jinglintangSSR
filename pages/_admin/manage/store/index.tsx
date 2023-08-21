import { NextPage } from "next";
import { Row, Col, Table, Form, Button, Select, message, Modal } from "antd";
import qs from 'qs';
import styles from './index.module.scss';
import { fetchAdminStoreList, fetchTopicDetail } from "@/service/adminManage";
import Pagination from "@/components/Pagination";
import { fetchTagList } from "@/service/topicDetail";
import { useRouter } from "next/router";
import { useState } from "react";
import EditTopicDrawer from "@/components/EditTopicDrawer";
import request from "@/service/fetch";
const { Option } = Select;

export async function getServerSideProps(ctx: any) {
  const query = ctx.query;
  const status: number = query.status ? Number(query.status) : 0;
  const tagQuery: number = query.tagId ? Number(query.tagId) : 0;
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
    tagId: tagQuery || undefined,
    status: status || undefined,
    pageSize: 20
  };
  const resData = await fetchAdminStoreList(params);
  const { data: { records, total } } = resData;
  return {
    props: {
      tagList: tagListData.data,
      allTopicList: records,
      total,
      pageNo,
      status,
      tagStr: currentTag?.name || '不限',
      tagId: tagQuery
    }
  }
}

interface IProps {
  tagList: { id: number, name: string }[];
  allTopicList: any[];
  total: number;
  pageNo: number;
  tagStr: string;
  tagId: string;
  status: string;
}

const StoreManage: NextPage<IProps> = (props) => {
  const { allTopicList, total, pageNo, tagList, tagId, status } = props;
  const [editOpen, setEditOpen] = useState(false);
  const [idEdit, setIsEdit] = useState(false);
  const [editingTopic, setEditingTopic] = useState<any>({});
  const router = useRouter();

  const columns: any = [
    {
      title: '店铺名称',
      dataIndex: 'title',
      key: 'title',
      align: 'center'
    },
    {
      title: '评分',
      dataIndex: 'score',
      key: 'score',
      align: 'right'
    },
    {
      title: '优惠',
      dataIndex: 'coupon',
      key: 'coupon',
      align: 'center'
    },
    {
      title: '评论数',
      dataIndex: 'commentTotal',
      key: 'commentTotal',
      align: 'right'
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      render: (value: number) => {
        if (value === 10) {
          return '已删除';
        } else if (value === 20) {
          return '已发布';
        } else if (value === 30) {
          return '审核中';
        }
      }
    },
    {
      title: '操作',
      key: 'option',
      align: 'center',
      render: (record: any) => {
        return <>
          <Button onClick={() => editTopic(record)} type="link">编辑</Button>
          <Button onClick={() => deleteTopic(record)} type="link">删除</Button>
        </>
      }
    }
  ]

  const editTopic = async (record: any) => {
    const res: any = await request.post('/api/admin/getTopicDetail', { id: record.id });
    if (res.code === 0) {
      setEditingTopic(res.data);
      setEditOpen(true);
      setIsEdit(true);
    } else if (res.code === 401) {
      router.push(`/_admin/manage/login?redir=${router.pathname}`);
    } else {
      message.error(res.msg);
    }
  }

  const deleteTopic = (record: any) => {
    Modal.confirm({
      title: `确定要禁用商铺:${record.title}吗`,
      onOk: async () => {
        const res: any = await request.post('/api/admin/disableStore', { id: record.id });
        if (res.code === 0) {
          router.reload();
        } else {
          message.error(res.msg);
        }
      }
    })
  }

  const submitSearch = (values: any) => {
    values.status = values.status || undefined;
    values.tagId = values.tagId || undefined;
    router.replace(`/_admin/manage/store?${qs.stringify({
      ...values
    })}`)
  }

  const addStore = () => {
    setEditingTopic({});
    setIsEdit(false);
    setEditOpen(true);
  }

  return <div className={styles.pageContent}>
    <div className={styles.searchField}>
      <Form colon={false} onFinish={submitSearch} initialValues={{ status, tagId }}>
        <Row gutter={20}>
          <Col span={6}>
            <Form.Item label="状态" name="status">
              <Select style={{ width: '100%' }}>
                <Option value={0}>不限</Option>
                <Option value={10}>已删除</Option>
                <Option value={20}>已发布</Option>
                <Option value={30}>审核中</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="所属区域" name="tagId">
              <Select style={{ width: '100%' }}>
                <Option key={0} value={0}>不限</Option>
                {tagList.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
              </Select>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                搜索
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
    <div className={styles.tableContent}>
      <div className={styles.buttonContent}><Button type="primary" onClick={addStore}>添加商户</Button></div>
      <Table
        columns={columns}
        size="small"
        dataSource={allTopicList}
        rowKey="id"
        bordered
        pagination={false}
      />
      <Pagination pageNo={pageNo} query={{ tagId: tagId || undefined, status: status || undefined }} baseUrl="/_admin/manage/store" onChange={() => { }} total={total} />
    </div>
    <EditTopicDrawer editingDetail={editingTopic} onClose={() => setEditOpen(false)} isOpen={editOpen} tagList={tagList} isEdit={idEdit} />
  </div>
}

export default StoreManage;
