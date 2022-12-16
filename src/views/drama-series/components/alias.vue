<template>
  <div class="k-grid k-widget k-grid-display-block k-editable">
    <div class="k-toolbar k-grid-toolbar">
      <a role="button" class="k-button k-button-icontext k-grid-add" href="#">
        <span class="k-icon k-i-plus"></span>添加别名
      </a>
    </div>
    <el-table
        :data="tableData"
        style="width: 100%"
        border
        stripe
        :header-row-class-name="tableHeader"
        :header-row-style="headerRowStyle"
        :header-cell-class-name="tableHeader"
        :header-cell-style="headerRowStyle"
        :default-sort = "{prop: 'date', order: 'descending'}"
    >
      <el-table-column
          prop="nationName"
          label="名字"
          sortable
          width="180">
      </el-table-column>
      <el-table-column
          prop="name"
          label="类型"
          sortable
          width="180">
      </el-table-column>
      <el-table-column
          prop="address"
          label="国家或地区">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "dramaSeriesAlias",
  data() {
    return {
      tableData: [],
      tableHeader: 'table-header',
      headerRowStyle: {
        backgroundColor: '#f8f9fa'
      }
    }
  }
}
</script>

<style scoped>
.k-toolbar {
  margin: 0;
  padding: 0.375rem 0.375rem;
  border-width: 1px;
  border-style: solid;
  box-sizing: border-box;
  outline: 0;
  font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
  font-size: 1rem;
  line-height: 1.5;
  list-style: none;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-flow: row wrap;
  flex-flow: row wrap;
  gap: 0.375rem;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-pack: start;
  justify-content: flex-start;
  position: relative;
  overflow: hidden;
  -webkit-touch-callout: none;
  -webkit-tap-highlight-color: transparent;
}
.k-toolbar {
  border-color: #dee2e6;
  color: #212529;
  background-color: #f8f9fa;
}
.k-grid-toolbar {
  border-width: 1px 1px 0px 1px;
  flex-shrink: 0;
  border-radius: 8px 8px 0px 0px;
}
.k-toolbar {
  overflow: visible;
}
.k-toolbar::before {
  content: "";
  height: calc(1.5em + 0.75rem + 2px);
  -webkit-margin-start: -0.375rem;
  margin-inline-start: -0.375rem;
}
.k-button+.k-button, .k-toolbar .k-button:first-child, .k-link+.k-button {
  margin-left: 0.375rem;
}
.k-grid a {
  color: inherit;
  text-decoration: none;
}
.k-widget, .k-textbox, .k-textarea, .k-button {
  font-family: 'Source Sans Pro', Arial, sans-serif;
  font-size: 1em;
}
.k-toolbar .k-button, .k-toolbar .k-button-group, .k-toolbar .k-separator, .k-toolbar .k-split-button, .k-toolbar .k-textbox, .k-toolbar .k-widget, .k-toolbar label {
  display: flex;
  align-items: center;
  align-content: center;
}
.k-toolbar .k-button, .k-toolbar .k-button-group, .k-toolbar .k-separator, .k-toolbar .k-split-button, .k-toolbar .k-textbox, .k-toolbar .k-widget, .k-toolbar label {
  -ms-flex-item-align: center;
  align-self: center;
}
.k-button {
  border: none;
  border-radius: 8px;
  padding-left: 1.2rem;
  padding-right: 1.2rem;
}
.k-widget, .k-textbox, .k-textarea, .k-button {
  font-family: 'Source Sans Pro', Arial, sans-serif;
  font-size: 1em;
}
.k-toolbar>* {
  -ms-flex-negative: 0;
  flex-shrink: 0;
  display: -ms-inline-flexbox;
  display: inline-flex;
  -ms-flex-align: stretch;
  align-items: stretch;
  -ms-flex-line-pack: center;
  align-content: center;
  vertical-align: middle;
}
.k-button {
  border-color: #e4e7eb;
  color: #212529;
  background-color: #e4e7eb;
}
.k-button {
  transition: color .2s ease-in-out,background-color .2s ease-in-out,border-color .2s ease-in-out,box-shadow .2s ease-in-out;
}
.k-button-icontext {
  overflow: visible;
}
.k-button {
  border-radius: 0.25rem;
  padding: 0.375rem 0.75rem;
  box-sizing: border-box;
  border-width: 1px;
  border-style: solid;
  font-size: 1rem;
  line-height: 1.5;
  font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
  text-align: center;
  text-decoration: none;
  white-space: nowrap;
  display: -ms-inline-flexbox;
  display: inline-flex;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-pack: center;
  justify-content: center;
  vertical-align: middle;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  cursor: pointer;
  outline: 0;
  -webkit-appearance: none;
  position: relative;
}
.k-grid {
  border-radius: 8px;
  border-color: rgba(33,37,41,0.125);
  color: #212529;
  background-color: #fff;
}
/v-deep/ .table-header {
  background-color: #f8f9fa;
}
/v-deep/ .table-header th {
  background-color: #f8f9fa;
}
</style>