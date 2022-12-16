<template>
  <header class="normal smaller no_animation smaller subtle nav-down">
    <div class="content">
      <div class="sub_media">
        <div class="nav_wrapper">
          <a class="logo" href="/">
            <img
                src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
                alt="The Movie Database (TMDB)" width="154" height="20">
          </a>

          <ul class="dropdown_menu navigation k-widget k-reset k-header k-menu k-menu-horizontal" data-role="menu"
              tabindex="0" role="menubar">
            <li class="k-item k-menu-item k-state-default"
                :class="index === 0 ? 'k-first' : ''"
                :key="index"
                role="menuitem" v-for="(item, index) in menuList" >
              <a class="no_click k-link k-menu-link" href="javascript:void(0)" :class="currentActive === item.route ? 'k-item-focus' : ''" @click="menuClick(item.route)">
                {{ item.menuName }}
                <span class="k-menu-expand-arrow k-icon k-i-arrow-60-down"></span>
              </a>
              <div v-if="$utils.isNotEmptyArray(item.children)" class="k-animation-container k-item-child-list">
                <ul class="k-item-child-list-ul" role="menu" data-role="popup">
                  <li :key="childIndex" class="k-item-child-list-ul-li" v-for="(child, childIndex) in item.children" role="menuitem">
                    <a href="javascript:void(0)" class="k-item-child-list-ul-li-a"  @click="routeClick(child.route)">{{ child.menuName }}</a>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>

        <div class="flex">
          <ul class="primary">
            <li class="glyph new_buttons" style="position: relative;">
              <a class="new_icon no_click" href="javascript:void(0)" @click="showAddArea = !showAddArea">
                <span class="glyphicons_v2 plus white"></span>
              </a>
              <!--下拉菜单--->
              <div class="k-animation-container" v-show="showAddArea">
                <div class="k-widget k-tooltip k-tooltip-closable k-popup k-group k-reset k-state-border-up tmdb_theme_white no_pad">
                  <div class="k-tooltip-content">
                    <div class="settings_content">
                      <div class="group no_pad">
                        <p><a href="javascript:void(0)">添加新电影</a></p>
                        <p><a href="javascript:void(0)" @click="toAddTV">添加新剧集</a></p>
                      </div>
                    </div>
                  </div>
                  <div class="k-callout k-callout-n"></div>
                </div>

              </div>
            </li>
            <li class="translate" data-role="tooltip">
              <div>zh</div>
            </li>
            <li><a href="/login">登录</a></li>
            <li><a href="/signup">加入 TMDB</a></li>

            <li class="glyph search_buttons">
              <a v-show="showSearchButton" class="search" href="javascript:void(0)" @click="showSearchArea"><span class="glyphicons_v2 search blue"></span></a>
              <a v-show="!showSearchButton" class="close hide" href="javascript:void(0)" @click="closeSearchArea"><span class="glyphicons_v2 menu-close invert svg"></span></a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="search_bar" v-show="!showSearchButton">
      <section class="search show_search_true">
        <div class="sub_media">
          <form id="search_form" action="/search" method="get" accept-charset="utf-8">
            <label>
              <span tabindex="-1" role="presentation" class="k-widget k-autocomplete k-autocomplete-clearable k-state-default" style="">
                <input v-model="searchParam.title" type="text"  placeholder="搜索电影、剧集、人物" class="k-input" v-on:keyup.enter="search" >
                <span unselectable="on" class="k-clear-value" title="clear" role="button" tabindex="-1">
                  <span class="k-icon k-i-x"></span>
                </span><span class="k-icon k-i-loading k-hidden">
              </span></span>
            </label>
            <input type="submit" disabled="">
          </form>
        </div>
      </section>
    </div>
    <div class="k-list-container k-popup k-group k-reset" id="search_v4-list" data-role="popup" aria-hidden="true"
         style="display: none; position: absolute;">
      <div class="k-group-header" style="display:none"></div>
      <div class="k-list-scroller" unselectable="on">
        <ul unselectable="on" class="k-list k-reset" tabindex="-1" aria-hidden="true" id="search_v4_listbox"
            aria-live="polite" data-role="staticlist" role="listbox"></ul>
      </div>
      <div class="k-nodata" style="display:none">
        <div></div>
      </div>
    </div>
  </header>
</template>

<script>
import menu from '@/constants/menu'
export default {
  name: "Header",
  data() {
    return {
      currentActive: '',
      menuList: menu,
      // 是否展示新增按钮的下拉区域
      showAddArea: false,
      showSearchButton: true,
      searchParam: {}
    }
  },
  methods: {
    menuClick(active) {
      console.log(active)
      this.currentActive = active
      this.$router.push({
        name: active
      })
    },
    routeClick(active) {
      this.$router.push({
        name: active
      })
    },
    toAddTV() {
      this.$router.push({
        name: 'dramaSeriesIndex',
        params: {
          type: 'add'
        }
      })
      this.initShowArea()
    },
    initShowArea() {
      this.showAddArea = false
    },
    showSearchArea() {
      this.showSearchButton = !this.showSearchButton
    },
    closeSearchArea() {
      this.showSearchButton = !this.showSearchButton
    },
    search() {
      if (this.searchParam.title !== null && this.searchParam.title !== '') {
        this.$emit('on-search', this.searchParam.title)
      }
    }
  }
}
</script>

<style scoped>
/*公共代码部分*/
ul.dropdown_menu.k-menu.k-menu-horizontal:not(.k-context-menu) {
  padding: 0;
}
a {
  color: #000;
  text-decoration: none;
  font-weight: normal;
}
.k-menu.k-menu-horizontal:not(.k-context-menu) {
  padding: 0.5rem 1rem;
}
header ul.k-menu:not(.k-context-menu), header ul.k-menu .k-item.k-state-focused {
  background: transparent;
}
header ul.navigation.k-menu {
  justify-content: flex-start;
  align-items: center;
}
ul.dropdown_menu.k-menu {
  visibility: visible;
  background: #fff;
  margin: 0;
}
.k-menu:not(.k-context-menu) {
  border-color: #dee2e6;
  color: #212529;
  background-color: #f8f9fa;
}
ul.dropdown_menu {
  visibility: hidden;
  height: 40px;
  margin: 0;
  flex-wrap: nowrap;
}
.k-widget, .k-textbox, .k-textarea, .k-button {
  font-family: 'Source Sans Pro', Arial, sans-serif;
  font-size: 1em;
}
.k-menu-horizontal {
  -ms-flex-direction: row;
  flex-direction: row;
}
.k-menu {
  border-width: 0;
  border-style: solid;
  box-sizing: border-box;
  outline: 0;
  font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
  font-size: 1rem;
  line-height: 1.5;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -ms-flex-align: stretch;
  align-items: stretch;
  position: relative;
  cursor: default;
  -webkit-touch-callout: none;
  -webkit-tap-highlight-color: transparent;
}
.k-reset {
  margin: 0;
  padding: 0;
  border-width: 0;
  outline: 0;
  text-decoration: none;
  font: inherit;
  list-style: none;
}
.k-item, .k-menu-group {
  display: none;
}
.k-menu:not(.k-context-menu)>.k-item, .k-menu-group .k-item>.k-link, .k-menu-vertical .k-item>.k-link {
  color: #000;
  font-weight: 400;
}
.k-widget, .k-textbox, .k-textarea, .k-button {
  font-family: 'Source Sans Pro', Arial, sans-serif;
  font-size: 1em;
}
.k-menu-horizontal {
  -ms-flex-direction: row;
  flex-direction: row;
}
.k-menu:not(.k-context-menu)>.k-item {
  color: rgba(33,37,41,0.5);
}
header ul.navigation>li.k-item {
  display: flex;
}
header ul.navigation>.k-item {
  margin-right: 14px;
}
header ul.navigation>li {
  display: none;
}
.k-menu-item {
  border-width: 0;
  outline: 0;
  display: -ms-flexbox;
  display: flex;
  -ms-flex: 0 0 auto;
  flex: 0 0 auto;
  position: relative;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.k-item {
  cursor: default;
}
header ul:not(.k-item-child-list-ul) li {
  display: flex;
  align-items: center;
  align-content: center;
}
header ul.k-menu:not(.k-context-menu) .k-item>.k-state-active, header ul.k-menu:not(.k-context-menu) .k-item a {
  color: #fff;
  font-weight: 600;
}
.k-menu-link {
  padding: 0.5rem 0.5rem;
  outline: 0;
  color: inherit;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: row;
  flex-direction: row;
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
  -ms-flex-align: center;
  align-items: center;
  position: relative;
  white-space: nowrap;
  cursor: pointer;
}
.k-link, .k-link:hover {
  color: inherit;
  text-decoration: none;
  outline: 0;
  cursor: pointer;
}
header ul li a {
  display: flex;
  align-items: center;
  align-content: center;
}
header {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(3,37,65, 1);
  height: 64px;
  width: 100%;
  z-index: 10;
  transition: top 0.2s linear;
}
header div.nav_wrapper {
  display: flex;
  justify-content: flex-start;
  flex-wrap: nowrap;
  align-items: center;
  overflow: visible;
}
header ul:not(.k-item-child-list-ul) {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
}
header div.content {
  width: 100%;
  display: flex;
  justify-content: center;
}
header div.sub_media {
  display: flex;
  justify-content: space-between;
  position: relative;
  top: 0;
  left: 0;
  max-width: 1400px;
  width: 100%;
  padding: 0 40px;
}
eader div.nav_wrapper {
  display: flex;
  justify-content: flex-start;
  flex-wrap: nowrap;
  align-items: center;
  overflow: visible;
}
header a.logo {
  display: block;
  margin-right: 16px;
  width: 154px;
  height: 20px;
}
header a {
  color: #fff;
  font-weight: 600;
}
header a.logo img {
  display: block;
  width: 100%;
}

/*右侧*/
header div.flex {
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-end;
}
header div.flex ul {
  justify-content: flex-end;
}
header ul.primary li:first-child {
  margin-left: 0;
}
header ul.primary li {
  margin-left: 30px;
}
header ul li {
  display: flex;
  align-items: center;
  align-content: center;
}
header ul li.glyph a {
  height: 100%;
  display: inline-flex;
  align-items: center;
}
header ul li a {
  display: flex;
  align-items: center;
  align-content: center;
}
header a {
  color: #fff;
  font-weight: 600;
}
.glyphicons_v2.plus.white {
  background-image: url(https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-371-plus-white-0bac34f16124808a12ea863b4d9cc6e599dee7c0a80658cfe9ead26939e64517.svg);
}
.glyphicons_v2.plus {
  background-image: url(https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-371-plus-44afa5bd1a077a546a846d5a31c37ff62a44f91ae490737a8ac99880e2359f11.svg);
}
header ul li.glyph a span {
  background-color: transparent;
}
header ul li span.glyphicons_v2 {
  font-size: 1.4em;
}
header ul li span.glyphicons_v2 {
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
header ul.primary li.translate, header ul.primary li.user a {
  display: block;
  padding: 4px 0;
}
header ul li.translate div {
  width: 28px;
  height: 26px;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  border: 1px solid #fff;
  border-radius: 3px;
  padding: 3px 5px;
  transition: linear .1s;
  color: #fff;
  font-weight: 600;
  font-size: 0.9em;
  text-transform: uppercase;
}
header ul li.glyph a.search, header ul li.glyph a.close {
  font-size: 1.3em;
}
header ul li.glyph a {
  height: 100%;
  display: inline-flex;
  align-items: center;
}
glyphicons_v2.search.blue {
  background-image: url(	https://www.themoviedb.org/assets/2/v4/glyphicons/…aa022c1c0be5ba4200d7bd3f51091ed9298980e3a26a1.svg);
}
.glyphicons_v2.search {
  background-image: url(https://www.themoviedb.org/assets/2/v4/glyphicons/…3f9653407c499aa896d99535cb35cc66682d26a49df13.svg);
}
.hide {
  display: none;
}
header ul.k-menu:not(.k-context-menu) .k-item a:hover, header ul.k-menu:not(.k-context-menu) .k-item .k-item-focus {
  /*color: #42b983;*/
}
.k-animation-container {
  border-radius: 0 0 0.25rem 0.25rem;
  width: 115px;
  overflow: visible;
  top: 31.1875px;
  z-index: 10002;
  left: -47px;
  height: 77.1875px;
  box-sizing: content-box;
  display: block;
  position: absolute;
}
/*下拉部分*/
.k-tooltip {
  border-radius: 0.25rem;
  margin: 0;
  padding: 0.25rem 0.5rem;
  border-width: 0;
  border-style: solid;
  box-sizing: border-box;
  background-repeat: repeat-x;
  outline: 0;
  font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
  font-size: .875rem;
  line-height: 1.5;
  display: -ms-inline-flexbox;
  display: inline-flex;
  -ms-flex-flow: row nowrap;
  flex-flow: row nowrap;
  -ms-flex-align: start;
  align-items: flex-start;
  position: absolute;
  z-index: 12000;
  -webkit-touch-callout: none;
  -webkit-tap-highlight-color: transparent;
}
.k-popup {
  border-color: rgba(0,0,0,0.15);
  color: #212529;
  background-color: #fff;
}
.k-popup {
  border-radius: 0.25rem;
  margin: 0;
  padding: 0.5rem 0;
  border-width: 1px;
  border-style: solid;
  box-sizing: border-box;
  font-size: 1rem;
  line-height: 1.5;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
  -ms-flex-align: stretch;
  align-items: stretch;
}
.k-reset {
  margin: 0;
  padding: 0;
  border-width: 0;
  outline: 0;
  text-decoration: none;
  font: inherit;
  list-style: none;
}
.tmdb_theme_white .k-tooltip, .k-widget.k-tooltip.tmdb_theme_white {
  background-color: #fff;
  color: #000;
  border: 1px solid rgba(33,37,41,0.15);
}
.k-widget.k-tooltip.no_pad {
  padding: 0;
}
.k-animation-container-shown, .k-animation-container>.k-popup {
  box-shadow: none;
}
.k-tooltip-closable .k-tooltip-content {
  padding: 0;
  width: 100%;
}
.k-tooltip-content {
  -ms-flex-item-align: stretch;
  align-self: stretch;
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
  overflow: hidden;
  text-overflow: ellipsis;
}
div.settings_content div.group.no_pad {
  border: none;
}
div.settings_content div.group, div.settings_content div.group.no_pad {
  border-top: 1px solid rgba(33,37,41,0.15);
  padding: 4px 0;
}
div.settings_content div.group p:hover {
  background-color: rgba(3,37,65, 1);
  color: #fff;
}
div.settings_content div.group p:hover a {
  color: #fff;
}
div.settings_content div.group p {
  padding: 6px 20px;
  font-size: 0.9em;
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  align-items: center;
}
div.settings_content div.group h2, div.settings_content div.group h3, div.settings_content div.group p {
  margin: 0;
  padding: 9px 20px;
}
.tmdb_theme_white .k-tooltip, .k-widget.k-tooltip.tmdb_theme_white {
  background-color: #fff;
  color: #000;
  border: 1px solid rgba(33,37,41,0.15);
}
div.settings_content div.group a {
  display: inline-flex;
  align-items: center;
  font-weight: 600;
  color: rgba(0,0,0,0.6);
  background-color: transparent;
}
div.settings_content div.group, div.settings_content div.group.no_pad {
  border-top: 1px solid rgba(33,37,41,0.15);
  padding: 4px 0;
}
.k-widget, .k-textbox, .k-textarea, .k-button {
  font-family: 'Source Sans Pro', Arial, sans-serif;
  font-size: 1em;
}
.tmdb_theme_white .k-callout-n {
  border-bottom-color: #fff;
}
.k-tooltip .k-callout {
  color: #000;
}
.k-callout-n {
  margin-left: -0.4rem;
  border-bottom-color: currentColor;
  top: -0.8rem;
  left: 50%;
  pointer-events: none;
}
.k-callout {
  width: 0.8rem;
  height: 0.8rem;
  border-width: 0.4rem;
  border-style: solid;
  border-color: transparent;
  box-sizing: border-box;
  position: absolute;
  pointer-events: none;
}

.k-callout:after {
  position: absolute;
  display: block;
  width: 0;
  height: 0;
  border-color: transparent;
  border-style: solid;
}
/**
  搜索部分
 */
header a {
  color: #fff;
  font-weight: 600;
}
header ul li.glyph a.search, header ul li.glyph a.close {
  font-size: 1.3em;
}
header ul li.glyph a {
  height: 100%;
  display: inline-flex;
  align-items: center;
}
header ul li.glyph a span {
  background-color: transparent;
}
header ul li span.glyphicons_v2 {
  font-size: 1.4em;
}
.svg.invert {
  filter: invert(1);
}
.glyphicons_v2.search.blue {
  background-image: url(https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-28-search-blue-177462d06db81ff2a02aa022c1c0be5ba4200d7bd3f51091ed9298980e3a26a1.svg);
}
.glyphicons_v2.menu-close {
  background-image: url(https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-599-menu-close-7400e9a2ea92ad8d7cccf18d1ea34cd690790638a6e7768922eaef6e07109723.svg);
}
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
.k-animation-container {
  border-radius: 0 0 0.25rem 0.25rem;
}
.k-item-child-list {
  width: 170px;
  overflow: hidden;
  z-index: 10002;
  top: 40px;
  left: 0;
  box-sizing: content-box;
  position: absolute;
  background-color: #fff;
  border-radius: 0.25rem;
  border: 1px solid rgba(0,0,0,0.15);
  color: #212529;
  transform: translateY(-138px);
}
.k-item-child-list>.k-item-child-list-ul {
  max-height: 445px;
  width: 100%;
  overflow: auto;
  position: absolute;
  font-size: 16px;
  font-family:  Arial, sans-serif;
  font-stretch: 100%;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  list-style: none;
  margin: 0;
  padding: 0;
  height: 100%;
}
.k-item-child-list>.k-item-child-list-ul>.k-item-child-list-ul-li, .k-item-child-list>.k-item-child-list-ul>.k-item-child-list-ul-li>.k-item-child-list-ul-li-a {
  width: 100%;
  font-size: 1rem;
  outline: 0;
  height: 36px;
  line-height: 36px;
}
.k-item-child-list>.k-item-child-list-ul>.k-item-child-list-ul-li:hover {
  color: #16181b;
  background-color: #f8f9fa;
}
.k-item-child-list>.k-item-child-list-ul>.k-item-child-list-ul-li>.k-item-child-list-ul-li-a {
  color: #000;
  text-align: left;
  width: 100%;
  font-weight: 400;
  padding: 3px 1.5rem;
  padding-right: calc(3rem + 16px);
}
.k-menu-item:hover .k-item-child-list {
  transform: translateY(0px)
}
.k-item-child-list ul li:hover {
  color: #212529;
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
  background-image: url(https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-28-search-3992eb97b2b749f09793f9653407c499aa896d99535cb35cc66682d26a49df13.svg);
  background-position: left center;
  background-size: 20px;
  background-repeat: no-repeat;
  margin: 0;
}
</style>