<template>
  <section class="w-crud">
    <!-- 搜索区域 -->
    <el-collapse-transition>
      <WSearchForm
        v-show="searchVisible"
        :option="option!"
        :search-model="searchModel"
        :loading="tableLoading ?? _tableLoading"
        @show="searchShow = $event"
        @init="_onSearchInit"
        @search="_onSearch"
        @reset="_onSearchReset"
      ></WSearchForm>
    </el-collapse-transition>

    <section v-loading="tableLoading ?? _tableLoading">
      <!-- 操作区域 -->
      <section class="w-crud-action">
        <el-button type="primary" :icon="CirclePlus" @click="_onOpenCreate">
          新增
        </el-button>
        <slot name="action"></slot>

        <span class="w-crud-action-split"></span>

        <!-- 刷新 -->
        <el-button circle :icon="Refresh" @click="_onRefresh" />
        <!-- 过滤数据项 -->
        <ColumnFilter v-model="checkedFields" :fields="__tableFields" />
        <!-- 根据搜索区域确定显示隐藏 -->
        <el-button
          v-if="searchShow"
          circle
          :icon="Search"
          @click="searchVisible = !searchVisible"
        />
      </section>

      <!-- 表格区域 -->
      <el-table :data="_currentTableData" v-bind="__tableAttrs">
        <!-- expandColumn 展开 -->
        <el-table-column v-if="option.expandColumn === true" type="expand">
          <template #default="scopeProps">
            <slot name="expand" v-bind="scopeProps"></slot>
          </template>
        </el-table-column>

        <!-- selectionColumn 选择 -->
        <el-table-column
          v-if="option.selectionColumn === true"
          type="selection"
        />

        <!-- indexColumn 序号 -->
        <el-table-column
          v-if="option.indexColumn !== false"
          type="index"
          label="序号"
          width="60"
          align="center"
        />

        <!-- 动态列 -->
        <el-table-column
          v-for="column in tableFilterFields"
          :key="column.prop"
          :prop="column.prop"
          :label="column.label"
          v-bind="column.__elTableColumnAttrs"
        >
          <template #default="scopeProps">
            <template v-if="column._tableSlot">
              <slot :name="column.prop" v-bind="scopeProps"></slot>
            </template>
            <template v-else>
              {{
                _formatValue(
                  column,
                  scopeProps.row,
                  scopeProps.column,
                  scopeProps.$index
                )
              }}
            </template>
          </template>
        </el-table-column>

        <el-table-column v-bind="__tableColumnActionAttrs">
          <template #default="{ row }">
            <div class="w-crud-column-action">
              <el-button
                v-if="option.isInfoBtn"
                text
                type="info"
                size="small"
                :icon="View"
                @click="_onOpenInfo(row)"
              >
                详情
              </el-button>
              <el-button
                text
                type="primary"
                size="small"
                :icon="Edit"
                @click="_onOpenUpdate(row)"
              >
                修改
              </el-button>
              <el-button
                text
                type="danger"
                size="small"
                :icon="Delete"
                @click="_onDelete(row)"
              >
                删除
              </el-button>
              <slot name="row-action" :row="row" />
            </div>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <section class="w-crud-pagination">
        <el-pagination
          v-if="pageModel"
          v-model:current-page="pageModel.current"
          v-model:page-size="pageModel.size"
          :total="pageModel.total"
          v-bind="__pageAttrs"
          @current-change="_onPageCurrentChange"
          @size-change="_onPageSizeChange"
        >
        </el-pagination>
      </section>
    </section>

    <!-- 新增 弹窗区域 -->
    <el-dialog
      v-model="dialogVisible"
      v-bind="__dialogAttrs"
      :title="typeMap[currentType]"
      destroy-on-close
    >
      <WForm
        v-if="currentType === 'create'"
        :option="option"
        :form-model="_currentModelValue"
        @confirm="_onCreateConfirm"
        @success="onCloseHandler"
      ></WForm>

      <WForm
        v-else-if="currentType === 'update'"
        :option="option"
        :form-model="_currentModelValue"
        @confirm="_onUpdateConfirm"
        @success="onCloseHandler"
      ></WForm>

      <WInfo
        v-else-if="currentType === 'info'"
        :option="option"
        :info-model="_currentModelValue"
      ></WInfo>
    </el-dialog>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, useSlots } from "vue";
import {
  View,
  CirclePlus,
  Search,
  Refresh,
  Edit,
  Delete,
} from "@element-plus/icons-vue";
import ColumnFilter from "./column-filter.vue";
import { WSearchForm, WForm, WInfo } from "../../index";
import { crudProps, crudEmits } from "./crud";
import { useCrudOption } from "./utils";
import { ElMessageBox, ElNotification, type Action } from "element-plus";
import { tools, formatValue } from "../../utils";

// console.log("slots: ", useSlots());

defineOptions({ name: "WCrud" });
const props = defineProps(crudProps);
const emits = defineEmits(crudEmits);

// 根据搜索栏控制搜索显示按钮的显示
const searchShow = ref(true);
// 搜索栏显示隐藏
const searchVisible = ref(true);
// 弹窗的显示隐藏
const dialogVisible = ref(false);
// 当前状态
const typeMap: Record<string, string> = {
  info: "详情",
  create: "新增",
  update: "修改",
};
const currentType = ref("normal");
// 选中要显示的列
const checkedFields = ref<string[]>([]);
// 当前数据
const _tableLoading = ref(false);

// 格式化配置数据
const {
  __tableFields,
  __tableColumnActionAttrs,
  __tableAttrs,
  __pageAttrs,
  __dialogAttrs,
} = useCrudOption(props.option);

// 初始值
__tableFields.value.forEach((item) => {
  if (item.isShow) {
    checkedFields.value.push(item.prop);
  }
});

// 当前显示的表格项
const tableFilterFields = computed(() => {
  return __tableFields.value.filter((item) => {
    return checkedFields.value.includes(item.prop);
  });
});

// v-model 数据
const _formModel = ref({});
const _currentModelValue = computed({
  get: () => {
    return props.modelValue ?? _formModel.value;
  },
  set: (val) => {
    emits("update:modelValue", val);
    _formModel.value = val;
    console.log(`set ${currentType.value} modelValue`);
  },
});

const _tableData = ref<any>([]);
const _currentTableData = computed({
  get: () => {
    return props.tableData ?? _tableData.value;
  },
  set: (val) => {
    emits("update:tableData", val);
    _tableData.value = val;
  },
});

// 表格结果数据格式化
const _formatValue = (field: any, row: any, column: any, index: any) => {
  return formatValue(field, row, column, index);
};

// 关闭弹窗
const onCloseHandler = () => {
  // 1. 设置状态
  currentType.value = "normal";
  // 2. 设置值 双向绑定
  _currentModelValue.value = {};
  // 3. 关闭弹窗
  dialogVisible.value = false;
};

// 打开弹窗 - 操作数据的钩子
const openHandler = () => {
  const openDone = () => {
    dialogVisible.value = true;
  };

  if (props.beforeOpen) {
    props.beforeOpen(_currentModelValue.value, openDone, currentType.value);
  } else {
    openDone();
  }
};

// ========== 搜索 ==========
const searchHandler = () => {
  if (props.onQuery) {
    props.onQuery();
  } else if (props.api?.list && tools.axios) {
    _tableLoading.value = true;
    tools
      .axios({
        method: "get",
        url: props.api.list,
        params: {
          ...props.searchModel,
        },
      })
      .then(({ data }) => {
        _currentTableData.value = data;
      })
      .finally(() => {
        _tableLoading.value = false;
      });
  } else if (props.api?.page && tools.axios) {
    _tableLoading.value = true;
    tools
      .axios({
        method: "get",
        url: props.api.page,
        params: {
          current: props.pageModel.current,
          size: props.pageModel.size,
          ...props.searchModel,
        },
      })
      .then(({ data }) => {
        _currentTableData.value = data.records;
        props.pageModel.total = data.total;
      })
      .finally(() => {
        _tableLoading.value = false;
      });
  }
};

const _onRefresh = () => {
  console.log("table refresh");
  emits("refresh");
  searchHandler();
};

const _onSearchInit = () => {
  console.log("search init");
  emits("init");
  searchHandler();
};

const _onSearch = () => {
  console.log("search");
  props.pageModel.current = 1;
  emits("search");
  searchHandler();
};

const _onSearchReset = () => {
  console.log("search reset");
  props.pageModel.current = 1;
  emits("searchReset");
  searchHandler();
};

const _onPageCurrentChange = (current: number) => {
  console.log("page current change");
  emits("pageCurrentChange");
  searchHandler();
};

const _onPageSizeChange = (size: number) => {
  console.log("page size change");
  emits("pageSizeChange");
  searchHandler();
};

const _onOpenCreate = () => {
  // 1. 设置状态
  currentType.value = "create";
  // 3. 设置当前 model 值 双向绑定
  _currentModelValue.value = {};
  // 4. 打开弹窗
  openHandler();
};

const _onOpenUpdate = (row: any) => {
  // 1. 设置状态
  currentType.value = "update";
  // 2. 设置值 双向绑定
  _currentModelValue.value = { ...row };
  // 3. 打开弹窗
  openHandler();
};

const _onOpenInfo = (row: any) => {
  // 1. 设置状态
  currentType.value = "info";
  // 2. 设置值 双向绑定
  _currentModelValue.value = { ...row };
  // 3. 请求数据，打开弹窗
  if (props.api?.info && tools.axios) {
    tools
      .axios({
        method: "get",
        url: props.api.info,
      })
      .then(({ data }) => {
        _currentModelValue.value = data;
        openHandler();
      });
  } else {
    openHandler();
  }
};

const _onDelete = (row: any) => {
  // 1. 设置状态
  currentType.value = "delete";
  // 2. 设置值 双向绑定 数据拷贝
  _currentModelValue.value = { ...row };
  // 3. 删除操作
  if (props.onDelete) {
    props.onDelete(_currentModelValue.value);
  } else if (props.api?.delete && tools.axios) {
    ElMessageBox.confirm("确定执行删除操作吗", {
      title: "提示",
      type: "warning",
      callback: (action: Action) => {
        if (action === "confirm" && props.api?.delete && tools.axios) {
          tools
            .axios({
              method: "delete",
              url: props.api.delete + _currentModelValue.value.id,
            })
            .then(() => {
              ElNotification({
                title: "提示",
                message: "删除成功！",
                type: "success",
              });
              _onSearch();
            });
        }
      },
    });
  }
};

const _onCreateConfirm = (record: any, done: any) => {
  if (props.beforeSave) {
    record = props.beforeSave(record, currentType.value);
  }

  if (props.onCreate) {
    props.onCreate(record, done);
  } else if (props.api?.create && tools.axios) {
    tools
      .axios({
        method: "post",
        url: props.api.create,
        data: record,
      })
      .then(() => {
        ElNotification({
          title: "提示",
          message: "新增成功！",
          type: "success",
        });
        _onSearch();
        done(true);
      })
      .catch(() => {
        done();
      });
  }
};

const _onUpdateConfirm = (record: any, done: any) => {
  if (props.onUpdate) {
    props.onUpdate(record, done);
  } else if (props.api?.update && tools.axios) {
    tools
      .axios({
        method: "put",
        url: props.api.update,
        data: record,
      })
      .then((res: any) => {
        ElNotification({
          title: "提示",
          message: "修改成功！",
          type: "success",
        });
        _onRefresh();
        done(true);
      })
      .catch(() => {
        done();
      });
  }
};
</script>

<style scoped>
.w-crud-action {
  display: flex;
  margin-bottom: 15px;
}
.w-crud-action-split {
  margin-left: auto;
}
.w-crud-pagination {
  margin-top: 15px;
}
.w-crud .el-table :deep(th) {
  /* background-color: #eee; */
  font-weight: 700;
  color: var(--el-text-color-regular);
  background: var(--el-border-color-lighter);
}
.w-crud .w-crud-column-action {
  display: flex;
  justify-content: center;
}
.w-crud .w-crud-column-action :deep(.el-button) {
  margin-left: 0;
}
</style>
