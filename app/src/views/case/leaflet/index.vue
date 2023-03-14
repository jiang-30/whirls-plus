<route lang="yaml">
meta:
  isEnabled: true
  isStatic: true
  title: leaflet
  icon: mdi:map-marker-check
  layout: admin
  isTab: true
  isShow: true
  parentName: Case
  sort: 1
</route>

<template>
  <PageContainer>
    <div id="leafletMap" class="map"></div>
  </PageContainer>
</template>

<script lang="ts" setup>
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

onMounted(() => {
  const map = L.map('leafletMap', {
    preferCanvas: true,
    attributionControl: false,
    zoomControl: false,
  }).setView([27.059126, 75.9375], 1)

  // const layer = L.tileLayer(
  //   'http://geos.grassmeta.cn/geoserver/gwc/service/tms/1.0.0/ne%3Acountries@EPSG%3A4326@png/{z}/{x}/{y}.png?{foo}',
  //   { foo: 'bar' },
  // ).addTo(map)
  L.tileLayer
    .wms('http://geos.grassmeta.cn/geoserver/ows', {
      layers: 'world',
    })
    .addTo(map)

  map.on('click', (e: any) => {
    console.log(e)
    L.popup()
      .setLatLng(e.latlng)
      .setContent('You clicked the map at ' + e.latlng.toString())
      .openOn(map)
  })
})
</script>

<style scoped>
.map {
  width: 100%;
  height: 400px;
}
</style>
