<template>
  <div
    class="b-upload"
    :class="{
      'b-upload__single':
        type === 'singleImage' && width !== 'auto' && height !== 'auto'
    }"
    :style="{ width: width, height: height }"
  >
    <!-- :before-remove="beforeRemove" -->

    <el-upload
      action="#"
      :accept="accept"
      :list-type="listType"
      :show-file-list="showFileList"
      :file-list="fileList"
      :on-preview="onPreview"
      :on-remove="onRemove"
      :on-success="onSuccess"
      :on-error="onError"
      :on-exceed="onExceed"
      :before-upload="beforeUpload"
      :http-request="onUpload"
    >
      <div v-if="tip" slot="tip" class="el-upload__tip">{{ tip }}</div>

      <slot v-if="!(type === 'singleImage' && singleFile.status !== '')">
        <el-button
          v-if="listType === 'text'"
          :disabled="triggerDisabled"
          @click="handlerClick"
          size="small"
          type="primary"
          >点击上传</el-button
        >
        <i v-else class="el-icon-plus"></i>
      </slot>

      <div v-if="type === 'singleImage' && this.value" class="b-upload-image">
        <img
          class="b-upload-image__thumbnail"
          :src="singleFile.localUrl || singleFile.url"
        />
        <el-progress
          v-if="singleFile.status === 'uploading'"
          type="circle"
          :percentage="singleFile.percentage"
        ></el-progress>
        <div
          v-if="singleFile.status === 'success'"
          class="b-upload-image__mask"
        >
          <div class="b-upload-image__actions" @click.prevent.stop>
            <span
              class="b-upload-image__preview el-icon-view"
              @click="handleSinglePreview"
            ></span>
            <span
              class="b-upload-image__delete el-icon-delete"
              @click="handleSingleRemove"
            ></span>
          </div>
        </div>
      </div>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible" append-to-body>
      <img width="100%" :src="previewImageUrl" />
    </el-dialog>
  </div>
</template>

<script>
import { upload } from "@/api/wlhy/index";
export default {
  props: {
    /**
     * singleImage string | object
     * multipleImage - string[] | object | []
     * singleMedia
     * multipleMedia
     * media - object | object[]
     */
    accept: {
      type: String,
      default: "image/*"
    },
    type: {
      type: String,
      default: "singleImage"
    },
    count: {},
    value: {
      type: [String, Array, Object]
    },
    baseUrl: {
      type: String,
      default: ""
    },
    width: {
      type: String,
      default: "auto"
    },
    height: {
      type: String,
      default: "auto"
    },
    maxSize: {
      type: Number,
      default: 2
    },
    tip: {
      type: String
    },
    limit: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      fileList: [],
      imageUrl: "",
      singleFile: {
        url: "",
        localUrl: "",
        status: "", // ready、uploading、success、fail
        percentage: 0,
        name: "",
        extend: {}
      },
      multipleFile: [],
      previewImageUrl: "",
      dialogVisible: false,
      list: [],
      isListInit: false
    };
  },
  computed: {
    listType() {
      let type = "text";
      if (this.type === "singleImage") {
        type = "picture-card";
      } else if (this.type === "multipleImage") {
        type = "picture-card";
      }
      return type;
    },
    showFileList() {
      return !(this.type === "singleImage");
    },
    triggerDisabled() {
      if (this.type === "singleMedia" && this.singleFile.url) {
        return true;
      }
      return false;
    }
  },
  watch: {
    value: {
      handler(val) {
        // console.log("value", val);
        if (val) {
          if (this.type === "singleImage") {
            let url;
            if (typeof val === "string") {
              url = this.baseUrl + val;
            } else if (typeof val === "object") {
              url = val.url;
            }
            if (this.singleFile.url === url) return;
            this.singleFile.status = "success";
            this.singleFile.localUrl = "";
            this.singleFile.url = url;
          } else if (this.type === "singleMedia") {
            if (this.singleFile.url === val.url) return;
            this.singleFile.url = val.url;
            this.singleFile.name = val.name;
            this.singleFile.extend = val.extend | {};
            this.fileList = [
              {
                url: val.url,
                name: val.name,
                uid: val.uid || val.url,
                status: "success",
                extend: val.extend || {}
              }
            ];
          } else if (this.type === "media") {
            let list = val;
            if (this.getType(val) === "object") {
              list = [val];
            }
            // const arr = []
            list.forEach((item, index) => {});
            this.list = list.map(item => {
              return {
                url: item.url,
                name: item.name,
                uid: item.uid || item.url,
                status: "success",
                extend: item.extend || {}
              };
            });
            this.fileList = list.map(item => {
              return {
                url: item.url,
                name: item.name,
                uid: item.uid || item.url,
                status: "success",
                extend: item.extend || {}
              };
            });
          }
        }
      },
      immediate: true
    },
    default: {
      handler(val) {
        // console.log("list", val);
        console.log();
      },
      deep: true
    },
    list: {
      handler(val) {
        // console.log("list", val);
        console.log();
      },
      deep: true
    }
  },
  methods: {
    getType() {
      return Object.prototype.toString
        .call({})
        .toLocaleLowerCase()
        .slice(8, -1);
    },
    handlerUpload(file, callback) {
      // if (this.handler) {
      //   const params = new FormData();
      //   params.append("file", file);
      // }
      return upload(file, callback).then(res => {
        return {
          url: res.data.data.url,
          extend: res.data.data
        };
      });
    },
    /**
     * 单图 自定义预览
     */
    handleSinglePreview() {
      this.previewImageUrl = this.singleFile.localUrl || this.singleFile.url;
      this.dialogVisible = true;
    },
    /**
     * 单图 自定义移除
     */
    handleSingleRemove(file) {
      this.$confirm("确定移除吗？", { type: "warning" })
        .then(() => {
          this.singleFile.localUrl = "";
          this.singleFile.url = "";
          this.singleFile.status = "";
          this.singleFile.percentage = 0;
          this.singleFile.name = "";
          this.singleFile.extend = {};
          this.$emit("input", "");
          this.$emit("change", this.singleFile);
        })
        .catch(() => {});
    },
    onPreview(file) {
      // console.log("preview", file);
      if (this.type === "singleImage") {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      }
    },
    // beforeRemove(file, fileList) {
    //   console.log(file, fileList);
    //   return this.$confirm("确定移除吗？");
    // },
    onRemove(file, fileList) {
      // console.log("remove", file, fileList, this.fileList === fileList);
      // console.log("ff", this.fileList, this.fileList.indexOf(file));
      // console.log("ff", this.fileList, file, fileList);
      if (this.type === "singleMedia") {
        this.singleFile.url = "";
        this.singleFile.status = "";
        this.singleFile.percentage = 0;
        this.singleFile.name = "";
        this.singleFile.extend = {};
        this.$emit("input", this.singleFile);
        this.$emit("change", this.singleFile);
      }
    },
    /**
     * 上传成功
     */
    onSuccess(res, file) {
      // this.imageUrl = URL.createObjectURL(file.raw);
      if (this.type === "singleImage") {
        this.singleFile.status = "success";
        this.singleFile.url = this.baseUrl + res.url;
        this.singleFile.extend = res.extend;
        this.$emit("input", res.url);
        this.$emit("change", this.singleFile);
      } else if (this.type === "singleMedia") {
        this.singleFile.status = "success";
        this.singleFile.url = res.url;
        this.singleFile.extend = res.extend;
        this.$emit("input", this.singleFile);
        this.$emit("change", this.singleFile);
      }
      // console.log("success", res, file, this.singleFile, this.baseUrl);
    },
    /**
     * 上传失败
     */
    onError(err, file, fileList) {
      console.log("error", err, file, fileList);
      if (this.type === "singleImage") {
        this.singleFile.localUrl = "";
        this.singleFile.url = "";
        this.singleFile.status = "";
        this.singleFile.percentage = 0;
        this.singleFile.name = "";
        this.singleFile.extend = {};
      }
    },
    onExceed(files, fileList) {
      console.log("onExceed", files, fileList);
    },
    /**
     * 上传前钩子 limit 限制图片大小
     */
    beforeUpload(file) {
      //  const type = file.type === 'image/jpeg';
      const size = file.size / (1024 * 1024) > this.maxSize;

      if (size) {
        this.$message.warning(`确保图片在 ${this.maxSize}MB 之内`);
        return false;
      }
      if (this.type === "singleImage") {
        this.singleFile.localUrl = URL.createObjectURL(file);
        this.singleFile.name = file.name;
      } else if (this.type === "singleMedia") {
        this.singleFile.name = file.name;
      }
    },
    onUpload(option) {
      // console.log(option);
      const file = option.file;
      if (this.type === "singleImage") {
        this.singleFile.status = "uploading";
      }

      this.handlerUpload(file, p => {
        // console.log("progress", p);
        if (p.total > 0) {
          p.percent = (p.loaded / p.total) * 100;
        }
        option.onProgress(p);
        if (this.type === "singleImage") {
          this.singleFile.percentage = p.percent;
        }
      })
        .then(res => {
          option.onSuccess(res);
        })
        .catch(err => {
          option.onError(err);
        });
    },
    handlerClick(event) {
      if (this.triggerDisabled) {
        event.stopPropagation();
        event.preventDefault();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.b-upload {
  .el-upload--picture-card {
    border: none;
  }
}

.b-upload-single {
  /deep/ .el-upload--picture-card {
    display: none;
  }

  /deep/ .el-upload-list--picture-card .el-upload-list__item {
    margin: 0;
  }
}

.b-upload__single {
  position: relative;

  /deep/ .el-upload__tip {
    position: absolute;
    bottom: -8px;
    transform: translateY(100%);
  }

  /deep/ .el-upload--picture-card {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    line-height: 1;
  }
}

.b-upload-image {
  position: relative;
  width: 100%;
  height: 100%;

  .el-progress {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .b-upload-image__thumbnail {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .b-upload-image__mask {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 3;
    display: flex;
    align-items: flex-end;
    background-color: rgba($color: #000, $alpha: 0.1);
    opacity: 0;

    &:hover {
      opacity: 1;
    }
  }

  .b-upload-image__actions {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    height: 40px;
    background-color: rgba($color: #000, $alpha: 0.18);
  }

  .b-upload-image__preview,
  .b-upload-image__delete {
    margin: 0 5px;
    font-size: 20px;
    line-height: 1;
    color: #fff;

    &:hover {
      transform: scale(1.05);
    }
  }
}
</style>
