<template>
  <div class="k-image-upload">
    <el-upload
      ref="upload"
      :action="action"
      :headers="{ Authorization: 'Bearer ' + $store.getters.access_token }"
      :file-list="fileList"
      :show-file-list="false"
      list-type="text"
      :limit="2"
      :accept="accept"
      :multiple="false"
      :before-upload="onBeforeUpload"
      :on-progress="onProgress"
      :on-success="onSuccess"
      :on-error="onError"
      :on-change="onChange"
      :before-remove="onBeforeRemove"
      :on-remove="onRemove"
    >
      <div class="k-upload-trigger" :style="triggerStyle">
        <template v-if="fileList[0]">
          <el-image
            style="width: 100%; height: 100%;"
            :src="fileList[0].url"
            fit="contain"
          >
          </el-image>
          <div class="k-upload-action" @click.stop>
            <i class="el-icon-view k-upload-btn" @click="onPreview"></i>
            <i class="el-icon-download k-upload-btn" @click="onDownload"></i>
          </div>
        </template>
        <i v-else class="el-icon-plus k-upload-icon"></i>

        <transition name="el-fade-in-linear">
          <el-progress
            v-show="progressPercent != 100 && progressPercent != 0"
            class="progress"
            type="circle"
            :percentage="progressPercent"
          ></el-progress>
        </transition>
      </div>

      <template v-if="tip" slot="tip">
        <div class="k-image-upload-tip">
          <i class="k-image-upload-tip-icon">*</i>
          <span>{{ tip }}</span>
        </div>
      </template>
    </el-upload>

    <!-- 图片预览 -->
    <el-dialog :visible.sync="dialogVisible" append-to-body>
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    value: {},
    valueType: {},
    width: {
      type: [String, Number],
      default: "100%"
    },
    height: {
      type: [String, Number],
      default: 200
    },
    maxSize: {
      type: Number,
      default: 2
    },
    tip: {
      type: String
    },
    prefix: {
      type: String,
      default: "/api"
    }
  },
  data() {
    return {
      action: "/api/manager/sys-file/upload",
      fileList: [],
      dialogVisible: false,
      dialogImageUrl: null,
      progressPercent: 0,
      limit: 5,
      accept: "image/*"
    };
  },
  computed: {
    triggerStyle() {
      return {
        width: typeof this.width == "number" ? this.width + "px" : this.width,
        height:
          typeof this.height == "number" ? this.height + "px" : this.height
      };
    }
  },
  watch: {
    value: {
      handler(val) {
        const currentSrc = this.fileList[0] ? this.fileList[0].src : undefined;
        if (val && val != currentSrc) {
          const arr = val.split("/");
          const fileName = arr[arr.length - 1];
          this.fileList = [
            {
              uid: Date.now(),
              name: fileName,
              url: this.prefix + val,
              percentage: 100,
              size: 0,
              status: "success",
              src: val,
              _type: "default"
            }
          ];
        }
      },
      deep: true,
      immediate: true
    },
    fileList: {
      handler(val) {
        const currentVal = val.map(item => item.src).join(",");
        this.$emit("input", currentVal);
        this.$emit("change", val);
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    onBeforeUpload(file) {
      console.log("before-upload", file);
      const isLtSize = file.size / 1024 / 1024 < this.maxSize;
      if (!isLtSize) {
        file._overFlow = true;
        this.$message.error(`上传文件大小不能超过 ${this.maxSize}MB!`);
        return false;
      }
      this.progressPercent = 1;
      return true;
    },
    /**
     * 上传进度
     */
    onProgress(event, file, fileList) {
      console.log("onProgress", event, file, fileList);
      this.progressPercent = event.percent;
    },
    /**
     * 上传成功
     */
    onSuccess(response, file, fileList) {
      console.log("onSuccess", response, file, fileList);
      file._type = "upload";
      file.url = this.prefix + response.data.url;
      file.src = response.data.url;
      this.fileList = fileList.slice(-1);
    },
    /**
     * 上传失败，不会改变列表
     */
    onError(err, file, fileList) {
      console.log("error", err, file, fileList);
    },
    /**
     * 文件状态改变时的钩子；添加文件（）、上传成功（success）和上传失败（）
     */
    onChange(file, fileList) {
      console.log("change", JSON.stringify(file), JSON.stringify(fileList));
    },
    /**
     * 移除前
     */
    onBeforeRemove(file, fileList) {
      console.log("before-remove", file);
      if (file.status === "ready") return true;
      return this.$confirm(`确定移除文件 ${file.name}？`);
    },
    /**
     * 已移除
     */
    onRemove(file, fileList) {
      console.log("remove", file);
      this.fileList = fileList;
    },
    // 图片预览 附件下载
    onPreview() {
      const file = this.fileList[0];
      console.log("preview", file);
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    onDownload() {
      const file = this.fileList[0];
      window.saveAs(file.url, file.name);
    }
  }
};
</script>

<style  scoped>
.k-image-upload {
  /deep/ .el-upload {
    width: 100%;
  }
  .k-upload-trigger {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    font-size: 20px;
    background-color: #fbfdff;
    border: 1px dashed #c0ccda;
    border-radius: 6px;
    &:hover {
      border-color: #409eff;
      color: #409eff;

      .k-upload-action {
        display: flex;
      }
    }

    .k-upload-action {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 99;
      height: 44px;
      display: none;
      justify-content: center;
      align-items: center;
      gap: 8px;
      background-color: rgba(0, 0, 0, 0.23);

      .k-upload-btn:hover {
        color: #0d4680;
      }
    }

    .progress {
      position: absolute;
      top: 50%;
      left: 50%;
      z-index: 1;
      transform: translate(-50%, -50%);
    }
  }

  .k-image-upload-tip {
    color: #898989;
    font-size: 12px;

    .k-image-upload-tip-icon {
      color: #f40;
      margin-right: 5px;
    }
  }
}

.upload /deep/ .el-upload {
  position: relative;
}
.upload.fill /deep/ .el-upload--picture-card {
  width: 100%;
  height: 148px;
}
.upload .b-upload-image__mask {
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
</style>
