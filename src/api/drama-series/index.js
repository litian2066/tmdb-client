import { post, get } from '@/api/http'
export const DramaSeriesAPI = {
    addUrl: '/tmdb/dramaSeries/add',
    findByPageUrl: '/tmdb/dramaSeries/findByPage',
    deleteUrl: '/tmdb/dramaSeries/deleteById',
    removeUrl: '/tmdb/dramaSeries/removeById',
    updateUrl: '/tmdb/dramaSeries/update',
    findListUrl: '/tmdb/dramaSeries/findList',
    add(params) {
        console.log(params)
        return post(this.addUrl, params)
    },
    findByPage(params) {
        return post(this.findByPageUrl, params)
    },
    delete(pkId) {
        return get(this.deleteUrl, { 'pkId': pkId })
    },
    remove(pkId) {
        return get(this.removeUrl, { 'pkId': pkId })
    },
    findList(params) {
        return post(this.findListUrl, params)
    },
    update(params) {
        return post(this.updateUrl, params)
    }
}