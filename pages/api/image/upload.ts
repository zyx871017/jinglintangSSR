import { NextApiRequest, NextApiResponse } from "next";
import formidable from 'formidable';
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';

async function upload(req: NextApiRequest, res: NextApiResponse) {
  const form = formidable({ multiples: true });
  console.log('upload');
  form.parse(req, (a, b, c) => {
    console.log(a, b, c);
  });
  // const client = new S3Client({ region: 'ap-southeast-1' });
  // const command = new PutObjectCommand({
  //   Bucket: 'jinglintang.club.fun.images',
  //   Key: 'jinglintang/test.jpeg',
  //   Body: fileStream,
  //   ACL: 'public-read'
  // });
  // const data = await client.send(command);
  // const getCommand = new GetObjectCommand({
  //   Bucket: 'jinglintang.club.fun.images',
  //   Key: 'jinglintang/test.jpeg'
  // })
  // const getData = await client.send(getCommand);
  res.status(200).json({ data: '', code: 0, msg: 'success' });
}

export default upload;
