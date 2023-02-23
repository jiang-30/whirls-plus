<template>
  <section>
    <!-- 搜索区域 -->
    <el-collapse-transition>
      <WFormSearch
        v-show="searchVisible"
        :option="option!"
        :form-model="searchModel"
        :loading="tableLoading"
        @show="searchShow = $event"
        @search="_onSearch"
        @reset="_onSearchReset"
      ></WFormSearch>
    </el-collapse-transition>

    <section v-loading="tableLoading">
      <!-- 操作区域 -->
      <section class="w-crud-action">
        <el-button type="primary" :icon="CirclePlus" @click="_onCreateOpen">
          新增
        </el-button>
        <span class="w-crud-action-split"></span>
        <el-button circle :icon="Refresh" @click="_onRefresh"></el-button>
        <el-popover
          placement="bottom-end"
          title="表格数据项"
          :width="600"
          trigger="click"
          :hide-after="0"
        >
          <template #default>
            <section>
              <el-checkbox :indeterminate="true"> 全选 </el-checkbox>
              <el-checkbox-group
                v-model="checkedFields"
                @change="onCheckedFieldsChange"
              >
                <el-checkbox
                  v-for="item in _tableFields"
                  :key="item.prop"
                  :label="item.prop"
                >
                  {{ item.label }}
                </el-checkbox>
              </el-checkbox-group>
            </section>
          </template>
          <template #reference>
            <el-button circle :icon="Operation"></el-button>
          </template>
        </el-popover>
        <el-button
          v-if="searchShow"
          circle
          :icon="Search"
          @click="searchVisible = !searchVisible"
        ></el-button>
      </section>

      <!-- 表格区域 -->
      <el-table :data="tableData" v-bind="_tableAttrs">
        <!--       
        selection / index / expand
      -->
        <!-- <el-table-column type="expand" /> -->
        <!-- <el-table-column type="selection" /> -->

        <!-- :index="pageModel!.size * (pageModel!.current -1) + 1" -->
        <el-table-column type="index" label="序号" width="60" align="center" />

        <!-- 动态列 -->
        <el-table-column
          v-for="column in _tableFields"
          :key="column.prop"
          :prop="column.prop"
          :label="column.label"
          v-bind="column.__tableColumnAttrs"
        >
        </el-table-column>

        <el-table-column v-bind="_tableColumnActionAttrs" width="180">
          <template #default="{ row }">
            <!-- <el-button text type="info" size="small" @click="_onInfoOpen(row)">
            详情
          </el-button> -->
            <el-button
              text
              type="primary"
              size="small"
              :icon="Edit"
              @click="_onUpdateOpen(row)"
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
          v-bind="_pageAttrs"
          @current-change="_onPageCurrentChange"
          @size-change="_onPageSizeChange"
        >
        </el-pagination>
      </section>
    </section>

    <!-- 新增 弹窗区域 -->
    <el-dialog
      v-if="type === 'create'"
      v-model="dialogVisible"
      title="新增"
      width="900px"
    >
      <WForm
        :option="option"
        :form-model="_rowModel"
        @confirm="_onCreateSave"
        @success="_onSaveSuccess"
      ></WForm>
    </el-dialog>

    <!-- 修改 弹窗区域 -->
    <el-dialog
      v-if="type === 'update'"
      v-model="dialogVisible"
      title="修改"
      width="900px"
    >
      <WForm
        :option="option"
        :form-model="_rowModel"
        @confirm="_onUpdateSave"
        @success="_onSaveSuccess"
      ></WForm>
    </el-dialog>

    <!-- 详情 弹窗区域 -->
    <el-dialog
      v-if="type === 'info'"
      v-model="dialogVisible"
      title="详情"
      width="900px"
    >
      详情
    </el-dialog>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import {
  CirclePlus,
  Search,
  Refresh,
  Edit,
  Operation,
  Delete,
} from "@element-plus/icons-vue";
import { WFormSearch, WForm } from "../../index";
import { crudProps, crudEmits } from "./crud";
import { useTableOption } from "./utils";
import { tools } from "../../index";

const props = defineProps(crudProps);
const emits = defineEmits(crudEmits);

// console.log(props, tools);
const searchShow = ref(true);
const searchVisible = ref(true);
const loading = ref(false);
const type = ref("create");
const dialogVisible = ref(false);
const _formModel = ref({});
const checkedFields = ref([]);

// 格式化配置数据
const { _tableFields, _tableColumnActionAttrs, _tableAttrs, _pageAttrs } =
  useTableOption(props.option!);

// 数据
const _rowModel = computed({
  get: () => {
    return props.formModel ?? _formModel.value;
  },
  set: (val) => {
    emits("update:formModel", val);
    _formModel.value = val;
    console.log(3333);
  },
});

// 动态显示列表项
const onCheckedFieldsChange = (val: any) => {
  console.log(val);
};

// 打开弹窗
const openHandler = () => {
  dialogVisible.value = true;
};

const _onSaveSuccess = () => {
  // 1. 设置状态
  type.value = "table";

  // 2. 数据拷贝
  const _row = {};

  // 3. 设置值 双向绑定
  _rowModel.value = _row;

  // 4. 关闭弹窗
  dialogVisible.value = false;
};

// ========== 搜索 ==========
const searchHandler = () => {
  emits("query");
};
const _onRefresh = () => {
  searchHandler();
};

const _onSearch = (model: any) => {
  searchHandler();
};

const _onSearchReset = (model: any) => {
  searchHandler();
};

const _onPageCurrentChange = (current: number) => {
  const _page = { current: current, size: props.pageModel?.size };
  // emits("pageSizeChange", _page);
  // emits("pageChange", _page);
  searchHandler();
};

const _onPageSizeChange = (size: number) => {
  const _page = { current: props.pageModel?.current, size: size };
  // emits("pageSizeChange", _page);
  // emits("pageChange", _page);
  searchHandler();
};

// ========== 新增 ==========
const _onCreateOpen = () => {
  // 1. 设置状态
  type.value = "create";

  // 2. 数据拷贝
  const _row = {};

  // 3. 设置值 双向绑定
  _rowModel.value = _row;

  // 4. 打开弹窗
  if (props.onCreateOpen) {
    props.onCreateOpen(_rowModel.value, openHandler);
  } else {
    openHandler();
  }
};

const _onCreateSave = (record: any, done: any) => {
  if (props.onCreateSave) {
    props.onCreateSave(record, done);
  }
};

// ========== 修改 ==========
const _onUpdateOpen = (row: any) => {
  // 1. 设置状态
  type.value = "update";

  // 2. 数据拷贝
  const _row = { ...row };

  // 3. 设置值 双向绑定
  _rowModel.value = _row;

  // 打开弹窗
  if (props.onUpdateOpen) {
    props.onUpdateOpen(_rowModel.value, openHandler);
  } else {
    openHandler();
  }
};

const _onUpdateSave = (record: any, done: any) => {
  if (props.onUpdateSave) {
    props.onUpdateSave(record, done);
  }
};

// ========== 详情 ==========
const _onInfoOpen = (row: any) => {
  // 1. 设置状态
  type.value = "info";

  // 2. 数据拷贝
  const _row = { ...row };

  // 3. 设置值 双向绑定
  _rowModel.value = _row;

  // 打开弹窗
  if (props.onInfoOpen) {
    props.onInfoOpen(_rowModel.value, openHandler);
  } else {
    openHandler();
  }
};

// ========== 删除 ==========
const _onDelete = (row: any) => {
  // 1. 设置状态
  type.value = "delete";

  // 2. 数据拷贝
  const _row = { ...row };

  // 3. 设置值 双向绑定
  _rowModel.value = _row;

  // 删除操作
  if (props.onDeleteSave) {
    props.onDeleteSave(_rowModel.value);
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
</style>
