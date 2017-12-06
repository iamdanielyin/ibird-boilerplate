import store from 'store';
import md5 from 'blueimp-md5';
import { routerRedux } from 'dva/router';
import { accountLogin, accountLogout } from '../services/api';

export default {
  namespace: 'login',

  state: {
    errcode: undefined,
    errmsg: undefined,
    data: undefined,
  },

  effects: {
    *accountSubmit({ payload }, { call, put }) {
      yield put({
        type: 'changeSubmitting',
        payload: true,
      });
      Object.assign(payload, {
        password: md5(payload.password),
      });
      const response = yield call(accountLogin, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
      yield put({
        type: 'changeSubmitting',
        payload: false,
      });
      if (payload.remember) {
        store.set('login_data', payload);
      }
      if (response.data && !response.errcode) {
        store.set('user_data', response.data);
        yield put(routerRedux.push('/'));
      }
    },
    *logout(_, { call, put }) {
      yield call(accountLogout);
      yield put({
        type: 'changeLoginStatus',
      });
      const indexOf = location.hash.indexOf('?');
      const pathname = indexOf < 0 ?
        location.hash.substring(1) : location.hash.substring(1, indexOf);
      if (pathname !== '/user/login') {
        yield put(routerRedux.push('/user/login'));
      }
    },
  },

  reducers: {
    changeLoginStatus(state, { payload = {} }) {
      return {
        ...state,
        errcode: payload.errcode,
        errmsg: payload.errmsg,
        data: payload.data,
      };
    },
    changeSubmitting(state, { payload }) {
      return {
        ...state,
        submitting: payload,
      };
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/user/login') {
          dispatch({ type: 'logout' });
        }
      });
    },
  },
};
