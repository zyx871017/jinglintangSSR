import request from '@/service/fetch';
import { Button, Drawer, Form, Input, Select, Upload, UploadFile, UploadProps, message } from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const { Option } = Select;

interface IProps {
  isEdit: boolean;
  isOpen: boolean;
  onClose: any;
  tagList: { id: number; name: string; }[];
  editingDetail: any
}

const EditTopicDrawer = (props: IProps) => {
  const { isOpen, isEdit, tagList, editingDetail, onClose } = props;
  const [formIns] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
  ]);
  const router = useRouter();

  useEffect(() => {
    if (editingDetail.id) {
      formIns.setFieldsValue(editingDetail);
    } else {
      formIns.resetFields();
    }
  }, [editingDetail, formIns]);

  const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as any);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const confirmEdit = async () => {
    const data = formIns.getFieldsValue();
    data.score = data.score ? Number(data.score) : 3.5;
    if (!data.title) {
      message.error('请输入商户名');
      return;
    }
    if (!data.wechat && !data.qq && !data.telephone) {
      message.error('联系方式至少留一种');
      return;
    }
    const res: any = await request.post('/api/admin/addStore', {
      ...data,
      status: 20,
      type: 0,
      id: editingDetail.id || undefined
    });
    if (res.code === 0) {
      message.success('保存成功');
      router.reload();
    } else if (res.code === 401) {
      router.push(`/_admin/manage/login?redir=${router.pathname}`);
    } else {
      message.error(res.msg);
    }
  }
  return <Drawer
    title={isEdit ? '编辑商户' : '添加商户'}
    open={isOpen}
    width={500}
    onClose={onClose}
    footer={<>
      <Button type="primary" onClick={confirmEdit}>确认</Button>
      <Button style={{ float: 'right' }} onClick={onClose}>取消</Button>
    </>}
  >
    <Form
      initialValues={{ tagId: tagList[0].id }}
      colon={false}
      form={formIns}
      labelCol={{ span: 4 }}
    >
      <Form.Item label="商户名称" name="title">
        <Input placeholder="请输入商户名称" />
      </Form.Item>
      <Form.Item label="所属区域" name="tagId">
        <Select placeholder="请输入商户地址" >
          {tagList.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
        </Select>
      </Form.Item>
      <Form.Item label="地址" name="address">
        <Input placeholder="请输入商户地址" />
      </Form.Item>
      <Form.Item label="电话" name="telephone">
        <Input placeholder="请输入商户电话" />
      </Form.Item>
      <Form.Item label="微信" name="wechat">
        <Input placeholder="请输入商户微信" />
      </Form.Item>
      <Form.Item label="QQ" name="qq">
        <Input placeholder="请输入商户QQ" />
      </Form.Item>
      <Form.Item label="营业时间" name="openingHour">
        <Input placeholder="请输入商户营业时间" />
      </Form.Item>
      <Form.Item label="评分" name="score">
        <Input placeholder="请输入评分" />
      </Form.Item>
      <Form.Item label="商户简介" name="description">
        <Input.TextArea placeholder="请输入商户简介" />
      </Form.Item>
      <Form.Item label="商户封面" name="image">
        <Upload
          action="http://bj.jinglintang.club:8000/jlt-api-web/file/upload"
          listType="picture-card"
          fileList={fileList}
          onChange={onChange}
          onPreview={onPreview}
        >
          {fileList.length < 5 && '+ Upload'}
        </Upload>
      </Form.Item>
    </Form>
  </Drawer>
}

export default EditTopicDrawer;