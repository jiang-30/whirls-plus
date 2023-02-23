<route lang="yaml">
meta:
  isEnabled: true
  isStatic: true,
  title: 账户设置
  icon: ic:round-settings-suggest
  name: UserSetting
  layout: admin
</route>

<template>
  <PageContainer>
    <el-container>
      <el-aside width="260px">
        <el-menu :default-active="activeKey" @select="onSelect">
          <el-menu-item index="userInfo">基本设置</el-menu-item>
          <el-menu-item index="security">安全设置</el-menu-item>
        </el-menu>
      </el-aside>
      <el-main class="border-l border-solid border-light">
        <section class="pl-10">
          <UserInfoView v-if="activeKey == 'userInfo'"></UserInfoView>
          <PasswordView v-if="activeKey == 'security'"></PasswordView>
        </section>
      </el-main>
    </el-container>
  </PageContainer>
</template>

<script lang="ts" setup>
import UserInfoView from "./components/UserInfoTab.vue";
import PasswordView from "./components/PasswordTab.vue";

const activeKey = ref("userInfo");

const onSelect = (index: string) => {
  activeKey.value = index;
};
</script>

<style scoped>
.el-menu-item.is-active {
  margin-right: -1px;
  color: var(--el-color-primary);
  border-right: 3px solid var(--el-color-primary);
}
</style>
