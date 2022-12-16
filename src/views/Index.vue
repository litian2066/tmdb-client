<template>
  <div>
    <el-container>
      <el-header>
        <Header @on-search="headSearch"/>
      </el-header>
      <el-main id="main" class="smaller subtle show_search_false">
        <div class="inner_block">
          <div class="inner_content">
            <div class="content">
              <router-view :search-list="searchList" :keyword="keyword"/>
            </div>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Header  from '@/components/Header'
export default {
  name: 'Index',
  components: { Header },
  data() {
    return {
      searchList: [],
      keyword: ''
    }
  },
  methods: {
    headSearch(val) {
      this.keyword = val
      this.$router.push({
        name: 'searchList',
        params: {
          keyword: val
        }
      })
    }
  }
}
</script>

<style>
p {
  font-size: 1em;
}
body * {
  box-sizing: border-box;
}
a {
  color: #000;
  text-decoration: none;
  font-weight: normal;
}
body, ul {
  margin: 0;
  padding: 0;
}
main {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: center;
  background-color: #fff;
}
div.inner_block {
  width: 100%;
}
div.inner_block:first-of-type {
  margin-top: 20px;
}
div.inner_block div.inner_content {
  box-sizing: border-box;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
div.inner_block div.content {
  width: 100%;
}
div.inner_block.docs div.inner_content div.content, main div.media>div.single_column, main>div.inner_block>div.inner_content>div.content, div.account_page_data div.inner_block div.inner_content div.content {
  max-width: 1400px;
  width: 100%;
  padding: 0 40px;
}
section.inner_content a, section.media_panel div.menu ul li.active a {
  color: #000;
}
</style>