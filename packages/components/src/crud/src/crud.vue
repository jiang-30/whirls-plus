<template>
  <div class="b-crud">
    <!-- 搜索 -->
    <el-collapse-transition>
      <BSearch
        v-show="searchVisible"
        :option="props.option"
        :model="searchModel"
        :loading="loading"
        @search="onSearch"
      ></BSearch>
    </el-collapse-transition>

    <!-- 表格操作区域 create import export -->
    <div class="flex mb-3">
      <el-space>
        <el-button v-if="option.createBtn" type="primary" @click="openCreate">
          <el-icon>
            <icon-ic-round-add />
          </el-icon>
          <span>新增</span>
        </el-button>
        <!-- <el-button type="primary" @click="onCreateAction">
          <el-icon><icon-ic-outline-print /></el-icon>
          <span>打印</span>
        </el-button>
        <el-button type="primary" @click="onCreateAction">
          <el-icon><icon-ic-sharp-upload /></el-icon>
          <span>导入</span>
        </el-button>
        <el-button type="primary" @click="onCreateAction">
          <el-icon><icon-ic-sharp-file-download /></el-icon>
          <span>导出</span>
        </el-button>
        <el-button type="primary" @click="onCreateAction">
          <el-icon><icon-ic-outline-file-download /></el-icon>
          <span>模板下载</span>
        </el-button> -->
      </el-space>
      <el-space class="ml-auto">
        <!-- <el-button circle @click="searchVisible = !searchVisible">
          <el-icon><icon-ic-round-search /></el-icon>
        </el-button> -->
        <el-button circle @click="onRefreshHandler">
          <el-icon><icon-ic-round-refresh /></el-icon>
        </el-button>
        <!-- <el-button circle @click="onRefreshAction">
          <el-icon><icon-ic-sharp-menu /></el-icon>
        </el-button> -->
      </el-space>
    </div>

    <!--
    - 表格 tag\image\Avatar\Link
    - type列：selection / index / expand  - loading
    - 总结下来，就是当数据条数会发生改变的时候，都会重置pageIndex为1。当用户操作不会影响数据总条数的时候，pageSize还维持当前不变。
    -->
    <el-table v-loading="loading" :data="__tableData" v-bind="tableAttrs">
      <!-- selection / index / expand  -->
      <!-- <el-table-column type="expand" /> -->
      <!-- <el-table-column type="selection" />
        <el-table-column type="index" label="序号" width="60" align="center" /> -->
      <el-table-column
        v-if="option.index"
        type="index"
        label="序号"
        width="60"
        align="center"
      />

      <!-- 动态列 slot 插槽、格式化值 -->
      <el-table-column
        v-for="(item, index) in tableColumnsFields"
        :label="item.label"
        :prop="item.prop"
        v-bind="item.__tableColumnAttrs"
      >
        <template v-if="item.tableHeaderSlot" #header="{ column, $index }">
          <slot
            :name="item.prop + 'TableHeader'"
            :column="column"
            :$index="$index"
          ></slot>
        </template>
        <template #default="{ row, column, $index }">
          <template v-if="item.tableSlot">
            <slot
              :name="item.prop + 'Table'"
              :row="row"
              :column="column"
              :$index="$index"
            ></slot>
          </template>
          <template v-else>
            {{ handlerFormatterValue(row, item) }}
          </template>
        </template>
      </el-table-column>

      <el-table-column
        v-if="option.rowMenu"
        label="操作"
        :width="option.rowMenuWidth"
        :align="option.rowMenuAlign"
      >
        <template #default="{ row, $index }">
          <div class="b-crud-table-menu">
            <el-button
              v-if="handlerGetResult(option.infoBtn, row)"
              type="primary"
              link
              @click="openInfo(row)"
            >
              <el-icon><View /></el-icon>
              <span>查看</span>
            </el-button>
            <el-button
              v-if="handlerGetResult(option.updateBtn, row)"
              :disabled="
                handlerGetRowMenuDisabled(option.updateBtnDisabled, row)
              "
              type="primary"
              link
              @click="openUpdate(row)"
            >
              <el-icon><Edit /></el-icon>
              <span>编辑</span>
            </el-button>
            <el-button
              v-if="handlerGetResult(option.deleteBtn, row)"
              :disabled="
                handlerGetRowMenuDisabled(option.deleteBtnDisabled, row)
              "
              type="primary"
              link
              @click="openDelete(row)"
            >
              <el-icon><Delete /></el-icon>
              <span>删除</span>
            </el-button>
            <slot name="row-menu" :row="row" :$index="$index"></slot>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <template v-if="props.pageModel">
      <BPagination
        :page-model="props.pageModel"
        @change="handlerFetch"
      ></BPagination>
    </template>
  </div>

  <!-- 弹窗（新增、更新、详情） -->
  <el-dialog
    v-model="dialogVisible"
    custom-class="b-crud-dialog"
    v-bind="dialogAttrs"
    destroyOnClose
    :beforeClose="handlerDialogBeforeClose"
  >
    <!-- 表单(新增、更新） -->
    <BForm
      v-if="dialogType == 'create' || dialogType == 'update'"
      :option="props.option"
      :model="props.model"
      :type="dialogType"
      @confirm="onFormConfirm"
      @cancel="dialogVisible = false"
    >
      <template v-for="item in formSlots" #[item]="scoped">
        <slot :name="item" v-bind="scoped"></slot>
      </template>
    </BForm>

    <!-- 详情 -->
    <BInfo
      v-if="dialogType == 'info'"
      :option="props.option"
      :model="props.model"
    ></BInfo>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, watch, computed, nextTick } from "vue";
import { View, Edit, Delete } from "@element-plus/icons-vue";
import {
  useTableAttrsFormatter,
  useTableFieldsFormatter,
  useTableRowMenuAttrsFormatter,
} from "../../formatter/table";
import { useDialogAttrsFormatter } from "../../formatter/dialog";
import { useFormSlotsFormatter } from "../../formatter/form";

/**
 * props
 */
const props = withDefaults(
  defineProps<{
    option: any;
    pageModel?: any;
    searchModel?: any;
    model: Record<string, any>;
    loading: boolean;
    tableData: Record<string, any>[];
  }>(),
  {
    searchModel: ref({}),
  }
);

/**
 * emit
 */
const emit = defineEmits<{
  (e: "fetch"): void;
  (e: "row-info", data: any): void;
  (e: "row-create", data: any, loading: () => void, close: () => void): void;
  (e: "row-update", data: any, loading: () => void, close: () => void): void;
  (e: "row-delete", data: any): void;
}>();

/**
 * expose
 */
defineExpose({
  openCreate,
  openInfo,
  openUpdate,
  openDelete,
});

watch(
  props.option,
  (val) => {
    console.warn("watch option!!!!!", val);
  },
  { immediate: true, deep: true }
);

const __tableData = computed(() => {
  // console.log('tableData', props.tableData)
  return props.tableData;
});

/**
 * dialog 弹窗属性
 */
const dialogVisible = ref(false);
const dialogType = ref("");
const dialogAttrs = computed(() => {
  return useDialogAttrsFormatter(dialogType.value, props.option);
});

/**
 * 表格属性
 */
const tableAttrs = computed(() => {
  return useTableAttrsFormatter(props.option);
});

/**
 * 表格列
 */
const tableFields = computed(() => {
  const defaultConfig = {
    // headerAlign: 'center',
  };
  return useTableFieldsFormatter(props.option.fields, defaultConfig);
});

/**
 * 操作按钮
 */
const tableAction = computed(() => {
  return useTableFieldsFormatter(props.option.fields);
});

/**
 * 行操作按钮
 */
const tableRowMenuAttrs = computed(() => {
  return useTableRowMenuAttrsFormatter(props.option);
});

/**
 * selection 列
 */
const tableColumnSelection = {};

/**
 * index 列
 */
const tableColumnIndex = {};

/**
 * expand 列
 */
const tableColumnExpand = {};

/**
 * 显示的表格列
 * tableFields 和 showFieldKeys
 */
const tableColumnsFields = computed(() => {
  return tableFields.value.filter((item) => item.isShow !== false);
});

/**
 * 表单中的slot插槽
 */
const formSlots = computed(() => {
  return useFormSlotsFormatter("", props.option);
});

/**
 * 基础数据
 */
const searchVisible = ref(true);

/**
 * 搜索加载数据
 */
function onSearch() {
  if (props.pageModel) {
    props.pageModel.current = 1;
  }
  handlerFetch();
}

/**
 * 刷新
 */
function onRefreshHandler() {
  // emit('refresh')
  handlerFetch();
}

/**
 * 数据 - 请求列表数据
 */
function handlerFetch() {
  emit("fetch");
}

/**
 * 新增
 */
function openCreate() {
  dialogType.value = "create";
  handlerClearModel();
  handlerOpenDialog();
  // emit('before-create')
}

/**
 * 查看 行
 */
function openInfo(row: Record<string, any>) {
  dialogType.value = "info";
  handlerClearModel();
  for (let key in row) {
    props.model[key] = row[key];
  }
  handlerOpenDialog();
  // emit('before-info')
}

/**
 * 更新 行
 */
function openUpdate(row: Record<string, any>) {
  dialogType.value = "update";
  handlerClearModel();
  for (let key in row) {
    props.model[key] = row[key];
  }
  // emit('before-update')
  handlerOpenDialog();
}

/**
 * 删除 行
 */
function openDelete(row: any) {
  handlerClearModel();
  for (let key in row) {
    props.model[key] = row[key];
  }
  ElMessageBox.confirm("确定要执行删除操作吗", "提示", { type: "warning" })
    .then(() => {
      emit("row-delete", props.model);
    })
    .catch(() => {});
}

// 清除 model 数据
function handlerClearModel() {
  for (let key in props.model) {
    delete props.model[key];
  }
}

/**
 * 打开弹窗
 */
function handlerOpenDialog() {
  nextTick(() => {
    dialogVisible.value = true;
  });
}

/**
 * 弹窗关闭前
 */
function handlerDialogBeforeClose(done: () => void) {
  for (let key in props.model) {
    delete props.model[key];
  }
  done();
}

/**
 * 表单确认
 * 1. 有处理函数使用处理函数，
 * 2. 配置api调用api（也可以提供一个钩子）
 */
function onFormConfirm(model: any, loading: () => void) {
  console.log(dialogType, model);

  function close() {
    loading();
    dialogVisible.value = false;
  }

  if (dialogType.value == "create") {
    emit("row-create", model, loading, close);
  } else if (dialogType.value == "update") {
    emit("row-update", model, loading, close);
  }
}

function handlerFormatterValue(row: any, field: any) {
  // console.log(row, field)
  if (field.formatter) {
    return field.formatter(row);
  }
  if (field.__dictData) {
    const value = row[field.prop];
    const dictItem = field.__dictData.find((item: any) => item.value == value);
    return dictItem?.label;
  }
  return row[field.prop];
}

function handlerGetResult(btnVisible: any, row: any) {
  if (typeof btnVisible == "boolean") {
    return btnVisible;
  } else if (typeof btnVisible === "function") {
    return btnVisible(row);
  } else {
    return true;
  }
}

function handlerGetRowMenuDisabled(btnDisabled: any, row: any) {
  if (typeof btnDisabled == "boolean") {
    return btnDisabled;
  } else if (typeof btnDisabled === "function") {
    return btnDisabled(row);
  } else {
    return false;
  }
}
</script>

<style>
.b-crud {
}

.b-crud .el-table th {
  color: rgba(0, 0, 0, 0.85);
  background-color: #f9f9f9;
}

.b-crud-table-menu {
  display: flex;
  flex-wrap: wrap;
  justify-content: v-bind(option.rowMenuAlign);
  gap: 10px;
}

.b-crud-table-menu .el-button + .el-button {
  margin-left: 0;
}

.b-crud-dialog .el-select {
  width: 100%;
}
</style>
