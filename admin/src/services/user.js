import request from '../utils/request';

export async function query() {
  return request('/mock/api/users');
}

export async function queryCurrent() {
  return request('/mock/api/currentUser');
}
