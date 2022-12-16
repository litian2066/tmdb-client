<template>
  <div class="k-grid k-widget k-grid-display-block k-editable">
    <div class="k-toolbar k-grid-toolbar">
      <a
        role="button"
        class="k-button k-button-icontext k-grid-add"
        href="javascript:void(0)"
        @click="onAddClick"
      >
        <span class="k-icon k-i-plus"></span>添加新季
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
      :default-sort="{ prop: 'date', order: 'descending' }"
    >
      <el-table-column prop="nationName" label="季" sortable width="180">
      </el-table-column>
      <el-table-column prop="name" label="名字" sortable width="180">
      </el-table-column>
      <el-table-column prop="address" label="季剧情"> </el-table-column>
      <el-table-column prop="address" label="最初播出日期"> </el-table-column>
      <el-table-column fixed="right" label="" width="120">
        <template #default>
          <el-button link type="primary" size="small">
            <el-icon style="vertical-align: middle">
              <edit />
            </el-icon>
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      title="新增"
      v-model="dialogSeasonHandlerVisible"
      width="900px"
      top="10px"
    >
      <el-form
        :model="dramaSeason"
        ref="seasonForm"
        :rules="seasonRules"
        label-width="130px"
      >
        <el-form-item label="季编号" prop="seasonIndex">
          <el-input type="number" v-model="dramaSeason.seasonIndex"></el-input>
        </el-form-item>

        <el-form-item label="名字" prop="originalTitle">
          <el-input v-model="dramaSeason.originalTitle"></el-input>
        </el-form-item>

        <el-form-item class="left-handler" label="季图片" prop="thumb">
          <el-upload
            class="avatar-uploader"
            action="http://172.16.120.203:8000/common/upload/image"
            :show-file-list="false"
            :on-success="handleEpisodeAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="dramaSeason.thumb"
              :src="dramaSeason.thumb"
              class="avatar"
            />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>

        <el-form-item label="季剧情" prop="plot">
          <el-input
            v-model="dramaSeason.plot"
            type="textarea"
            rows="5"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button
            v-if="$utils.isNotEmpty(dramaSeason.pkId)"
            type="primary"
            @click="onSeasonUpdateClick"
            >修改</el-button
          >
          <el-button v-else type="primary" @click="onSeasonSaveClick"
            >立即创建</el-button
          >
          <el-button @click="dialogSeasonHandlerVisible = false"
            >取消</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "dramaSeriesAlias",
  data() {
    return {
      tableData: [],
      tableHeader: "table-header",
      headerRowStyle: {
        backgroundColor: "#f8f9fa",
      },
      dialogSeasonHandlerVisible: false,
      dramaSeason: {
        seasonIndex: "",
        seasonName: "",
      },
      seasonRules: [],
    };
  },
  methods: {
    handleEpisodeAvatarSuccess(res, file) {
      if (res.code === 200) {
        this.dramaSeason.thumb = res.data.filePath;
        // 目前就只有一个附件
        this.dramaSeason.fileInfoList = [];
        this.dramaSeason.fileInfoList.push(res.data);
      } else {
        this.$message.error("上传图片失败");
      }
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    onAddClick() {
      this.dialogSeasonHandlerVisible = true;
    },
    onSeasonSaveClick() {
      alert("save");
    },
    onSeasonUpdateClick() {
      alert("update");
    },
  },
};
</script>

<style scoped>
.k-toolbar {
  margin: 0;
  padding: 0.375rem 0.375rem;
  border-width: 1px;
  border-style: solid;
  box-sizing: border-box;
  outline: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
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
.k-button + .k-button,
.k-toolbar .k-button:first-child,
.k-link + .k-button {
  margin-left: 0.375rem;
}
.k-grid a {
  color: inherit;
  text-decoration: none;
}
.k-widget,
.k-textbox,
.k-textarea,
.k-button {
  font-family: "Source Sans Pro", Arial, sans-serif;
  font-size: 1em;
}
.k-toolbar .k-button,
.k-toolbar .k-button-group,
.k-toolbar .k-separator,
.k-toolbar .k-split-button,
.k-toolbar .k-textbox,
.k-toolbar .k-widget,
.k-toolbar label {
  display: flex;
  align-items: center;
  align-content: center;
}
.k-toolbar .k-button,
.k-toolbar .k-button-group,
.k-toolbar .k-separator,
.k-toolbar .k-split-button,
.k-toolbar .k-textbox,
.k-toolbar .k-widget,
.k-toolbar label {
  -ms-flex-item-align: center;
  align-self: center;
}
.k-button {
  border: none;
  border-radius: 8px;
  padding-left: 1.2rem;
  padding-right: 1.2rem;
}
.k-widget,
.k-textbox,
.k-textarea,
.k-button {
  font-family: "Source Sans Pro", Arial, sans-serif;
  font-size: 1em;
}
.k-toolbar > * {
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
  transition: color 0.2s ease-in-out, background-color 0.2s ease-in-out,
    border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
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
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
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
  border-color: rgba(33, 37, 41, 0.125);
  color: #212529;
  background-color: #fff;
}
/v-deep/ .table-header {
  background-color: #f8f9fa;
}
/v-deep/ .table-header th {
  background-color: #f8f9fa;
}
/deep/ .el-form-item__error {
  color: red;
  margin-top: 2px;
  font-weight: 600;
  font-size: 12px;
  line-height: 1;
  padding-top: 2px;
  position: absolute;
  top: 100%;
  left: 0;
}
/deep/ .el-form--label-top .el-form-item__label {
  font-weight: 600;
  color: #212529;
  font-size: 1rem;
  line-height: 1.5;
  font-family: "Source Sans Pro", Arial, sans-serif;
}
/deep/ .el-select {
  width: 100%;
}
/deep/ .el-tag--small {
  height: 30px;
  padding: 4px 8px;
  line-height: 22px;
}
/deep/ .el-select .el-select__tags-text {
  font-size: 14px;
  color: #212529;
}
/deep/ .left-handler .el-form-item__label {
  text-align: right;
  vertical-align: middle;
  float: left;
  font-size: 14px;
  line-height: 40px;
  padding: 0 12px 0 0;
  box-sizing: border-box;
  font-weight: 600;
  font-family: "Source Sans Pro", Arial, sans-serif;
  border-radius: 8px;
}

/deep/ .el-input__inner {
  height: 38px;
}
/deep/ .el-date-editor.el-input,
.el-date-editor.el-input__wrapper {
  height: 38px;
}
/*上传的部分*/
/deep/ .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
/deep/ .avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 250px;
  display: block;
}
</style>
