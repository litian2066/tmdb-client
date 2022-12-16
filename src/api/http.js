import axios from "axios";
// import qs from "qs";
import { ElLoading } from 'element-plus'


// axios.defaults.baseURL = 'http://hp.suoluomei.cn/index.php'  //正式
axios.defaults.baseURL = 'http://localhost:8000' //测试
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'
//post请求头
// axios.defaults.headers.post["Content-Type"] =
//     "application/x-www-form-urlencoded;charset=UTF-8";
//设置超时
axios.defaults.timeout = 60000;
const oldUrl = axios.defaults.baseURL


let loadingInstance = null; // 记录页面中存在的loading
let loadingCount = 0; // 记录当前正在请求的数量

function showLoading() {
    if (loadingCount === 0) {
        loadingInstance = ElLoading.service({           // 声明一个loading对象
            lock: true,                             // 是否锁屏
            text: '加载中',                         // 加载动画的文字
            spinner: 'el-icon-loading',             // 引入的loading图标
            background: 'rgba(0, 0, 0, 0.8)',       // 背景颜色
            target: '.el-table, .table-flex, .region',       // **需要遮罩的区域，这里写要添加loading的选择器**
            fullscreen: true,
            customClass: 'loadingclass'
       })
    }
    loadingCount++
}

function hideLoading() {
    loadingCount--
    if (loadingInstance && loadingCount === 0) {
        loadingInstance.close()
        loadingInstance = null
    }
}

function isNull(val) {
    return val === null || val === undefined
}

axios.interceptors.request.use(
    config => {
        // 有的请求隐藏loading
        if (isNull(config.loadingHide)) {
            showLoading()
        }
        return config;
    }, error => {
        return Promise.reject(error);
    }
)

axios.interceptors.response.use(
    response => {
        console.log(response)
        if (isNull(response.config) || isNull(response.config.loadingHide)) {//有的请求需要隐藏loading
            hideLoading()
        }
        console.log(response)
        if (response.status === 200) {
            console.log('成功')
            return Promise.resolve(response);
        } else {
            console.log('失败')
            return Promise.reject(response);
        }
    },
    error => {
        // 有的请求需要隐藏loading
        if (isNull(error) || isNull(error.config) || isNull(error.config.loadingHide)) {
            hideLoading()
        }
        console.error(error)
    }
)

export function post (url, data = {}, Origin) {
    axios.defaults.baseURL = oldUrl
    if (Origin) {
        axios.defaults.baseURL = Origin
    }
    return new Promise((resolve, reject) => {
        axios
            .post(url, data)
            .then(response => {
                console.log('post', '\n', url, 'response', response, '\n', data, '\n', response)
                resolve(response.data)
            })
            .catch(error => {
                reject(error)
            })
    })
}

export function get(url, params, Origin) {
    axios.defaults.baseURL = oldUrl
    if (Origin) {
        axios.defaults.baseURL = Origin
    }
    return new Promise((resolve, reject) => {
        axios
            .get(url, {
                params: params,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
                }
            })
            .then(response => {
                resolve(response.data)
            })
            .catch(error => {
                reject(error)
            })
    })
}