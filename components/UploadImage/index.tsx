import { fallImage } from "@/constant";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Upload } from "antd";
import { useState } from "react";

interface IProps {
  value?: string;
  onChange?: Function;
}

const UploadImage = (props: IProps) => {
  const { value, onChange } = props;
  const [loading, setLoading] = useState(false);

  console.log(value);
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const handleChange = (info: any) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
    }
    if (info.file.status === 'done') {
      onChange && onChange(info.file.response.data);
      setLoading(false);
    }
  }

  return <Upload
    name="file"
    listType="picture-card"
    showUploadList={false}
    action={`http://bj.jinglintang.club:8000/jlt-api-web/file/upload`}
    onChange={handleChange}
  >
    {value ? <img src={value} alt={fallImage} style={{ width: '100%' }} /> : uploadButton}
  </Upload>
}

export default UploadImage;
