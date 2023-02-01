<template>
  <a v-if="isExternalLink" v-bind="$attrs" :href="to" target="_blank">
    <slot />
  </a>
</template>

<script lang="ts">

export default {
  name: 'AppLink',
  inheritAttrs: false,

  props: {
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
