<template>
  <div class="page">
    <el-collapse-transition>
      <el-form v-show="showSearchForm" inline>
        <el-form-item label="菜单名称">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="菜单名称">
          <el-input></el-input>
        </el-form-item>
        <el-form-item>
          <el-button>查询</el-button>
          <el-button>重置</el-button>
        </el-form-item>
      </el-form>
    </el-collapse-transition>

    <div class="tw-flex tw-mb-3">
      <el-button>新增</el-button>
      <el-button>删除</el-button>
      <el-button>打印</el-button>
      <el-button>导出</el-button>
      <el-button>导入</el-button>
      <span class="tw-ml-auto"></span>
      <el-button @click="showSearchForm = !showSearchForm">搜索</el-button>
      <el-button>刷新</el-button>
      <el-button @click="tableFilterVisible = true">显隐</el-button>
    </div>

    <el-table
      :data="tableData"
      :border="true"
      style="width: 100%"
      row-key="id"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column prop="date" label="Date" width="180" />
      <el-table-column prop="name" label="Name" width="180" />
      <el-table-column prop="address" label="Address" />
      <el-table-column label="操作" width="200" align="center">
        <template #default>
          <el-button size="small" type="default" @click="infoVisible = true"
            >查看</el-button
          >
          <el-button size="small" type="primary" @click="dialogVisible = true"
            >编辑</el-button
          >
          <el-button size="small" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="tw-mt-3"
      :total="1000"
      background
      layout=" ->, total, sizes, prev, pager, next, "
      :page-sizes="[10, 20, 30, 40]"
    >
    </el-pagination>

    <el-icon color="#f40"><icon-bi-x /></el-icon>
  </div>

  <!-- 动态表格列 -->
  <el-dialog v-model="tableFilterVisible" title="Tips">
    <el-form>
      <el-form-item>
        <el-checkbox-group>
          <el-checkbox label="city">city</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-form>

    <template #footer>
      <el-button type="primary" @click="dialogVisible = false">
        Confirm
      </el-button>
      <el-button @click="dialogVisible = false">Cancel</el-button>
    </template>
  </el-dialog>

  <!-- 表单 -->
  <el-dialog v-model="dialogVisible" title="Tips">
    <el-form>
      <el-form-item label="label">
        <el-input></el-input>
      </el-form-item>
    </el-form>

    <template #footer>
      <el-button @click="dialogVisible = false">Cancel</el-button>
      <el-button type="primary" @click="dialogVisible = false">
        Confirm
      </el-button>
    </template>
  </el-dialog>

  <!-- 详情 -->
  <el-dialog v-model="infoVisible" title="Tips">
    <el-descriptions title="User Info">
      <el-descriptions-item label="Username">kooriookami</el-descriptions-item>
      <el-descriptions-item label="Telephone">18100000000</el-descriptions-item>
      <el-descriptions-item label="Place">Suzhou</el-descriptions-item>
      <el-descriptions-item label="Remarks">
        <el-tag size="small">School</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="Address"
        >No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu
        Province</el-descriptions-item
      >
    </el-descriptions>

    <template #footer>
      <el-button @click="dialogVisible = false">Cancel</el-button>
      <el-button type="primary" @click="dialogVisible = false">
        Confirm
      </el-button>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
// import type { ElTable } from 'element-plus'
interface IMenu {
  title: string;
}
// const multipleTableRef = ref<InstanceType<typeof ElTable>>()
// const multipleSelection = ref<IMenu[]>([])

const tableData = reactive<IMenu[]>([
  {
    title: "菜单管理",
  },
]);
const dialogVisible = ref(false);
const infoVisible = ref(false);
const tableFilterVisible = ref(false);
const showSearchForm = ref(false);

function handleSelectionChange(selection: IMenu[]) {
  console.log(selection[0].title);
}
// const toggleSelection = (rows?: IMenu[]) => {
//   if (rows) {
//     rows.forEach(row => {
//       // TODO: improvement typing when refactor table
//       // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//       // @ts-expect-error
//       multipleTableRef.value!.toggleRowSelection(row, undefined)
//     })
//   } else {
//     multipleTableRef.value!.clearSelection()
//   }
// }
</script>
<style scoped>
.page {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
}
</style>
