<template>
  <a v-if="isExternalLink" v-bind="$attrs" :href="to" target="_blank">
    <slot />
  </a>
  <router-link v-else v-bind="$props" custom v-slot="{ isActive, href, navigate }">
    <a v-bind="$attrs" :href="href" @click="navigate" :class="isActive ? activeClass : inactiveClass">
      <slot />
    </a>
  </router-link>
</template>

<script lang="ts">
import { RouterLink, useLink } from 'vue-router'

export default {
  name: 'AppLink',
  inheritAttrs: false,

  props: {
    // 如果使用 TypeScript，请添加 @ts-ignore
    // @ts-ignore
    ...RouterLink.props,
    inactiveClass: String,
  },

  computed: {
    // @ts-ignore
    isExternalLink() {
      // @ts-ignore
      return typeof this.to === 'string' && this.to.startsWith('http')
    },
  },

  // setup(props) {
  //   // `props` 包含 `to` 和任何其他可以传递给 <router-link> 的 prop
  //   const { navigate, href, route, isActive, isExactActive } = useLink(props)

  //   // profit!

  //   return { isExternalLink }
  // },
}
</script>
