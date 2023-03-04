<template>
  <el-dropdown
    class="admin-header-user"
    placement="bottom-end"
    :tabindex="9999"
    trigger="hover"
    @command="onCommand"
  >
    <div class="admin-header-user-wrapper">
      <el-avatar :icon="UserFilled" :src="userinfo.avatar" :size="30">
        {{ userinfo.username?.slice(0, 1).toUpperCase() }}
      </el-avatar>
      <span class="admin-header-user__name">{{ userinfo.username }}</span>
      <el-icon :color="textColor">
        <ArrowDown />
      </el-icon>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="item in actionList.filter((row) => row.visible)"
          :key="item.key"
          :command="item.key"
          :icon="item.icon"
          :divided="item.divided"
        >
          {{ item.title }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<script lang="ts" setup>
import {
  UserFilled,
  Setting,
  SwitchButton,
  ArrowDown,
} from "@element-plus/icons-vue";
import { useUserStore, useSettingStore } from "@/stores";
import { ElMessageBox } from "element-plus";

defineProps<{
  textColor: string;
}>();
const router = useRouter();
const appSettingRef = ref();
const useSetting = useSettingStore();
const userinfo = useUserStore().userInfo;

const actionList = [
  {
    title: "个人中心",
    key: "userCenter",
    routeName: "UserCenter",
    icon: UserFilled,
    divided: false,
    visible: useSetting.userCenterBtn,
  },
  {
    title: "账户设置",
    key: "userSetting",
    routeName: "UserSetting",
    icon: Setting,
    divided: false,
    visible: useSetting.userSettingBtn,
  },
  {
    title: "退出登录",
    key: "logout",
    icon: SwitchButton,
    divided: true,
    visible: true,
  },
];

function onCommand(command: string) {
  const item = actionList.find((item) => item.key === command);
  switch (command) {
    case "style":
      if (appSettingRef.value) {
        appSettingRef.value.open();
      }
      break;
    case "logout":
      ElMessageBox.confirm("确定要退出系统吗", "提示", { type: "warning" })
        .then(async () => {
          useUserStore().logoutHandler();
        })
        .catch(() => {});
      break;
    default:
      if (item && item.routeName) {
        router.push({
          name: item.routeName,
        });
      }
  }
}
</script>
<style scoped>
.admin-header-user {
  padding: 5px 8px;
}

.admin-header-user-wrapper {
  display: flex;
  align-items: center;
  cursor: pointer;
  height: 100%;
  color: v-bind(textColor);
}

.admin-header-user__name {
  font-size: 16px;
  line-height: 1;
  color: v-bind(textColor);
  margin-left: 10px;
  margin-right: 5px;
}
</style>
