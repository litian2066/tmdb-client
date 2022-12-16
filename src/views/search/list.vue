<template>
  <div>
    <!--搜索区域-->
    <section class="main_content search_results">
      <div class="column_wrapper reverse">
        <div class="content_wrapper">
          <div class="white_column">
            <el-row :gutter="20">
              <el-col :span="6">
                <div class="grey_column">
                  <div class="settings_panel no_margin">
                    <h3 class="background_color light_blue">搜索结果</h3>
                    <div id="search_menu_scroller" class="">
                      <ul class="settings panel with_counts scroller">
                        <li class="selected">
                          <a id="movie" href="/search/movie?query=纳尼亚传奇" class="search_tab active" title="电影" alt="电影">电影</a>
                          <span>106</span>
                        </li>
                        <li class="">
                          <a id="tv" href="/search/tv?query=纳尼亚传奇" class="search_tab" title="剧集" alt="剧集">剧集</a>
                          <span>9</span>
                        </li>
                        <li class="">
                          <a id="collection" href="/search/collection?query=纳尼亚传奇" class="search_tab" title="系列" alt="系列">系列</a>
                          <span>840</span>
                        </li>
                        <li class="">
                          <a id="network" href="/search/network?query=纳尼亚传奇" class="search_tab" title="电视网" alt="电视网">电视网</a>
                          <span>282</span>
                        </li>
                        <li class="">
                          <a id="company" href="/search/company?query=纳尼亚传奇" class="search_tab" title="公司" alt="公司">公司</a>
                          <span>9,126</span>
                        </li>
                        <li class="">
                          <a id="keyword" href="/search/keyword?query=纳尼亚传奇" class="search_tab" title="关键词" alt="关键词">关键词</a>
                          <span>770</span>
                        </li>
                        <li class="">
                          <a id="person" href="/search/person?query=纳尼亚传奇" class="search_tab" title="人物" alt="人物">人物</a>
                          <span>0</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <p class="search_tip"><span class="glyphicons_v2 circle-info"></span> 提示：你可以使用“y:”过滤器以年份来缩小查询范围。例如：“星球大战 y:1977”。</p>
                </div>
              </el-col>
              <el-col :span="18">
                <section class="panel">
                  <div v-if="$utils.isNotEmptyArray(tableList)" class="search_results tv">
                    <div class="results flex">
                      <div v-for="(item, index) in tableList" class="card v4 tight" :key="index">
                        <div class="wrapper">
                          <div class="image">
                            <div class="poster">
                              <a data-id="5db8d664a1d3320014e82a77" data-media-type="tv" data-media-adult="false" class="result" href="javascript:void(0)" @click="onTVClick(item)">
                                <img class="poster" :src="item.poster"  :alt="item.showTitle">
                              </a>
                            </div>
                          </div>

                          <div class="details">
                            <div class="wrapper">
                              <div class="title">
                                <div>
                                  <a data-id="5db8d664a1d3320014e82a77" data-media-type="tv" data-media-adult="false" class="result" href="javascript:void(0)">
                                    <h2>{{ item.showTitle }}</h2>
                                  </a>
                                </div>
                                <span class="release_date">{{ item.showPremiered }}</span>
                              </div>
                            </div>

                            <div class="overview">
                              <p>{{ item.plot }}</p>
                            </div>
                          </div>

                          <!--右侧样式-->
                          <ul class="right-handler">
                            <li class="view" @click="onViewClick(item)">
                              <i class="el-icon-view"></i>
                            </li>
                            <li class="edit" @click="onEditClick(item)">
                              <i class="el-icon-edit"></i>
                            </li>
                            <li class="delete" @click="onDeleteClick(item)">
                              <i class="el-icon-delete"></i>
                            </li>
                          </ul>
                        </div>

                      </div>
                      <div class="pagination_wrapper">
                        <div role="navigation" aria-label="Pagination" class="pagination" custom_path_info="/search/tv">
                          <span class="previous_page disabled" aria-disabled="true">← 上一页</span>
                          <em class="current" aria-label="Page 1" aria-current="page">1</em>
                          <a rel="next" aria-label="Page 2" href="/search/tv?page=2&amp;query=%E9%BE%99%E4%B9%8B">2</a>
                          <a aria-label="Page 3" href="/search/tv?page=3&amp;query=%E9%BE%99%E4%B9%8B">3</a>
                          <a aria-label="Page 4" href="/search/tv?page=4&amp;query=%E9%BE%99%E4%B9%8B">4</a>
                          <a class="next_page" rel="next" href="/search/tv?page=2&amp;query=%E9%BE%99%E4%B9%8B">下一页 →</a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div v-else class="search_results person hide">
                    <div class="results flex">
                      <p>找不到和您的查询相符的剧集。</p>
                    </div>
                  </div>
                </section>
              </el-col>
            </el-row>

          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { DramaSeriesAPI } from '@/api/drama-series'
export default {
  name: "searchList",
  props: {
    keyword: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      searchParam: {
        title: '',
        showTitle: '',
        page: 1,
        size: 10
      },
      page: {
        pages: 0,
        total: 0,
        current: 1,
        size: 10
      },
      loading: false,
      tableList: []
    }
  },
  methods: {
    search() {
      if (this.searchParam.title !== null && this.searchParam.title !== '') {
        this.onSearchClick()
      }
    },
    async onSearchClick() {
      const loading = this.openLoading()
      try {
        let res = await DramaSeriesAPI.findByPage(this.searchParam)
        console.log('res', res)
        if (res.code === 200) {
          console.log('this.tableList', this.tableList)
          this.tableList = res.data.records
          this.page.total = res.data.total
        }
      } catch (e) {
        console.error(e)
      } finally {
        loading.close()
      }
    },
    // 删除
    onDeleteClick(item) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.doDelete(item.pkId)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    async doDelete(pkId) {
      try {
        this.loading = true
        let res = await DramaSeriesAPI.remove(pkId)
        if (res.code === 200) {
          this.onSearchClick()
        }
      } catch (e) {
        console.log(e)
        this.$message.error('删除失败');
      } finally {
        this.loading = false
      }
    },
    onEditClick(item) {
      this.$router.push({
        name: 'tvAdd',
        params: {
          type: 'edit',
          data: JSON.stringify(item)
        }
      })
    },
    onViewClick(item) {
      this.$router.push({
        name: 'tvDetail',
        params: {
          type: 'detail',
          data: JSON.stringify(item)
        }
      })
    },
    // 跳转到TV的详情页
    onTVClick() {
      this.$router.push({
        name: 'tvDetail',
        params: {
          type: 'detail',
          data: JSON.stringify(item)
        }
      })
    }
  },
  mounted() {
    console.log('this.$route', this.$route)
    if (this.$utils.isNotEmpty(this.$route.params.keyword)) {
      this.searchParam.showTitle = this.$route.params.keyword
    }
    this.onSearchClick()
  },
  watch: {
    keyword: function(newName, oldName) {
      if (this.$utils.isNotEmpty(newName)) {
        this.searchParam.showTitle = newName
        this.onSearchClick()
      }
    }
  }
}
</script>

<style scoped>
div.search_bar {
  width: 100%;
  position: absolute;
  top: 64px;
  left: 0;
  border-top: 1px solid rgba(227,227,227, 1);
  border-bottom: 1px solid rgba(227,227,227, 1);
}
section.search {
  width: 100%;
  background-color: #fff;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
}
div.sub_media {
  display: flex;
  justify-content: space-between;
  position: relative;
  top: 0;
  left: 0;
  max-width: 1400px;
  width: 100%;
  padding: 0 40px;
}
section.search form {
  display: block;
  width: 100%;
}
section.search span.k-autocomplete {
  display: flex;
  align-content: center;
  align-items: center;
  width: 100% !important;
  border: none !important;
  box-sizing: border-box !important;
  transition: all 0s !important;
  background-color: transparent !important;
  /*background-image: url(https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-28-search-3992eb97b2b749f09793f9653407c499aa896d99535cb35cc66682d26a49df13.svg);*/
  background-position: left center;
  background-size: 20px;
  background-repeat: no-repeat;
  margin: 0;
}
.k-widget, .k-textbox, .k-textarea, .k-button {
  font-family: 'Source Sans Pro', Arial, sans-serif;
  font-size: 1em;
}
.k-autocomplete, .k-autocomplete.k-header {
  border-color: #ced4da;
  color: #495057;
  background-color: #fff;
  box-shadow: none;
}
.k-autocomplete {
  border-radius: 0.25rem;
  width: 12.4em;
  border-width: 1px;
  border-style: solid;
  outline: 0;
  box-sizing: border-box;
  font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
  font-size: 1rem;
  line-height: 1.5;
  white-space: nowrap;
  display: -ms-inline-flexbox;
  display: inline-flex;
  -ms-flex-flow: row nowrap;
  flex-flow: row nowrap;
  -ms-flex-align: stretch;
  align-items: stretch;
  vertical-align: middle;
  transition: all .1s ease;
  position: relative;
  cursor: default;
  -webkit-touch-callout: none;
  -webkit-tap-highlight-color: transparent;
}
section.search span.k-autocomplete .k-input {
  border: none;
  border-radius: 0;
  padding-right: 10px;
}
section.search form input[type=text] {
  width: 100%;
  height: 44px;
  border: none !important;
  outline: none;
  font-family: Arial, sans-serif;
  font-style: italic;
  font-size: 100%;
  color: #acacac;
  text-indent: 0;
  padding-left: 30px;
  padding-right: 0;
}
.k-input {
  margin: 0;
  padding: 0.375rem 0.75rem;
  width: 100%;
  min-width: 0;
  height: calc(1.5em + 0.75rem);
  border: 0;
  outline: 0;
  box-sizing: border-box;
  box-shadow: none;
  color: inherit;
  background: 0 0;
  font: inherit;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-flow: row nowrap;
  flex-flow: row nowrap;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex: 0 1 auto;
  flex: 0 1 auto;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-appearance: none;
}
.k-autocomplete .k-clear-value {
  width: auto;
}
.k-autocomplete .k-clear-value {
  opacity: .5;
  visibility: hidden;
}
.k-clear-value {
  width: calc(16px + 0.75rem);
  height: 2.25rem;
  -ms-flex-negative: 0;
  flex-shrink: 0;
  display: -ms-inline-flexbox;
  display: inline-flex;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-pack: center;
  justify-content: center;
  outline: 0;
  cursor: pointer;
}
.k-icon {
  width: 1em;
  height: 1em;
  outline: 0;
  font-size: 16px;
  font-family: WebComponentsIcons;
  font-style: normal;
  font-variant: normal;
  font-weight: 400;
  line-height: 1;
  speak: none;
  text-transform: none;
  text-decoration: none;
  -ms-flex-negative: 0;
  flex-shrink: 0;
  display: -ms-inline-flexbox;
  display: inline-flex;
  -ms-flex-flow: row nowrap;
  flex-flow: row nowrap;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-pack: center;
  justify-content: center;
  vertical-align: middle;
  position: relative;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
}
.k-i-x::before {
  content: "\e11b";
}
.k-autocomplete .k-i-loading {
  width: calc(16px + 0.75rem);
  height: 2.25rem;
}
.k-display-none, .k-hidden {
  display: none !important;
}
.k-i-loading {
  position: relative;
  background-color: transparent;
  box-sizing: border-box;
  color: currentColor;
}
section.search form input[type=submit] {
  display: none;
}
button[disabled], html input[disabled] {
  cursor: default;
}
input[type="submit"], button {
  font-weight: 700;
}
button, html input[type="button"], input[type="reset"], input[type="submit"] {
  -webkit-appearance: button;
  cursor: pointer;
}
/*列表区域*/
div.column_wrapper {
  display: flex;
  align-items: flex-start;
}
div.column_wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  align-content: flex-start;
}
div.column_wrapper div.content_wrapper {
  max-width: 1400px;
  width: 100%;
  display: flex;
  align-items: flex-start;
  align-content: flex-start;
  padding-left: 40px;
  padding-right: 40px;
  padding-bottom: 30px;
}
div.white_column {
  background-color: #fff;
  /*width: calc(100vw - 80px - 268px);*/
  max-width: 1400px;
  display: flex;
  flex-wrap: wrap;
  flex: 0 1 auto;
  padding-right: 30px;
}
section.panel {
  width: 100%;
  display: block;
  padding: 30px 0;
  border-top: 1px solid #d7d7d7;
}
section.panel:last-of-type {
  padding-bottom: 0;
}
section.panel:first-of-type {
  border-top: none;
  padding-top: 0;
}
iv.results.flex {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
div.results.flex.results {
  align-items: flex-start;
  align-content: flex-start;
  justify-content: flex-start;
}
.card {
  box-shadow: 0 2px 8px rgb(0 0 0 / 10%);
  border: 1px solid rgba(227,227,227, 1);
  background-color: #fff;
}
div.card.v4 {
  width: 100%;
  display: flex;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
}
div.card.v4.tight {
  flex-wrap: wrap;
  height: 143px;
}
div.card.v4.tight>div.wrapper {
  display: flex;
  max-width: calc(100vw - 82px);
}
div.card.v4.tight div.image {
    min-width: 94px;
    width: 94px;
    height: 141px;
}
div.card.v4 div.image {
  width: calc(200px /1.5);
  min-width: calc(200px /1.5);
  height: 200px;
  box-sizing: border-box;
}
div.card.v4 div.image div.poster {
  width: 100%;
  height: 100%;
}
div.card.v4.tight div.image div.poster {
  width: 100%;
  height: 100%;
}
section.main_content.search_results h2, section.main_content.search_results a {
  color: #000;
}
a {
  color: #000;
  text-decoration: none;
  font-weight: normal;
}
div.card.v4.tight div.image a {
  display: block;
  width: 100%;
  height: 100%;
}
img, a img {
  outline: none;
}
div.card.v4 div.image {
  width: calc(200px / 1.5);
  min-width: calc(200px / 1.5);
  height: 200px;
  box-sizing: border-box;
}
/*div.card.v4.tight div.image {
  min-width: 94px;
  width: 94px;
  height: 141px;
}*/
div.card.v4 div.image img {
  width: calc(143px / 1.5);
  min-width: calc(143px / 1.5);
  height: 143px;
  display: block;
}
div.card.v4.tight div.image img {
  min-width: 100%;
  width: 100%;
  height: 100%;
}
div.card.v4 div.details {
  width: 100%;
  padding: 10px 15px;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  align-items: center;
}
div.card.v4 div.details div.wrapper {
  display: flex;
  align-items: center;
  width: 100%;
}
div.card.v4 div.details div.title {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  overflow: hidden;
}
div.card.v4 div.details div.title>div {
  width: 100%;
  line-height: 100%;
}
div.card.v4 div.details div.title a {
  display: inline-block;
}
div.card.v4 div.details div.overview {
  margin-top: 20px;
}
div.card.v4.tight div.details div.overview {
  height: auto;
}
section.panel p:last-of-type {
  margin-bottom: 0;
}
div.column_wrapper div.content_wrapper p:last-child {
  margin-bottom: 0;
}
div.card.v4 div.details p {
  color: #000;
}
div.card.v4 div.details div.overview p {
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
}
div.card.v4.tight div.details div.overview p {
  font-size: 1em;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
  margin: 0;
}

section.main_content.search_results h2, section.main_content.search_results a {
  color: #000;
}
section.main_content.search_results h2 {
  margin-bottom: 0;
}
h2 {
  font-size: 1.5em;
  margin: 0 0 4px 0;
  font-weight: 600;
}
section.main_content.search_results h2 {
  margin-bottom: 0;
}
section.main_content.search_results h2, section.main_content.search_results a {
  color: #000;
}
div.card.v4 div.details div.title h2 {
  font-size: 1.7em;
  line-height: 1.2em;
  margin-bottom: 0;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
}
div.card.v4 div.details div.title span.release_date {
  white-space: nowrap;
  color: #999;
}
/*分页*/
div.pagination_wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
}
div.pagination {
  color: #000;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  max-width: 500px;
  width: auto;
}
div.pagination_wrapper>div.pagination {
  margin-top: 30px;
}
div.pagination span.disabled {
  display: none;
}
div.pagination .current {
  border: 1px solid #000;
  padding: 2px 8px;
  margin-right: 4px;
  font-style: normal;
  font-weight: 400;
}
div.pagination a {
  font-weight: 600;
  margin-left: 4px;
  margin-right: 4px;
}
section.main_content.search_results h2, section.main_content.search_results a {
  color: #000;
}
div.card.v4.tight {
  flex-wrap: wrap;
}
div.card.v4.tight:first-of-type {
  margin-top: 0;
}
div.card.v4+div.card {
  margin-top: 20px;
}

.right-handler {
  height: 143px;
  width: 300px;
  position: absolute;
  right: -300px;
  top: 0px;
  transition: all 0.5s;
  margin: 0;
  padding: 0;
  list-style: none;
}
.right-handler > li {
  display: inline-block;
  height: inherit;
  width: 100px;
  cursor: pointer;
  text-align: center;
  vertical-align: middle;
  line-height: 143px;
}
.right-handler > li i {
  font-size: 35px;
  line-height: 4;
  transition: all .4s;
}
/*.right-handler > li:hover i {
  color: #ffffff;
  transform: scale(1.5);
}
.right-handler li.view {
  background-color: #67C23A;
}
.right-handler li.edit {
  background-color: #409EFF;
}
.right-handler li.delete {
  background-color: #F56C6C;
}
div.card.v4:hover .right-handler {
  right: 0px;
}*/
/*左侧搜索结果栏*/
div.reverse div.grey_column {
  padding-left: 0;
  padding-right: 0;
  justify-content: flex-end;
}
div.grey_column {
  min-width: 260px;
  width: 260px;
  display: flex;
  flex-wrap: wrap;
}
div.column_wrapper div.settings_panel {
  display: block;
  box-sizing: border-box;
  min-width: 260px;
  width: 260px;
  border: 1px solid rgba(227,227,227, 1);
  border-radius: 8px;
  overflow: hidden;
}
.no_margin {
  margin: 0 !important;
}
div.column_wrapper div.settings_panel h3, div.column_wrapper div.error_panel h3 {
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: space-between;
  margin: 0;
  font-weight: 600;
  padding: 20px;
  color: #fff;
}
.background_color.light_blue, .k-button.background_color.light_blue {
  background-color: rgba(1,180,228, 1);
}
div.column_wrapper ul.panel {
  box-sizing: border-box;
  padding: 8px 0;
}
ul {
  list-style-type: none;
}
div.column_wrapper ul.panel.with_counts li {
  display: inline-flex;
  justify-content: space-between;
}
div.column_wrapper ul.panel li {
  width: 100%;
  padding: 10px 20px;
  font-size: 1em;
  line-height: 1.4em;
  margin: 0;
}
div.column_wrapper ul.panel.with_counts>li:hover, div.column_wrapper ul.panel.with_counts li.selected, ul.panel.kendo.k-panelbar ul>.k-item.selected {
  background: rgba(0,0,0,0.08);
}
section.main_content.search_results h2, section.main_content.search_results a {
  color: #000;
}
div.column_wrapper ul.panel.with_counts li a {
  color: #000;
}
div.column_wrapper ul.panel.with_counts li.selected a {
  font-weight: 600;
}
div.column_wrapper ul.panel.with_counts li span, div.column_wrapper ul.panel.kendo li.sub span {
  display: inline-flex;
  align-items: center;
  font-size: 0.8em;
  font-weight: 300;
  font-family: 'Roboto Mono', monospace;
  background-color: rgba(0,0,0,0.08);
  padding: 0px 10px;
  border-radius: 8px;
}
div.column_wrapper ul.panel.with_counts li:hover span, div.column_wrapper ul.panel.with_counts li.selected span, ul.panel.kendo.k-panelbar ul>.k-item.selected span {
  background-color: #fff;
  color: #000;
}
div.column_wrapper div.content_wrapper p:last-child {
  margin-bottom: 0;
}
section.main_content.search_results p.search_tip {
  margin-top: 20px;
  color: #666;
  font-family: 'Source Sans Pro', Arial, sans-serif;
}
.glyphicons_v2.circle-info {
  background-image: url(https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-636-circle-info-06837a451a09552349b182d84ae84f26308efee8f7e8ddca255bd5dbc4a66ea4.svg);
}
section.main_content.search_results p.search_tip span {
  position: relative;
  top: 6px;
  left: 0;
  padding-right: 5px;
  font-size: 1.4em;
}
.glyphicons_v2 {
  position: relative;
  top: 0;
  left: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 1em;
  min-height: 1em;
  width: 1em;
  height: 1em;
  line-height: inherit;
  background-position: center center;
  background-repeat: no-repeat;
  color: inherit;
  box-sizing: border-box;
}
</style>