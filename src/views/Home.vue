<template>
  <div>
    <Header @on-search="headSearch"/>
    <main id="id" class="index">
      <section class="inner_content new_index">
        <section className="banner-wrap">
          <div className="banner-content">
            <div className="title">
              <h2>欢迎。</h2>
              <h3>这里有海量的电影、剧集和人物等你来发现。快来探索吧！</h3>
            </div>
            <div className="search">
              <input
                  v-model="keyword"
                  className="search-input"
                  type="text"
                  autoComplete="off"
                  spellCheck="false"
                  placeholder="搜索电影、剧集、人物..."
                  v-on:keyup.enter="search"
              />
              <button className="search-button" @click="search">Search</button>
            </div>
          </div>
        </section>

        <section className="hot-wrap">
          <div className="hot-header">
            <div className="title">热门</div>
            <div className="tab">
              <div className="tab-item active">
                <span className="text">电影播出</span>
              </div>
              <div className="tab-item">
                <span className="text">影院上映中</span>
              </div>
            </div>
          </div>
          <div className="card-list">
            <div className="card">
              <div className="card-img">
                <div className="more"></div>
                <div className="process"></div>
              </div>
              <div className="card-info">
                <div className="move-title">阿凡达：谁知道</div>
                <div className="move-date">2022-12-16</div>
              </div>
            </div>
          </div>
        </section>
      </section>
    </main>

  </div>
</template>

<script>
import Header  from '@/components/Header'
export default {
  name: "Home",
  components: { Header },
  data() {
    return {
      keyword: ''
    }
  },
  methods: {
    search() {
      console.log('this.keyword', this.keyword)
      if (this.$utils.isNotEmpty(this.keyword)) {
        this.$router.push({
          name: 'searchList',
          params: {
            keyword: this.keyword
          }
        })
      }
    },
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
};
</script>

<style scoped>
div {
  margin: 0;
  padding: 0;
}
.banner-wrap {
  min-height: 300px;
  max-height: 360px;
  background-image: linear-gradient(
      to right,
      rgba(3, 37, 65, 0.8) 0%,
      rgba(3, 37, 65, 0) 100%
  ),
  url(@/assets/banner.jpg);
  background-position: top center;
  background-size: cover;
  background-repeat: no-repeat;
  color: #fff;

  display: flex;
  flex-direction: column;
  justify-content: center;
}

.banner-content {
  padding-left: 40px;
  padding-right: 40px;
  padding-top: 30px;
  padding-bottom: 30px;
}

h2 {
  font-size: 48px;
  font-weight: 700;
  line-height: 1;
  margin: 0;
}

h3 {
  font-size: 32px;
  line-height: 45px;
  font-weight: 600;
  margin: 0;
}

.search {
  display: flex;
  align-items: center;
  position: relative;
  margin-top: 30px;
}

.search-input {
  width: 100%;
  height: 46px;
  line-height: 46px;
  font-size: 1.1em;
  color: rgba(0, 0, 0, 0.5);
  border: none;
  border-radius: 30px;
  padding: 10px 20px;
  outline: none;
}
.search-button:hover {
  color: rgba(3,37,65, 1);
}
.search-button {
  display: inline-flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  height: 46px;
  padding: 10px 26px;
  border: none;
  background: linear-gradient(to right, rgba(30, 213, 169, 1) 0%, rgba(1, 180, 228, 1) 100%);
  border-radius: 30px;
  position: absolute;
  top: 0;
  right: -1px;
  color: #fff;
  cursor: pointer;
}

.hot-wrap {
  padding: 40px 40px;
}

.hot-header {
  display: flex;
  align-items: center;
}

.title {
  font-size: 24px;
  font-weight: 700;
  margin-right: 20px;
}

.tab {
  display: flex;
  align-items: center;
  border: 1px solid rgba(3, 37, 65, 1);
  border-radius: 30px;
}

.tab-item {
  padding: 0 15px;
  line-height: 30px;
  cursor: pointer;
  border-radius: 30px;
  color: rgba(3, 37, 65, 1);
}

.tab-item.active {
  background-color: #0d243f;


}

.tab-item.active .text {
  background: linear-gradient(to right, #c0fecf 0%, #1ed5a9 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

main {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: center;
  background-color: #fff;
  margin-top: 64px;
}
.inner_content {
  width: 1300px;
}
</style>
