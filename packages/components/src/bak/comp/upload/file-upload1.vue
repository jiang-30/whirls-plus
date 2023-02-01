<template>
  <div class="k-file-upload">
    <el-upload
      ref="upload"
      :action="action"
      :headers="{ Authorization: 'Bearer ' + $store.getters.access_token }"
      :file-list="fileList"
      :show-file-list="true"
      list-type="text"
      :limit="limit"
      :accept="accept"
      :multiple="multiple"
      :on-exceed="onExceed"
      :before-upload="onBeforeUpload"
      :on-success="onSuccess"
      :on-error="onError"
      :on-change="onChange"
      :before-remove="onBeforeRemove"
      :on-remove="onRemove"
      :on-preview="onPreview"
    >
      <template>
        <el-button
          size="small"
          type="primary"
          :class="{
            'emit-btn': true,
            disabled: this.fileList.length >= this.limit
          }"
          @click.native="onEmit"
        >
          点击上传
        </el-button>
      </template>

      <!-- 提示信息 -->
      <template v-if="tip" slot="tip">
        <span class="k-image-upload-tip">
          <span>{{ tip }}</span>
        </span>
      </template>
    </el-upload>
  </div>
</template>
<script>
export default {
  props: {
    valueType: {},
    value: {},
    multiple: {
      type: Boolean,
      default: false
    },
    limit: {
      type: Number,
      default: 3
    },
    accept: {},
    maxSize: {
      type: Number,
      default: 10
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
      fileList: []
    };
  },
  computed: {
    disabled() {
      return this.fileList.length >= this.limit;
    }
  },
  watch: {
    value: {
      handler(val) {
        if (val) {
          this.fileList = val.split(",").map((item, index) => {
            return {
              uid: Date.now() + index,
              name: this.getName(item),
              url: this.prefix + item,
              percentage: 100,
              status: "success",
              src: item,
              _type: "default"
            };
          });
        }
      },
      deep: true,
      immediate: true
    },
    fileList: {
      handler(val) {
        // console.log("watch-fileList", val, this.value);
        const currentVal = val.map(item => item.src).join(",");
        this.$emit("input", currentVal);
        this.$emit("change", val);
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    getName(src) {
      const arr = src.split("/");
      return arr[arr.length - 1];
    },
    onEmit(e) {
      console.log(e);
      if (this.fileList.length >= this.limit) {
        e.stopPropagation();
      }
    },
    /**
     * 超过限制
     */
    onExceed(files, fileList) {
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

      const isLtSize = file.size / 1024 / 1024 < this.maxSize;
      if (!isLtSize) {
        file._overFlow = true;
        this.$message.error(`上传文件大小不能超过 ${this.maxSize}MB!`);
        return false;
      }
      return true;
    },
    /**
     * 上传成功
     */
    onSuccess(response, file, fileList) {
      console.log("success", response, file, fileList);

      file._type = "upload";
      file.url = this.prefix + response.data.url;
      file.src = response.data.url;
      file.name = this.getName(response.data.url);
      this.fileList = fileList.slice(-this.limit);
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
    onPreview(file) {
      console.log("preview", file);
      window.saveAs(file.url, file.name);
    }
  }
};
</script>

<style scoped>
.k-file-upload {
  .emit-btn.disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  .k-image-upload-tip {
    margin-left: 5px;
    color: #898989;
    font-size: 12px;
  }
}
</style>
