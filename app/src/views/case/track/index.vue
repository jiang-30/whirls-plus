<route lang="yaml">
meta:
  isEnabled: true
  isStatic: true
  title: 轨迹
  icon: mdi:map-marker-check
  layout: admin
  isTab: true
  isShow: true
  parentName: Case
  sort: 5
</route>

<template>
  <PageContainer>
    <el-button @click="onClick">onClick</el-button>
    <div class="map-template">
      <div class="map-container" id="amap-container"></div>
    </div>
  </PageContainer>
</template>

<script lang="ts" setup>
import AMapLoader from '@amap/amap-jsapi-loader'
import axios from 'axios'

let amap: any = null
let map: any = null

const points = [
  // { x: 116.478928, y: 39.997761, sp: 19, ag: 0, tm: 1478031031 },
  // { x: 116.478907, y: 39.998422, sp: 10, ag: 0, tm: 2 },
  // { x: 116.479384, y: 39.998546, sp: 10, ag: 110, tm: 3 },
  // { x: 116.481053, y: 39.998204, sp: 10, ag: 120, tm: 4 },
  // { x: 116.481793, y: 39.997868, sp: 10, ag: 120, tm: 5 },
  // { x: 116.482898, y: 39.998217, sp: 10, ag: 30, tm: 6 },
  // { x: 116.483789, y: 39.999063, sp: 10, ag: 30, tm: 7 },
  // { x: 116.484674, y: 39.999844, sp: 10, ag: 30, tm: 8 },
  { x: 116.417371, y: 39.928219, sp: 20, ag: 0, tm: 1 },
  { x: 116.417357, y: 39.928465, sp: 20, ag: 0, tm: 2 },
  { x: 116.417447, y: 39.92863, sp: 20, ag: 0, tm: 3 },
  { x: 116.41733, y: 39.928793, sp: 20, ag: 0, tm: 4 },
  { x: 116.417249, y: 39.929153, sp: 20, ag: 0, tm: 5 },
  { x: 116.417326, y: 39.929343, sp: 20, ag: 0, tm: 6 },
  { x: 116.417317, y: 39.929661, sp: 20, ag: 0, tm: 7 },
  { x: 116.417209, y: 39.929855, sp: 20, ag: 0, tm: 8 },
  { x: 116.417321, y: 39.930069, sp: 20, ag: 0, tm: 9 },
  { x: 116.417308, y: 39.930266, sp: 20, ag: 0, tm: 10 },
  { x: 116.418008, y: 39.930508, sp: 20, ag: 0, tm: 11 },
  { x: 116.418669, y: 39.930619, sp: 20, ag: 0, tm: 12 },
  { x: 116.419509, y: 39.930449, sp: 20, ag: 0, tm: 13 },
  { x: 116.42042, y: 39.930605, sp: 20, ag: 0, tm: 14 },
  { x: 116.421099, y: 39.930425, sp: 20, ag: 0, tm: 15 },
  { x: 116.421422, y: 39.930256, sp: 20, ag: 0, tm: 16 },
  { x: 116.42201, y: 39.930508, sp: 20, ag: 0, tm: 17 },
]

let index = 0
let timer: any = null

function onClick() {
  timer = setInterval(() => {
    if (index > 500) {
      clearInterval(timer)
    }
    index++
    query()
  }, 200)
}

function query() {
  axios({
    url: '/api/amap/v4/grasproad/driving',
    method: 'post',
    params: {
      key: 'e50fd5227211bb1cea69fe510430b121',
    },
    data: points,
  }).then(({ data }) => {
    handler(data.data.points, 'green')
  })
}

onMounted(() => {
  initMap()
})

window._AMapSecurityConfig = {
  // serviceHost:'您的代理服务器域名或地址/_AMapService',
  // 例如 ：serviceHost:'http://1.1.1.1:80/_AMapService',
  securityJsCode: 'ad9414e3c95c17a5efaa7fbee019c635',
}

/**
 * POI搜索 PlaceSearch、输入提示 AutoComplete
 */
function initMap() {
  AMapLoader.load({
    key: 'e995f1881ab9593b915b8adaa192a852',
    version: '2.0',
    plugins: ['AMap.PlaceSearch', 'AMap.AutoComplete', 'AMap.DistrictSearch'],
  })
    .then(AMap => {
      amap = AMap

      map = new AMap.Map('amap-container', {
        zoom: 11,
        zooms: [0, 18],
      })
      handler(points)
      query()
    })
    .catch(e => {
      console.log(e)
    })
}

function handler(pointList: any, color: string = 'red') {
  console.log(1111, pointList)
  const path = pointList.map((item: any) => new amap.LngLat(item.x, item.y))

  // 创建折线实例
  var polyline = new amap.Polyline({
    path: path,
    borderWeight: 6, // 线条宽度，默认为 1
    strokeColor: color, // 线条颜色
    lineJoin: 'round', // 折线拐点连接处样式
  })

  // 将折线添加至地图实例
  map.add(polyline)
  map.setCenter(path[0])
}
</script>

<style scoped>
.map-template {
  position: relative;
  height: 70vh;
}
.map-container {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
}
</style>
