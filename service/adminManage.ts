import request from "./fetch";

interface IFAdminStoreList {
  isStaff?: boolean;
  pageNo?: number;
  pageSize?: number;
  status?: number;
  tagId?: number;
  title?: string;
}

export async function fetchAdminStoreList(params: IFAdminStoreList) {
  return request.post(`http://${process.env.SERVICE_HOST}/jlt-api-web/admin/topic/page`, params);
}

interface IFSaveStore {
  id?: number;
  address?: string;
  description?: string;
  image?: string;
  isStaff?: boolean;
  openingHour?: string;
  qq?: string;
  score?: number;
  status?: number;
  tagId?: number;
  telephone?: string;
  title: string;
  type?: number;
  wechat?: string;
}
export async function fetchSaveStore(params: IFSaveStore) {
  return request.post(`http://${process.env.SERVICE_HOST}/jlt-api-web/admin/topic/save`, params);
}

export async function fetchChangeStatus(params: { id: number; status: number }) {
  return request.post(`http://${process.env.SERVICE_HOST}/jlt-api-web/admin/topic/changeStatus`, params);
}

export async function fetchTopicDetail(params: { id: number }) {
  return request.post(`http://${process.env.SERVICE_HOST}/jlt-api-web/admin/topic/detail`, params);
}

interface IFAdminCommentList {
  pageNo?: number;
  pageSize?: number;
  topicId?: number;
  status?: number;
}

export async function fetchAdminCommentList(params: IFAdminCommentList) {
  return request.post(`http://${process.env.SERVICE_HOST}/jlt-api-web/admin/comment/page`, params);
}
