import axios from 'axios';

export default axios.create({
    baseURL: `${APP_URL}/api`
});

export const cancelTokenSource = () => {
    let CancelToken = axios.CancelToken;
    return CancelToken.source();
};

export const isCancel = (err) => {
    axios.isCancel(err)
};
