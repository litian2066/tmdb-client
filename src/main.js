import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { utils } from '@/utils/utils.js'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElIconModules from '@element-plus/icons-vue'
import locale from 'element-plus/lib/locale/lang/zh-cn';
const app = createApp(App).use(ElementPlus, { locale }).use(router)
app.config.globalProperties.$utils = utils
app.config.globalProperties.openLoading = function() {
    const loading = this.$loading({           // 声明一个loading对象
        lock: true,                             // 是否锁屏
        text: '加载中',                         // 加载动画的文字
        spinner: 'el-icon-loading',             // 引入的loading图标
        background: 'rgba(0, 0, 0, 0.8)',       // 背景颜色
        target: '.el-table, .table-flex, .region',       // **需要遮罩的区域，这里写要添加loading的选择器**
        fullscreen: true,
        customClass: 'loadingclass'             // **遮罩层新增类名，如果需要修改loading的样式**
    })
    setTimeout(function () {                  // 设定定时器，超时5S后自动关闭遮罩层，避免请求失败时，遮罩层一直存在的问题
        loading.close();                        // 关闭遮罩层
    },5000)
    return loading;
}
// 设置element-ui 中文，主要用于时间组件
app.use(ElementPlus,{ locale })
app.mount('#app')
// 加载图标
Object.keys(ElIconModules).forEach(function (key) {
    app.component(ElIconModules[key].name, ElIconModules[key])
})
export { app }