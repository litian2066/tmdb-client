<template>
  <div class="basic-form">
    <el-form
      label-position="top"
      ref="dramaForm"
      :rules="rules"
      label-width="80px"
      :model="formData"
    >
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="原剧集语言" prop="language">
            <el-select
              v-model="formData.language"
              placeholder="请选择原剧集语言"
            >
              <el-option
                :key="index"
                v-for="(item, index) in LanguageConstants"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="18">
          <el-form-item label="原始国家或地区" prop="countryList">
            <el-select
              size="medium"
              multiple
              v-model="formData.countryList"
              placeholder="请选择原始国家或地区"
              style="height: 38px"
            >
              <el-option
                :key="index"
                v-for="(item, index) in CountryList"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item prop="originalTitle">
            <slot name="label">
              <span class="init-label"
                >原产地名称
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="原始片名应以条目的原始语言书写，通常和“原始语言”栏选择的语言一致。"
                  placement="top-start"
                >
                  <span
                    element="original_title"
                    class="glyphicons_v2 circle-question tooltip"
                  ></span>
                </el-tooltip>
              </span>
              <el-input
                v-model="formData.originalTitle"
                placeholder="请输入原产地名称"
              ></el-input>
            </slot>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="所选地区语言的名称" prop="showTitle">
            <el-input
              v-model="formData.showTitle"
              placeholder="请输入所选地区语言的名称"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="年份" prop="year">
            <el-date-picker
              v-model="formData.year"
              type="year"
              placeholder="请选择年份"
              value-format="YYYY"
              format="YYYY"
              style="width: 100%"
              @change="yearChange"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="premiered" label="首次播放时间">
            <el-date-picker
              type="date"
              placeholder="请选择首次播放时间"
              v-model="formData.premiered"
              style="width: 100%"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item class="left-handler" label="海报" prop="poster">
        <el-upload
          class="avatar-uploader"
          action="http://172.16.120.203:8000/common/upload/image"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="formData.poster" :src="formData.poster" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item prop="plot">
        <slot name="label">
          <span class="init-label"
            >所选地区语言的剧情简介
            <el-tooltip
              class="item"
              effect="dark"
              content="剧情简介请尽量简明扼要，不要剧透。"
              placement="top-start"
            >
              <span
                element="original_title"
                class="glyphicons_v2 circle-question tooltip"
              ></span>
            </el-tooltip>
          </span>
          <el-input
            type="textarea"
            :rows="4"
            v-model="formData.plot"
          ></el-input>
        </slot>
      </el-form-item>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="剧集类型" prop="type">
            <el-select v-model="formData.type" placeholder="请选择剧集类型">
              <el-option
                :key="index"
                v-for="(item, index) in DramaTypeList"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="剧集状态" prop="status">
            <el-select v-model="formData.status" placeholder="请选择剧集状态">
              <el-option
                :key="index"
                v-for="(item, index) in DramaStateList"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item>
            <slot name="label">
              <span class="init-label"
                >是否为成人剧集？
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="一般来说，此项仅用于标记色情内容。更多信息请查阅 数据编辑参考手册"
                  placement="top-start"
                >
                  <span
                    element="original_title"
                    class="glyphicons_v2 circle-question tooltip"
                  ></span>
                </el-tooltip>
              </span>
              <el-select
                v-model="formData.adultFlag"
                placeholder="请选择是否为成人剧集？"
              >
                <el-option
                  :key="index"
                  v-for="(item, index) in WhetherList"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </slot>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item>
            <slot name="label">
              <span class="init-label"
                >主页
                <el-tooltip
                  style="font-size: 17px; line-height: 17px"
                  class="item"
                  effect="dark"
                  content="仅官方主页，影迷页不允许"
                  placement="top-start"
                >
                  <i class="el-icon-question"></i>
                </el-tooltip>
                <a href="javascript:void(0)" target="_blank" rel="noopener"
                  ><span class="glyphicons_v2 square-new-window"></span
                ></a>
              </span>
              <el-input v-model="formData.homepage"></el-input>
            </slot>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="时长" prop="runtime">
            <el-input
              size="mini"
              type="number"
              v-model="formData.runtime"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="原声对白语言？" prop="acousticDialogueLanguageList">
        <el-select
          multiple
          size="mini"
          v-model="formData.acousticDialogueLanguageList"
          placeholder="请选择原声对白语言"
        >
          <el-option
            :key="index"
            v-for="(item, index) in LanguageConstants"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('dramaForm')"
          >立即创建</el-button
        >
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {
  LanguageConstants,
  WhetherList,
  DramaTypeList,
  DramaStateList,
  CountryList,
} from "@/constants/common";
import { DramaSeriesAPI } from "@/api/drama-series";
export default {
  name: "dramaSeriesBasic",
  data() {
    return {
      LanguageConstants,
      WhetherList,
      DramaTypeList,
      DramaStateList,
      CountryList,
      formData: {
        title: "",
        originTitle: "",
        showTitle: "",
        poster: "",
        countryList: null,
        adultFlag: "",
        acousticDialogueLanguage: "",
        acousticDialogueLanguageList: null,
      },
      rules: {
        language: [
          { required: true, message: "原剧集语言不能为空", trigger: "blur" },
        ],
        countryList: [
          {
            required: true,
            message: "原始国家或地区不能为空",
            trigger: "blur",
          },
        ],
        originalTitle: [
          { required: true, message: "原产地名称不能为空", trigger: "blur" },
        ],
        showTitle: [
          {
            required: true,
            message: "所选地区语言的名称不能为空",
            trigger: "blur",
          },
        ],
        year: [
          {
            type: "date",
            required: true,
            message: "年份不能不选",
            trigger: "change",
          },
        ],
        premiered: [
          {
            type: "date",
            required: true,
            message: "首次播放时间不能不选",
            trigger: "change",
          },
        ],
        plot: [
          {
            required: true,
            message: "所选地区语言的剧情简介不能为空",
            trigger: "blur",
          },
        ],
        imdbId: [{ required: true, message: "请输入IMDB Id", trigger: "blur" }],
        poster: [{ required: true, message: "请上传海报", trigger: "blur" }],
      },
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      console.log(file);
      if (res.code === 200) {
        this.formData.poster = res.data.filePath;
        // 目前就只有一个附件
        this.formData.fileInfoList = [];
        this.formData.fileInfoList.push(res.data);
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
    yearChange(val) {
      let date = new Date(val);
      this.formData.year = date.getFullYear().toString();
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.saveData(this.formData);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    async saveData(data) {
      data.operateState = "1";
      try {
        let res = await DramaSeriesAPI.add(data);
        if (res.data) {
          this.$message({
            type: "success",
            message: "保存成功",
          });
        }
      } catch (e) {
        console.error(e);
      }
    },
  },
};
</script>

<style scoped>
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
/deep/ .el-input__inner {
  height: 38px;
}
/deep/ .el-date-editor.el-input,
.el-date-editor.el-input__wrapper {
  height: 38px;
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
span.glyphicons_v2 {
  margin-left: 0px;
  font-size: 1.1em;
  top: 3px;
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
.init-label {
  font-weight: 600;
  color: #212529;
  font-size: 1rem;
  line-height: 1.5;
  font-family: "Source Sans Pro", Arial, sans-serif;
  margin-bottom: 6px;
}
.init-label:before {
  content: "*";
  color: var(--el-color-danger);
  margin-right: 4px;
}
.glyphicons_v2.square-new-window {
  background-image: url(https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-152-square-new-window-c575b6c7170e08a226598e1b5646648a3943df21baa29d01abd4f84f7f64f510.svg);
}
.tooltip-icon {
  vertical-align: middle;
  ont-size: 1.1em;
  margin-bottom: 2px;
}
/*/deep/ .el-select .el-input__inner {*/
/*  height: 38px;*/
/*}*/
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
</style>
