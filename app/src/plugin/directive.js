function hasPermission(permission) {
  const settingsStore = useSettingsStore();
  const userStore = useUserStore();
  if (settingsStore.app.enablePermission) {
    return userStore.permissions.some((v) => {
      return v === permission;
    });
  } else {
    return true;
  }
}

function auth(value) {
  let auth;
  if (typeof value === "string") {
    auth = hasPermission(value);
  } else {
    auth = value.some((item) => {
      return hasPermission(item);
    });
  }
  return auth;
}

function authAll(value) {
  const auth = value.every((item) => {
    return hasPermission(item);
  });
  return auth;
}

export default function directive(app) {
  // 注册 v-auth 和 v-auth-all 指令
  app.directive("auth", {
    mounted: (el, binding) => {
      if (!auth(binding.value)) {
        el.remove();
      }
    },
  });
  app.directive("auth-all", {
    mounted: (el, binding) => {
      if (!authAll(binding.value)) {
        el.remove();
      }
    },
  });
}
