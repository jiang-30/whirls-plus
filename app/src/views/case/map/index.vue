<route lang="yaml">
meta:
  enabled: true
  constant: true
  title: 地图
  icon: mdi:map-marker-check
  layout: admin
  tabBar: true
  showMenu: true
  parentMenuName: Case
  sort: 5
</route>

<template>
  <PageContainer>
    <div class="map-template">
      <div class="map-container" id="amap-container"></div>
      <div class="fixed-box" v-if="initialized">
        <el-space>
          <el-select v-model="currentCityCode" style="width: 100px" placeholder="城市">
            <el-option v-for="item in cityList" :key="item.name" :label="item.name" :value="item.code" />
          </el-select>
          <ElAutocomplete
            v-model="keyword"
            :fetch-suggestions="querySearch"
            value-key="name"
            clearable
            placeholder="请输入搜索关键字"
            @select="handleSelect"
          >
            <template #default="{ item }">
              <span class="value">{{ item.name }}</span>
              <span class="link">{{ item.district }}</span>
            </template>
          </ElAutocomplete>
        </el-space>
      </div>
    </div>

    <template #footer>
      <div style="display: flex; align-items: center">
        <span style="color: #aaa; font-size: 12" v-if="address.address">{{ address.address }}({{ address.lng }}, {{ address.lat }})</span>
        <el-button style="margin-left: auto" type="primary" @click="onConfirm">确定</el-button>
      </div>
    </template>
  </PageContainer>
</template>

<script lang="ts" setup>
import AMapLoader from '@amap/amap-jsapi-loader'
import { ref } from 'vue'

let map: any = null
let amap: any
let marker: any

const visible = ref(false)
const initialized = ref(false)
const cityList = [{ name: '赤峰市', code: '150400', center: '118.887613,42.256876' }]
const currentCityCode = ref('150400')
const currentCity = {
  name: '赤峰市',
  code: '150400',
  lng: 118.887613,
  lat: 42.256876,
}
const keyword = ref('')
const address = ref<any>({})

let resolveHandler: ((value: any) => void) | null

defineExpose({
  open,
})

onBeforeUnmount(() => {
  resolveHandler = null
})

function onConfirm() {
  if (address.value.lng && resolveHandler) {
    resolveHandler(address.value)
  }
  visible.value = false
}

onMounted(() => {
  initMap(currentCity)
})

/**
 * 输入提示列表
 */
function querySearch(queryString: string, cb: any) {
  const autoComplete = new amap.AutoComplete({
    city: currentCity.name,
  })

  autoComplete.search(queryString, function (status: any, result: any) {
    // console.log(status, result);
    if (status == 'complete') {
      cb(result.tips.filter((item: any) => item.location))
    } else {
      cb([])
    }
  })
}

function handleSelect(event: any) {
  // console.log(event)
  map.setCenter(event.location)
  generateMarker(event.location)
}
// 设置 Map 的限制区域，设定区域限制后，传入参数为限制的 Bounds。地图仅在区域内可拖
// setLimitBounds

// 获取地图中心点所在区域，回调函数返回对象属性分别对应为{省，市，区/县}
// getCity

window._AMapSecurityConfig = {
  // serviceHost:'您的代理服务器域名或地址/_AMapService',
  // 例如 ：serviceHost:'http://1.1.1.1:80/_AMapService',
  securityJsCode: 'ad9414e3c95c17a5efaa7fbee019c635',
}

interface IInfo {
  lng: number
  lat: number
  name: string
  code: string
}

/**
 * POI搜索 PlaceSearch、输入提示 AutoComplete
 */
function initMap(info: IInfo) {
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
        center: [info.lng, info.lat], // 中心点坐标不设置自动定位到当前城市
      })

      // 添加遮罩层
      generateMask(info)

      // 地图初始化完成
      map.on('complete', () => {
        initialized.value = true
      })

      // 点击地图获取位置
      map.on('click', (event: any) => {
        generateMarker(event.lnglat)
      })
    })
    .catch(e => {
      console.log(e)
    })
}

/**
 * 生成点标记
 */
function generateMarker(lnglat: any) {
  address.value = {}
  if (!marker) {
    marker = new amap.Marker({
      position: lnglat,
      anchor: 'bottom-center',
      draggable: true,
    })
    map.add(marker)
    marker.on('dragend', (event: any) => {
      getAddress(event.lnglat)
    })
  }
  marker.setPosition(lnglat)
  getAddress(lnglat)
}

/**
 * 遮罩层
 */
function generateMask(info: IInfo) {
  new amap.DistrictSearch({
    extensions: 'all',
    subdistrict: 0,
  }).search(info.name, function (status: any, result: any) {
    // console.log('DistrictSearch', result)
    // 外多边形坐标数组和内多边形坐标数组, 经度设置180度不好使
    const outer = [
      new amap.LngLat(-360, 90, true),
      new amap.LngLat(-360, -90, true),
      new amap.LngLat(360, -90, true),
      new amap.LngLat(360, 90, true),
    ]
    const holes = result.districtList[0].boundaries
    const pathArray = [outer]

    pathArray.push(...holes)
    const polygon = new amap.Polygon({
      pathL: pathArray,
      strokeColor: '#04082b',
      strokeWeight: 1,
      fillColor: '#155292',
      fillOpacity: 0.5,
    })
    polygon.setPath(pathArray)
    map.add(polygon)
  })
}

/**
 * 地理编码
 */
function getAddress(lnglat: any) {
  amap.plugin('AMap.Geocoder', function () {
    const geocoder = new amap.Geocoder({
      city: '全国',
    })
    geocoder.getAddress(lnglat, function (status: string, result: any) {
      // console.log('address', lnglat, result)
      if (status === 'complete' && result.info === 'OK') {
        address.value = {
          lng: lnglat.getLng(),
          lat: lnglat.getLat(),
          code: result.regeocode.addressComponent.adcode,
          citycode: result.regeocode.addressComponent.citycode,
          province: result.regeocode.addressComponent.province,
          city: result.regeocode.addressComponent.city,
          district: result.regeocode.addressComponent.district,
          street: result.regeocode.addressComponent.street,
          address: result.regeocode.formattedAddress,
        }
        //  console.log(address.value)
      }
    })
  })
}
</script>

<style>
.b-map-template .el-dialog__body {
  padding: 0;
}
</style>
<style scoped>
.map-template {
  position: relative;
  height: 70vh;
}

.fixed-box {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  z-index: 1;
  padding: 10px;
}

.map-container {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
}
</style>
