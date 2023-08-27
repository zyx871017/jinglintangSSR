import { NextPage } from "next";
import { Row, Col, Table, Form, Button, Select, message, Modal, Input } from "antd";
import qs from 'qs';
import styles from './index.module.scss';
import { fetchAdminCommentList } from "@/service/adminManage";
import Pagination from "@/components/Pagination";
import { useRouter } from "next/router";
import { useState } from "react";
import request from "@/service/fetch";
import moment from "moment";
const { Option } = Select;

export async function getServerSideProps(ctx: any) {
  const query = ctx.query;
  const status: number = query.status ? Number(query.status) : 0;
  const topicId: number = query.topicId ? Number(query.tagId) : 0;
  let pageNo = 1;
  if (!isNaN(Number(query.pageNo))) {
    pageNo = Number(query.pageNo);
  }
  const params = {
    isStaff: false,
    pageNo,
    topicId: topicId || undefined,
    status: status || undefined,
    pageSize: 20
  };
  console.log(params);
  const resData = await fetchAdminCommentList(params);
  const { data: { records, total } } = resData;
  return {
    props: {
      allCommentList: records.map((item: any) => ({ ...item.commentContentVo, userName: item.userListVo.userName })),
      total,
      pageNo,
      status,
      topicId
    }
  }
}

interface IProps {
  allCommentList: any[];
  total: number;
  pageNo: number;
  topicId: number;
  status: string;
}

const CommentManage: NextPage<IProps> = (props) => {
  const { allCommentList, total, pageNo, topicId, status } = props;
  const [editOpen, setEditOpen] = useState(false);
  const [idEdit, setIsEdit] = useState(false);
  const [editingTopic, setEditingTopic] = useState<any>({});
  const router = useRouter();
  const columns: any = [
    {
      title: '评论内容',
      dataIndex: 'content',
      key: 'content',
      align: 'left',
      width: 400,
      ellipsis: true
    },
    {
      title: '评分',
      dataIndex: 'score',
      key: 'score',
      align: 'right'
    },
    {
      title: '发布时间',
      dataIndex: 'postTime',
      key: 'postTime',
      align: 'center',
      render: (value: Date) => moment(value).format('YYYY-MM-DD')
    },
    {
      title: '评论者',
      dataIndex: 'userName',
      key: 'userName',
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
      <Form colon={false} onFinish={submitSearch} initialValues={{ status, topicId: topicId || '' }}>
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
            <Form.Item label="所属商户" name="topicId">
              <Input placeholder="请输入商户Id" style={{ width: '100%' }} />
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
        dataSource={allCommentList}
        rowKey="id"
        bordered
        pagination={false}
      />
      <Pagination pageNo={pageNo} query={{ topicId: topicId || undefined, status: status || undefined }} baseUrl="/_admin/manage/comment" onChange={() => { }} total={total} />
    </div>
  </div>
}

export default CommentManage;
