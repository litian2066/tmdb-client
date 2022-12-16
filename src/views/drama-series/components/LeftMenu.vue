<template>
  <div class="el-row column_wrapper nowrap">
    <div class="wrap" :class="fix ? 'fix-class' : ''">
      <div class="settings_panel card" >
        <h3 class="background_color light_blue" data-role="tooltip">{{ title }}
          <a target="_blank" rel="noopener" href="javascript:void(0)">
            <span class="glyphicons_v2 circle-question white"></span>
          </a>
        </h3>

        <div id="edit_menu_scroller" class="">
          <ul class="settings panel scroller">
            <li :key="index" v-for="(item, index) in menuList"><a class="color_hover light_blue" :class="activeMenu === item.active ? 'color' : ''" href="javascript:void(0)" @click="activeClick(item)">{{ item.name }}</a></li>
          </ul>
        </div>
      </div>

      <section class="content_score" data-role="tooltip">
        <p class="content_score color nine">
          <span class="score">94</span><br>
          <span class="text">马上要完成了...</span>
        </p>
      </section>

    </div>
  </div>
</template>

<script>
export default {
  name: "LeftMenu",
  props: {
    menuList: {
      type: Array,
      default: () => []
    },
    currentActive: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: '新增'
    }
  },
  data() {
    return {
      activeMenu: '',
      fix: false
    }
  },
  methods: {
    activeClick(item) {
      this.activeMenu = item.active
      this.$router.push({
        path: item.route
      })
    }
    // scrollHandle(){
    //   let scrollTop = document.documentElement.scrollTop;
    //   // let clientHeight = document.documentElement.clientHeight;
    //   // console.log('scrollTop', scrollTop)
    //   // console.log('clientHeight', clientHeight)
    //   if (scrollTop > 80) {
    //     this.fix = true
    //   } else {
    //     this.fix = false
    //   }
    // }
  },
  mounted() {
    this.activeMenu = this.currentActive.active || this.menuList[0].active
    console.log('activeMenu', this.activeMenu)
    // window.addEventListener("scroll", this.scrollHandle, true)
  }
}
</script>

<style scoped>
.column_wrapper.nowrap {
  flex-wrap: nowrap;
}
.column_wrapper {
  display: flex;
  align-items: flex-start;
}
.column_wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  align-content: flex-start;
}
.column_wrapper div.settings_panel {
  display: block;
  box-sizing: border-box;
  min-width: 260px;
  width: 260px;
  border: 1px solid rgba(227,227,227, 1);
  border-radius: 8px;
  overflow: hidden;
}
.card {
  box-shadow: 0 2px 8px rgb(0 0 0 / 10%);
  border: 1px solid rgba(227,227,227, 1);
  background-color: #fff;
}
.column_wrapper div.settings_panel h3, div.column_wrapper div.error_panel h3 {
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

.column_wrapper div.settings_panel h3 a {
  color: #fff;
  display: inline-flex;
  align-items: center;
}

.column_wrapper div.settings_panel h3 span.glyphicons_v2 {
  opacity: 1;
  padding: 4px 0;
}
.glyphicons_v2.circle-question.white {
  background-image: url(https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-635-circle-question-white-056950147b5a62c4ac076dc7f837a74ad252b72cee319d336e8c3cebf007e2c4.svg);
}
.glyphicons_v2.circle-question {
  background-image: url(https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-635-circle-question-58cc1ee10fd7a11546f8e97b1b5590b2d6e0c883acaea64a5f4c2c5b60f9f364.svg);
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
ul {
  list-style-type: none;
}
.column_wrapper ul.panel {
  box-sizing: border-box;
  padding: 8px 0;
}
.column_wrapper ul.panel li {
  width: 100%;
  padding: 10px 20px;
  font-size: 1em;
  line-height: 1.4em;
  margin: 0;
}
.color.light_blue, .color_hover.light_blue:hover {
  color: #01b4e4;
}
a:active, a:hover {
  outline: 0;
}
section.content_score {
  margin-bottom: 0;
}
section.content_score {
  margin-top: 30px;
  margin-bottom: 30px;
}
section.content_score .color.nine {
  border-color: #539b5c;
}
section.content_score .color {
  padding-left: 10px !important;
  border-left-style: solid;
  border-left-width: 5px;
}
section.content_score p {
  display: flex;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;
  font-size: 0.9em;
  white-space: nowrap;
  box-sizing: border-box;
}
section.content_score .score {
  font-size: 1.4em;
  font-weight: 700;
}
section.content_score p span {
  width: 100%;
}
.wrap {
  transition: all .2s;
}
.fix-class {
  position: fixed;
}
</style>