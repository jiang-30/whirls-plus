<template>
  <div :class="{ ishide: disabled, upload: true, fill: autoSize }">
    <el-upload
      ref="upload"
      :action="action"
      :headers="{ Authorization: 'Bearer ' + $store.getters.access_token }"
      :file-list="fileList"
      :show-file-list="_showFileList"
      :list-type="_listType"
      :drag="_drag"
      :limit="_limit"
      :accept="_accept"
      :multiple="_multiple"
      :on-exceed="onExceed"
      :before-upload="onBeforeUpload"
      :on-progress="onProgress"
      :on-success="onSuccess"
      :on-error="onError"
      :on-change="onChange"
      :before-remove="onBeforeRemove"
      :on-remove="onRemove"
      :on-preview="onPreview"
    >
      <!-- avatar 限制上传一个图片文件 -->
      <template v-if="listType === 'avatar'">
        <template v-if="fileList[0]">
          <el-image
            style="width: 100%; height: 100%; border-radius: 6px;"
            :src="fileList[0].url"
          >
          </el-image>
          <!-- <div class="b-upload-image__mask">
            <div class="b-upload-image__actions" @click.prevent.stop>
              <span
                class="b-upload-image__preview el-icon-view"
                @click="onPreview(fileList[0])"
              ></span>
              <span
                class="b-upload-image__delete el-icon-delete"
                @click="onClear"
              ></span>
            </div>
          </div> -->
        </template>
        <i v-else class="el-icon-plus "></i>
        <transition name="el-fade-in-linear">
          <el-progress
            v-show="progressPercent != 100 && progressPercent != 0"
            class="progress"
            type="circle"
            :percentage="progressPercent"
          ></el-progress>
        </transition>
      </template>
      <!-- 图片列表 -->
      <template v-if="listType === 'picture-card'">
        <i class="el-icon-plus "></i>
      </template>

      <!-- 点击上传附件 -->
      <template v-if="listType === 'text' && !drag">
        <el-button v-if="listType === 'text'" size="small" type="primary"
          >点击上传</el-button
        >
      </template>

      <!-- 拖拽上传附件 -->
      <template v-if="listType === 'text' && drag">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      </template>

      <!-- 提示信息 -->
      <div slot="tip" class="el-upload__tip" v-if="showTip">
        <template v-if="tip">
          <span>{{ tip }}</span>
        </template>
        <template v-else>
          <span v-if="listType !== 'avatar'">
            可以上传 {{ limit }} 个文件，且
          </span>
          <span>单个文件大小不能超过 {{ size }}MB</span>
        </template>
      </div>
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
    /**
     * 传递 string | string[] | undefined
     */
    value: {},
    autoSize: {
      type: Boolean,
      default: false
    },
    /**
     * avatar 一个图片： limit 不限制； multiple 为false； drag 为false；新增成功后控制fileList
     * picture-card 图片列表：limit 后隐藏上传按钮
     * text 附件列表
     * picture 不支持
     */
    listType: {
      type: String,
      default: "picture-card"
    },
    drag: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    },
    limit: {
      type: Number,
      default: 3
    },
    size: {
      type: Number,
      default: 2
    },
    tip: {
      type: String
    },
    showTip: {
      type: Boolean,
      default: true
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
      uploadCount: 0,
      dialogVisible: false,
      dialogImageUrl: null,
      progressPercent: 0
    };
  },
  computed: {
    disabled() {
      return this.fileList.length >= this._limit;
    },
    _limit() {
      if (this.listType == "avatar") {
        return 2;
      }
      if (this.listType === "text" && this.limit === 1) {
        return 2;
      }
      return this.limit;
    },
    _drag() {
      if (this.listType == "avatar" || this.listType === "picture-card") {
        return false;
      }
      return this.drag;
    },
    _accept() {
      if (this.listType == "avatar" || this.listType === "picture-card") {
        return "image/*";
      }
      return this.accept;
    },
    _multiple() {
      if (this.listType == "avatar") {
        return false;
      }
      if (this._limit === 1) {
        return false;
      }
      return this.multiple;
    },
    _listType() {
      if (this.listType == "avatar") {
        return "picture-card";
      }
      return this.listType;
    },
    _showFileList() {
      if (this.listType == "avatar") {
        return false;
      }
      return true;
    }
  },
  watch: {
    value: {
      handler(list) {
        console.log("watch-value", list);
        console.log("currentInfo", this.listType);
        // 单个文件
        if (
          this.listType == "avatar" ||
          (this.listType == "text" && this.limit == 1)
        ) {
          const currentSrc = this.fileList[0]
            ? this.fileList[0].src
            : undefined;
          if (list && list != currentSrc) {
            const arr = list.split("/");
            const fileName = arr[arr.length - 1];
            this.fileList = [
              {
                uid: Date.now(),
                name: fileName,
                url: this.prefix + list,
                percentage: 100,
                size: 0,
                status: "success",
                src: list,
                _type: "default"
              }
            ];
          }
        } else if (this.listType == "text" && this.limit != 1) {
          console.log("asdfasdfasdfsda", list);
          if (list) {
            this.fileList = list.split(",").map((item, index) => {
              return {
                uid: Date.now() + index,
                name: item,
                url: this.prefix + item,
                percentage: 100,
                status: "success",
                src: item,
                _type: "default"
              };
            });
          }
        } else if (Array.isArray(list)) {
          this.fileList = list.map((item, index) => {
            return {
              ...item,
              uid: item.uid || index + 1,
              name: item.name,
              url: item.url || this.prefix + item.src,
              percentage: item.percentage || 100,
              size: item.size,
              status: item.status || "success",
              src: item.src,
              _type: item._type || "default"
            };
          });
        }
      },
      deep: true,
      immediate: true
    },
    fileList: {
      handler(val) {
        console.log("watch-fileList", val, this.value);
        const currentVal = val.map(item => item.src).join(",");
        this.$emit("input", currentVal);
        this.$emit("change", val);
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    /**
     * 超过限制
     */
    onExceed(files, fileList) {
      console.log("flag", this.$refs.upload.uploadFiles == fileList);
      console.log("exceed", files, fileList);
      this.$message.warning(
        `
        当前限制选择 ${this.limit} 个文件，
        本次选择了 ${files.length} 个文件，
        共选择了 ${files.length + fileList.length} 个文件
        `
      );
    },
    /**
     * 上传前
     */
    onBeforeUpload(file) {
      console.log("before-upload", file);
      //  const isJPG = file.type === 'image/jpeg';
      // if (!isJPG) {
      //   this.$message.error('上传头像图片只能是 JPG 格式!');
      // }
      const isLtSize = file.size / 1024 / 1024 < this.size;
      if (!isLtSize) {
        file._overFlow = true;
        this.$message.error(`上传文件大小不能超过 ${this.size}MB!`);
        return false;
      }
      this.progressPercent = 1;
      return true;
    },
    /**
     * 上传进度
     */
    onProgress(event, file, fileList) {
      console.log("flag", this.$refs.upload.uploadFiles == fileList);
      console.log(event, file, fileList);
      this.progressPercent = event.percent;
    },
    /**
     * 上传成功
     */
    onSuccess(response, file, fileList) {
      // console.log("flag", this.$refs.upload.uploadFiles == fileList);
      // console.log("flag1", file == fileList.at(-1));
      // console.log("success", response, file, fileList);

      file._type = "upload";
      file.url = this.prefix + response.data.url;
      file.src = response.data.url;
      if (this.listType === "avatar") {
        this.fileList = fileList.slice(-1);
      } else if (this.listType === "text" && this.limit === 1) {
        this.fileList = fileList.slice(-1);
      } else {
        this.fileList = fileList.slice(-this._limit);
      }
    },
    /**
     * 上传失败，不会改变列表
     */
    onError(err, file, fileList) {
      console.log("flag", this.$refs.upload.uploadFiles == fileList);
      console.log("error", err, file, fileList);
    },
    /**
     * 文件状态改变时的钩子；添加文件（）、上传成功（success）和上传失败（）
     */
    onChange(file, fileList) {
      console.log("flag", this.$refs.upload.uploadFiles == fileList);
      console.log("change", JSON.stringify(file), JSON.stringify(fileList));
    },
    /**
     * 移除前
     */
    onBeforeRemove(file, fileList) {
      console.log("flag", this.$refs.upload.uploadFiles == fileList);
      console.log("before-remove", file);
      if (file.status === "ready") return true;
      return this.$confirm(`确定移除文件 ${file.name}？`);
    },
    /**
     * 已移除
     */
    onRemove(file, fileList) {
      console.log("flag", this.$refs.upload.uploadFiles == fileList);
      console.log("remove", file);
      this.fileList = fileList;
    },
    // 图片预览 附件下载
    onPreview(file) {
      console.log("preview", file);
      if (this.listType === "text") {
        window.saveAs(file.url, file.name);
      } else {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      }
    },
    onClear() {
      console.log("asdfasldf");
      this.$refs.upload.clearFiles();

      console.log(this.$refs.upload.uploadFiles);
    }
  }
};
</script>

<style lang="scss" scoped>
.upload.ishide /deep/ .el-upload {
  display: none;
}
.upload /deep/ .el-upload {
  position: relative;
}
.upload.fill /deep/ .el-upload--picture-card {
  width: 100%;
  height: 148px;
}
.upload .progress {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 1;
  transform: translate(-50%, -50%);
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
</style>
